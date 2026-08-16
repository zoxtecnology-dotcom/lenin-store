// scripts/gen-seo.mjs
// Genera robots.txt y sitemap.xml dentro de .vercel/output/static/.
//
// Por qué en tiempo de build y no como ruta de servidor: el plugin de Nitro de
// este proyecto no registra `server/routes/` (por eso también existe
// copy-webhook.mjs). Los archivos estáticos los sirve el handler "filesystem"
// de Vercel, que va antes del catch-all del SPA en config.json.
//
// Consecuencia: el sitemap se congela en cada despliegue. Un producto nuevo
// aparece en el sitemap en el siguiente deploy.

import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "vite";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, ".vercel", "output", "static");

// El dominio vive en src/lib/brand.ts. Lo leemos con una regex en vez de
// importar el módulo, que es TypeScript y arrastraría todo el árbol del cliente.
async function readBrandUrl() {
  const { readFile } = await import("fs/promises");
  const src = await readFile(join(root, "src", "lib", "brand.ts"), "utf-8");
  const match = src.match(/url:\s*"([^"]+)"/);
  if (!match) throw new Error("No se pudo leer BRAND.url desde src/lib/brand.ts");
  return match[1].replace(/\/+$/, "");
}

const STATIC_ROUTES = [
  { path: "/",                     priority: "1.0", changefreq: "daily" },
  { path: "/drops",                priority: "0.8", changefreq: "weekly" },
  { path: "/packs",                priority: "0.8", changefreq: "weekly" },
  { path: "/historia",             priority: "0.6", changefreq: "monthly" },
  { path: "/faq",                  priority: "0.6", changefreq: "monthly" },
  { path: "/contacto",             priority: "0.5", changefreq: "monthly" },
  { path: "/envios",               priority: "0.5", changefreq: "monthly" },
  { path: "/cambios-devoluciones", priority: "0.5", changefreq: "monthly" },
  { path: "/tiendas",              priority: "0.4", changefreq: "monthly" },
  { path: "/prensa",               priority: "0.3", changefreq: "yearly" },
  { path: "/terminos",             priority: "0.2", changefreq: "yearly" },
  { path: "/privacidad",           priority: "0.2", changefreq: "yearly" },
  { path: "/cookies",              priority: "0.2", changefreq: "yearly" },
  { path: "/aviso",                priority: "0.2", changefreq: "yearly" },
];

const escapeXml = (v) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function urlEntry(base, path, priority, changefreq, lastmod) {
  return [
    "  <url>",
    `    <loc>${escapeXml(base + path)}</loc>`,
    lastmod ? `    <lastmod>${String(lastmod).slice(0, 10)}</lastmod>` : "",
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n");
}

function buildRobots(base) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    "# Zonas privadas o sin valor de búsqueda",
    "Disallow: /admin",
    "Disallow: /cuenta",
    "Disallow: /checkout",
    "Disallow: /login",
    "Disallow: /wishlist",
    "Disallow: /pedido-confirmado",
    "Disallow: /auth/",
    "",
    "# Filtros de colección: mismo contenido bajo cientos de URLs",
    "Disallow: /*?talla=",
    "Disallow: /*?color=",
    "Disallow: /*?sort=",
    "Disallow: /*?disponible=",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
  ].join("\n");
}

async function collectCatalog(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("⚠ gen-seo: sin credenciales de Supabase, el sitemap solo tendrá las rutas fijas");
    return [];
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const [products, collections, packs, drops] = await Promise.all([
    supabase.from("visible_products").select("slug, created_at"),
    supabase.from("collections").select("handle").eq("active", true),
    supabase.from("packs").select("slug").eq("published", true),
    supabase.from("drops").select("slug").eq("published", true),
  ]);

  for (const [name, res] of Object.entries({ products, collections, packs, drops })) {
    if (res.error) console.warn(`⚠ gen-seo: error leyendo ${name}:`, res.error.message);
  }

  return [
    ...(products.data ?? []).filter((p) => p?.slug)
      .map((p) => ({ path: `/products/${p.slug}`, priority: "0.8", changefreq: "weekly", lastmod: p.created_at })),
    ...(collections.data ?? []).filter((c) => c?.handle)
      .map((c) => ({ path: `/collections/${c.handle}`, priority: "0.9", changefreq: "daily" })),
    ...(packs.data ?? []).filter((p) => p?.slug)
      .map((p) => ({ path: `/packs/${p.slug}`, priority: "0.7", changefreq: "weekly" })),
    ...(drops.data ?? []).filter((d) => d?.slug)
      .map((d) => ({ path: `/drops/${d.slug}`, priority: "0.7", changefreq: "weekly" })),
  ];
}

async function main() {
  if (!existsSync(outDir)) {
    console.warn(`⚠ gen-seo: no existe ${outDir}. ¿Corriste vite build antes?`);
    await mkdir(outDir, { recursive: true });
  }

  const base = await readBrandUrl();
  const env = loadEnv("production", root, "");

  let dynamic = [];
  try {
    dynamic = await collectCatalog(env);
  } catch (err) {
    // Un fallo de red no debe tumbar el despliegue: publicamos las rutas fijas.
    console.warn("⚠ gen-seo: no se pudo leer el catálogo:", err.message);
  }

  const seen = new Set();
  const entries = [...STATIC_ROUTES, ...dynamic]
    .filter((r) => !seen.has(r.path) && seen.add(r.path))
    .map((r) => urlEntry(base, r.path, r.priority, r.changefreq, r.lastmod));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  await writeFile(join(outDir, "sitemap.xml"), xml, "utf-8");
  await writeFile(join(outDir, "robots.txt"), buildRobots(base), "utf-8");

  console.log(`✅ sitemap.xml — ${entries.length} URLs (${dynamic.length} del catálogo)`);
  console.log(`✅ robots.txt — sitemap en ${base}/sitemap.xml`);
  if (base.includes("aiahn")) {
    console.warn("⚠ OJO: el dominio sigue siendo aiahn.co. Actualiza BRAND.url en src/lib/brand.ts.");
  }
}

main().catch((err) => {
  console.error("gen-seo falló:", err);
  process.exit(1);
});
