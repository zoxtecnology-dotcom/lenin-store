import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { imgUrl } from "@/lib/cloudinary";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { fmtCOP } from "@/lib/products";

export const Route = createFileRoute("/admin/productos/")({
  component: AdminProductos,
});

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  published: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  position: number;
  product_images: { cloudinary_id: string; role: string }[];
}

function AdminProductos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  async function load() {
    const { data } = await supabase
      .from("products")
      .select("id, slug, name, price, category, published, is_new, is_best_seller, is_on_sale, position, product_images(cloudinary_id, role)")
      .order("position");
    setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // Obtener categorías únicas
  const categories = [...new Set(products.map((p) => p.category))].sort();

  // Filtrar productos
  const filtered = products.filter((p) => {
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    if (filterStatus === "published" && !p.published) return false;
    if (filterStatus === "draft" && p.published) return false;
    if (filterStatus === "new" && !p.is_new) return false;
    if (filterStatus === "sale" && !p.is_on_sale) return false;
    if (filterStatus === "best" && !p.is_best_seller) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Contadores
  const counts = {
    all: products.length,
    published: products.filter((p) => p.published).length,
    draft: products.filter((p) => !p.published).length,
    new: products.filter((p) => p.is_new).length,
    sale: products.filter((p) => p.is_on_sale).length,
    best: products.filter((p) => p.is_best_seller).length,
  };

  async function togglePublished(id: string, current: boolean) {
    await supabase.from("products").update({ published: !current }).eq("id", id);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, published: !current } : p));
  }

  async function deleteProduct(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function getFrontImage(images: Product["product_images"]) {
    return images.find((i) => i.role === "front") ?? images[0];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Catálogo</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">
            Productos
          </h1>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={14} strokeWidth={2} />
          Nuevo
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Búsqueda */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-lg">×</button>
          )}
        </div>

        {/* Categoría */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Estado */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer"
        >
          <option value="all">Todos ({counts.all})</option>
          <option value="published">✓ Publicados ({counts.published})</option>
          <option value="draft">○ Borradores ({counts.draft})</option>
          {counts.new > 0 && <option value="new">★ Nuevos ({counts.new})</option>}
          {counts.sale > 0 && <option value="sale">% Ofertas ({counts.sale})</option>}
          {counts.best > 0 && <option value="best">♥ Top ventas ({counts.best})</option>}
        </select>

        {/* Limpiar filtros */}
        {(filterCategory !== "all" || filterStatus !== "all" || search) && (
          <button
            onClick={() => { setFilterCategory("all"); setFilterStatus("all"); setSearch(""); }}
            className="text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors"
          >
            Limpiar
          </button>
        )}

        {/* Contador de resultados */}
        <span className="text-[10px] text-cream/30 ml-auto">
          {filtered.length} de {products.length}
        </span>
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-cream/5 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-cream/40 text-sm mb-4">
            {products.length === 0 ? "No hay productos todavía." : "No hay productos que coincidan con los filtros."}
          </p>
          {products.length === 0 && (
            <Link to="/admin/productos/nuevo" className="text-[11px] uppercase tracking-[0.3em] text-acid hover:underline">
              Crear el primero →
            </Link>
          )}
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {filtered.map((p) => {
            const front = getFrontImage(p.product_images);
            return (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors">
                {/* Imagen */}
                <div className="w-12 h-12 bg-bone overflow-hidden shrink-0">
                  {front ? (
                    <img
                      src={imgUrl(front.cloudinary_id, "w_48,h_48,c_fill,q_auto")}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-cream/5" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream truncate">{p.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-cream/40 uppercase tracking-[0.2em]">{p.category}</span>
                    <span className="text-[10px] text-cream/40">{fmtCOP(p.price)}</span>
                    {p.is_new && <span className="text-[9px] uppercase tracking-[0.2em] text-acid">Nuevo</span>}
                    {p.is_on_sale && <span className="text-[9px] uppercase tracking-[0.2em] text-orange-400">Oferta</span>}
                    {p.is_best_seller && <span className="text-[9px] uppercase tracking-[0.2em] text-purple-400">Top</span>}
                  </div>
                </div>

                {/* Estado */}
                <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${p.published ? "bg-acid/10 text-acid" : "bg-cream/5 text-cream/30"}`}>
                  {p.published ? "Publicado" : "Borrador"}
                </span>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublished(p.id, p.published)}
                    title={p.published ? "Despublicar" : "Publicar"}
                    className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors"
                  >
                    {p.published ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                  </button>
                  <Link
                    to="/admin/productos/$id"
                    params={{ id: p.id }}
                    className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors"
                  >
                    <Edit size={14} strokeWidth={1.5} />
                  </Link>
                  <button
                    onClick={() => deleteProduct(p.id, p.name)}
                    className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
