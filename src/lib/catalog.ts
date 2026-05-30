import { supabase } from "@/lib/supabase";
import { imgUrl } from "@/lib/cloudinary";
import type { Product, ProductColor, ProductVariant } from "@/lib/products";

// ─── Orden canónico de tallas ──────────────────────────────────
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
function sortSizes(sizes: string[]) {
  return [...sizes].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a);
    const ib = SIZE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

// ─── Tipos de las filas que vienen de Supabase ─────────────────
interface ImageRow { cloudinary_id: string; role: string; position: number; }
interface ColorRow { name: string; swatch: string; position: number; }
interface VariantRow { color_name: string; size: string; piece: string | null; stock: number; }

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  price: number;
  compare_at_price: number | null;
  is_new: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  category: string;
  short_desc: string | null;
  description: string | null;
  details: string | null;
  type: string;
  top_name: string | null;
  bottom_name: string | null;
  top_price: number | null;
  bottom_price: number | null;
  drop_id: string | null;
  created_at: string;
  product_images: ImageRow[];
  product_colors: ColorRow[];
  product_variants: VariantRow[];
  drops?: { name: string; label: string } | null;
}

const PRODUCT_SELECT = `
  id, slug, name, price, compare_at_price,
  is_new, is_best_seller, is_on_sale,
  category, short_desc, description, details, type,
  top_name, bottom_name, top_price, bottom_price, drop_id, created_at,
  product_images(cloudinary_id, role, position),
  product_colors(name, swatch, position),
  product_variants(color_name, size, piece, stock),
  drops(name, label)
`;

const CARD_IMG = "w_1024,q_auto,f_auto";

// ─── Mapper: fila de DB → Product (el shape que usa el front) ──
function rowToProduct(row: ProductRow): Product {
  const imgs = [...row.product_images].sort((a, b) => a.position - b.position);

  const front = imgs.find((i) => i.role === "front") ?? imgs[0];
  const back = imgs.find((i) => i.role === "back") ?? imgs[1] ?? front;

  // Galería: front, back, gallery (excluye piezas de conjunto top/bottom/full)
  const galleryImgs = imgs.filter((i) => ["front", "back", "gallery"].includes(i.role));

  const colors: ProductColor[] = [...row.product_colors]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ name: c.name, swatch: c.swatch }));

  // Tallas: distintas de las variantes (excluye piezas para no duplicar)
  const sizeSet = new Set(row.product_variants.map((v) => v.size));
  const sizes = sortSizes([...sizeSet]);

  const totalStock = row.product_variants.reduce((sum, v) => sum + v.stock, 0);

  const dropLabel = row.drops ? `${row.drops.name} — ${row.drops.label}` : "";

  // Variantes con stock para deshabilitar tallas/colores agotados
  const variants: ProductVariant[] = row.product_variants.map((v) => ({
    color_name: v.color_name,
    size: v.size,
    piece: v.piece,
    stock: v.stock,
  }));

  // is_on_sale viene de la DB (trigger lo calcula)
  // compareAtPrice: si está, hay descuento real
  const compareAtPrice = row.compare_at_price ?? undefined;

  const product: Product = {
    slug: row.slug,
    name: row.name,
    price: row.price,
    compareAtPrice,
    front: front ? imgUrl(front.cloudinary_id, CARD_IMG) : "",
    back: back ? imgUrl(back.cloudinary_id, CARD_IMG) : "",
    images: galleryImgs.map((i) => imgUrl(i.cloudinary_id, CARD_IMG)),
    isNew: row.is_new,
    isBestSeller: row.is_best_seller,
    isOnSale: row.is_on_sale,
    drop: dropLabel,
    category: row.category,
    shortDescription: row.short_desc ?? "",
    description: row.description ?? "",
    details: row.details ?? "",
    colors,
    sizes,
    variants,
    stock: totalStock,
    type: row.type === "conjunto" ? "conjunto" : "standard",
  };

  // Datos de conjunto
  if (row.type === "conjunto") {
    const topImgs = imgs.filter((i) => i.role === "top").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));
    const bottomImgs = imgs.filter((i) => i.role === "bottom").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));
    const fullImgs = imgs.filter((i) => i.role === "full").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));

    product.conjunto = {
      topName: row.top_name ?? "",
      bottomName: row.bottom_name ?? "",
      topPrice: row.top_price ?? 0,
      bottomPrice: row.bottom_price ?? 0,
      topImages: topImgs.length ? topImgs : product.images,
      bottomImages: bottomImgs.length ? bottomImgs : product.images,
      fullImages: fullImgs.length ? fullImgs : product.images,
    };
  }

  return product;
}

// ─── Queries de productos ──────────────────────────────────────
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .order("position");

  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToProduct(data as ProductRow) : null;
}

// Más nuevos primero (para carrusel home y colección "nuevo")
export async function fetchProductsNewest(limit?: number): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}

// is_new = true ordenados por más nuevos primero
export async function fetchProductsIsNew(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .eq("is_new", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}

// Más vendidos por ventas reales de order_items
export async function fetchMostSoldProducts(): Promise<Product[]> {
  // Traer product_ids con más unidades vendidas (pedidos pagados)
  const { data: items } = await supabase
    .from("order_items")
    .select("product_id, qty")
    .not("product_id", "is", null);

  if (!items || items.length === 0) return [];

  // Agrupar por product_id y sumar unidades vendidas
  const totals: Record<string, number> = {};
  for (const item of items) {
    if (item.product_id) {
      totals[item.product_id] = (totals[item.product_id] ?? 0) + (item.qty ?? 0);
    }
  }

  const sorted = Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  if (sorted.length === 0) return [];

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .in("id", sorted);

  if (error) throw error;

  const products = (data as ProductRow[]).map(rowToProduct);
  return sorted
    .map((id) => products.find((p) => (data as ProductRow[]).find((r) => r.slug === p.slug && r.id === id)))
    .filter((p): p is Product => !!p);
}

// ─── Colecciones ───────────────────────────────────────────────
export interface CollectionData {
  handle: string;
  name: string;
  subtitle: string;
  image: string;
  category: string;
  isNewArrivals?: boolean;
  isBestSellers?: boolean;
  isHotSale?: boolean;
  isAll?: boolean;
}

interface CollectionRow {
  handle: string;
  name: string;
  subtitle: string | null;
  cloudinary_id: string | null;
  filter_category: string | null;
  is_new_arrivals: boolean;
  is_best_sellers: boolean;
  is_hot_sale: boolean;
  position: number;
}

function rowToCollection(row: CollectionRow): CollectionData {
  return {
    handle: row.handle,
    name: row.name,
    subtitle: row.subtitle ?? "",
    image: row.cloudinary_id ? imgUrl(row.cloudinary_id, "w_1200,q_auto,f_auto") : "",
    category: row.filter_category ?? "",
    isNewArrivals: row.is_new_arrivals,
    isBestSellers: row.is_best_sellers,
    isHotSale: row.is_hot_sale,
    isAll: !row.filter_category && !row.is_new_arrivals && !row.is_best_sellers && !row.is_hot_sale,
  };
}

export async function fetchCollections(): Promise<CollectionData[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("handle, name, subtitle, cloudinary_id, filter_category, is_new_arrivals, is_best_sellers, is_hot_sale, position")
    .eq("active", true)
    .order("position");

  if (error) throw error;
  return (data as CollectionRow[]).map(rowToCollection);
}

export async function fetchCollection(handle: string): Promise<CollectionData | null> {
  const all = await fetchCollections();
  return all.find((c) => c.handle === handle) ?? null;
}

// ─── Packs ─────────────────────────────────────────────────────
export interface PackData {
  id: string;
  slug: string;
  name: string;
  tag: string;
  discount: number;
  description: string;
  items: { product: Product }[];
}

export async function fetchPacks(): Promise<PackData[]> {
  const { data, error } = await supabase
    .from("packs")
    .select(`id, slug, name, tag, discount, description, position,
      pack_items(position, product:products(${PRODUCT_SELECT}))`)
    .eq("published", true)
    .order("position");

  if (error) throw error;

  return (data ?? []).map((pack: Record<string, unknown>) => ({
    id: pack.id as string,
    slug: pack.slug as string,
    name: pack.name as string,
    tag: (pack.tag as string) ?? "",
    discount: pack.discount as number,
    description: (pack.description as string) ?? "",
    items: ((pack.pack_items as { position: number; product: ProductRow }[]) ?? [])
      .sort((a, b) => a.position - b.position)
      .map((pi) => ({ product: rowToProduct(pi.product) })),
  }));
}

export async function fetchPackBySlug(slug: string): Promise<PackData | null> {
  const all = await fetchPacks();
  return all.find((p) => p.slug === slug) ?? null;
}

// ─── Drops ─────────────────────────────────────────────────────
export interface DropData {
  id: string;
  slug: string;
  name: string;
  label: string;
  season: string;
  releaseDate: string | null;
  editorialQuote: string;
  editorialBody: string;
  editorialImages: string[];
}

interface DropRow {
  id: string;
  slug: string;
  name: string;
  label: string | null;
  season: string | null;
  release_date: string | null;
  editorial_quote: string | null;
  editorial_body: string | null;
  drop_images: { cloudinary_id: string; position: number }[];
}

function rowToDrop(row: DropRow): DropData {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    label: row.label ?? "",
    season: row.season ?? "",
    releaseDate: row.release_date,
    editorialQuote: row.editorial_quote ?? "",
    editorialBody: row.editorial_body ?? "",
    editorialImages: [...row.drop_images]
      .sort((a, b) => a.position - b.position)
      .map((i) => imgUrl(i.cloudinary_id, "w_1200,q_auto,f_auto")),
  };
}

const DROP_SELECT = `id, slug, name, label, season, release_date,
  editorial_quote, editorial_body, drop_images(cloudinary_id, position)`;

export async function fetchDrops(): Promise<DropData[]> {
  const { data, error } = await supabase
    .from("drops")
    .select(DROP_SELECT)
    .eq("published", true)
    .order("position");
  if (error) throw error;
  return (data as DropRow[]).map(rowToDrop);
}

export async function fetchDropBySlug(slug: string): Promise<DropData | null> {
  const { data, error } = await supabase
    .from("drops")
    .select(DROP_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToDrop(data as DropRow) : null;
}

// Productos de un drop (por su label, ej: "Drop 01 — Essentials")
export async function fetchProductsByDrop(dropId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("drop_id", dropId)
    .eq("published", true)
    .order("position");
  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}
