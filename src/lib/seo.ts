import { BRAND, SOCIAL } from "@/lib/brand";
import ogDefault from "@/assets/og-default.png?url";

/**
 * Fuente única de verdad para el SEO del sitio.
 * El dominio sale de BRAND.url — cambiarlo ahí actualiza canonical, OG y sitemap.
 */

/** Convierte una ruta relativa en URL absoluta. Google exige absolutas en canonical y og:image. */
export function absUrl(path = "/") {
  const base = BRAND.url.replace(/\/+$/, "");
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}/${path.replace(/^\/+/, "")}`;
}

const OG_DEFAULT = absUrl(ogDefault);

/** Recorta a la longitud que Google muestra sin truncar, cortando en palabra completa. */
function clamp(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)).trimEnd() + "…";
}

export interface SeoInput {
  /** Título sin el sufijo de marca — se añade solo. Pasa `rawTitle` si ya viene completo. */
  title?: string;
  rawTitle?: string;
  description?: string;
  /** Ruta relativa, ej. "/products/camiseta". Genera el canonical. */
  path?: string;
  /** URL absoluta de la imagen social. Por defecto la tarjeta de marca 1200x630. */
  image?: string;
  type?: "website" | "article" | "product";
  /** Excluye la página de los buscadores (carrito, cuenta, admin…). */
  noindex?: boolean;
}

export interface SeoHead {
  meta: Array<Record<string, string>>;
  links: Array<{ rel: string; href: string }>;
}

/**
 * Construye el bloque `head` de una ruta: meta, Open Graph, Twitter y canonical.
 * Devuelve el objeto que TanStack Router espera en `head()`.
 *
 * El tipo de retorno es explícito a propósito: sin él, las rutas que leen
 * `loaderData` dentro de `head()` caen en inferencia circular y el loader
 * termina tipado como `never`.
 */
export function seo(input: SeoInput): SeoHead {
  const title = input.rawTitle ?? (input.title ? `${input.title} — ${BRAND.store}` : BRAND.store);
  const description = input.description ? clamp(input.description, 160) : undefined;
  const image = input.image ?? OG_DEFAULT;
  const canonical = input.path ? absUrl(input.path) : undefined;

  const meta: Array<Record<string, string>> = [
    { title },
    { property: "og:title", content: title },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:site_name", content: BRAND.store },
    { property: "og:locale", content: "es_CO" },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${BRAND.store} — ${BRAND.tagline}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: image },
    { name: "twitter:title", content: title },
  ];

  if (description) {
    meta.push({ name: "description", content: description });
    meta.push({ property: "og:description", content: description });
    meta.push({ name: "twitter:description", content: description });
  }
  if (canonical) meta.push({ property: "og:url", content: canonical });

  // noindex vence a cualquier otra señal: nunca lo combines con canonical hacia otra página.
  if (input.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    meta.push({ name: "robots", content: "index, follow, max-image-preview:large" });
  }

  const links = canonical && !input.noindex ? [{ rel: "canonical", href: canonical }] : [];

  return { meta, links };
}

/* ------------------------------------------------------------------ */
/* Datos estructurados (JSON-LD)                                       */
/* ------------------------------------------------------------------ */

const socialProfiles = [SOCIAL.instagram.url, SOCIAL.tiktok.url, SOCIAL.youtube.url];

/** Identidad de la marca. Alimenta el panel de conocimiento de Google. */
export function organizationSchema(logoUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${absUrl("/")}#organization`,
    name: BRAND.store,
    legalName: BRAND.legal,
    url: absUrl("/"),
    logo: absUrl(logoUrl),
    image: OG_DEFAULT,
    description: BRAND.tagline,
    email: `hola@${BRAND.domain}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.city,
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    sameAs: socialProfiles,
  };
}

/** Habilita la caja de búsqueda de sitio en los resultados de Google. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absUrl("/")}#website`,
    name: BRAND.store,
    url: absUrl("/"),
    inLanguage: "es-CO",
    publisher: { "@id": `${absUrl("/")}#organization` },
  };
}

export interface ProductSchemaInput {
  name: string;
  description?: string;
  images: string[];
  price: number;
  slug: string;
  inStock: boolean;
  sku?: string;
  color?: string;
}

/**
 * Schema de producto: es lo que hace que Google muestre precio y disponibilidad
 * junto al resultado. Para e-commerce es el dato estructurado de mayor impacto.
 */
export function productSchema(p: ProductSchemaInput) {
  const url = absUrl(`/products/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.filter(Boolean),
    sku: p.sku || p.slug,
    ...(p.color ? { color: p.color } : {}),
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "COP",
      price: String(p.price),
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: BRAND.store },
    },
  };
}

/** Migas de pan: Google las muestra en lugar de la URL cruda. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

/** Convierte la página de FAQ en un resultado expandido. */
export function faqSchema(entries: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Listado de colección, para que Google entienda qué productos la componen. */
export function itemListSchema(items: Array<{ name: string; slug: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absUrl(`/products/${item.slug}`),
      name: item.name,
    })),
  };
}
