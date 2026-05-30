import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";
import { readdirSync } from "fs";
import { join } from "path";

// ─── Config ───────────────────────────────────────────────────
const IMAGES_FOLDER = "D:\\Users\\Jhon\\Downloads\\STAM SHOP-3-001\\STAM SHOP";
const PRICE = 95000;
const CATEGORY = "Camisetas";
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR = { name: "Por definir", swatch: "#888888" };
const DETAILS = "100% algodón peinado\nPeso: 320 gsm\nLavado a máquina 30°C\nFabricado en Colombia";

cloudinary.config({
  cloud_name: "dtoosryre",
  api_key: "899217647967881",
  api_secret: "mhc0lw8GuAt9GUPEh1_ovJ5h-cA",
});

const supabase = createClient(
  "https://fqsprmctzfukebplodlb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxc3BybWN0emZ1a2VicGxvZGxiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA4NDA2NywiZXhwIjoyMDk1NjYwMDY3fQ.L-61VdqtznxWvY7m23Y6_i0_q1eyhZUyysfoA_KJ43w"
);

// ─── Helpers ─────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase()
    .replace(/[áàä]/g, "a").replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i").replace(/[óòö]/g, "o")
    .replace(/[úùü]/g, "u").replace(/ñ/g, "n")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function log(msg) { process.stdout.write(msg + "\n"); }

// ─── 1. Leer imágenes ────────────────────────────────────────
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"];
const files = readdirSync(IMAGES_FOLDER)
  .filter(f => EXTENSIONS.some(ext => f.toLowerCase().endsWith(ext)))
  .sort();

log(`\n📁 ${files.length} imágenes encontradas en la carpeta\n`);

// ─── 2. Borrar productos actuales ────────────────────────────
log("🗑️  Borrando productos actuales...");
await supabase.from("pack_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
await supabase.from("product_variants").delete().neq("id", "00000000-0000-0000-0000-000000000000");
await supabase.from("product_colors").delete().neq("id", "00000000-0000-0000-0000-000000000000");
await supabase.from("product_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
log("✓ Productos borrados\n");

// ─── 3. Subir y crear productos ──────────────────────────────
let created = 0;
let errors = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const num = String(i + 1).padStart(2, "0");
  const name = `Camiseta STAM ${num}`;
  const slug = `camiseta-stam-${num}`;

  process.stdout.write(`[${i + 1}/${files.length}] Subiendo ${file}... `);

  try {
    // Subir imagen a Cloudinary
    const filePath = join(IMAGES_FOLDER, file);
    const upload = await cloudinary.uploader.upload(filePath, {
      folder: "aiahn/stam",
      public_id: slug,
      overwrite: true,
      resource_type: "image",
    });

    const cloudinaryId = upload.public_id;

    // Crear producto en Supabase
    const { data: product, error: prodErr } = await supabase
      .from("products")
      .insert({
        slug,
        name,
        price: PRICE,
        category: CATEGORY,
        short_desc: `Camiseta de algodón 320gsm. Corte cómodo y durabilidad garantizada.`,
        description: `${name}. Confeccionada en algodón 100% de alta calidad. 320 gramos de tela resistente para uso diario.`,
        details: DETAILS,
        type: "standard",
        is_new: true,
        published: true,
        position: i,
      })
      .select()
      .single();

    if (prodErr) throw prodErr;

    const productId = product.id;

    // Imagen principal
    await supabase.from("product_images").insert({
      product_id: productId,
      cloudinary_id: cloudinaryId,
      role: "front",
      position: 0,
    });

    // Color
    await supabase.from("product_colors").insert({
      product_id: productId,
      name: COLOR.name,
      swatch: COLOR.swatch,
      position: 0,
    });

    // Variantes (una por talla)
    await supabase.from("product_variants").insert(
      SIZES.map((size) => ({
        product_id: productId,
        color_name: COLOR.name,
        size,
        piece: null,
        stock: 10,
        active: true,
        sku: `STAM-${num}-${size}`,
      }))
    );

    created++;
    log(`✓ ${name}`);

  } catch (e) {
    errors++;
    log(`✗ ERROR: ${e.message}`);
  }
}

// ─── Resumen ─────────────────────────────────────────────────
log(`\n${"─".repeat(50)}`);
log(`✅ Creados: ${created} productos`);
if (errors > 0) log(`❌ Errores: ${errors}`);
log(`\n¡Listo! Entra al admin para editar nombres, precios e imágenes.\n`);
