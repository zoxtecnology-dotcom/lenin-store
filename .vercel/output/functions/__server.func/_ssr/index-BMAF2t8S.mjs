import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { L as Link, P as Plus, A as imgUrl, z as fmtCOP, T as Trash2, Q as supabase } from "./router-BWVHQLZp.mjs";
import { a as EyeOff, E as Eye, S as SquarePen } from "./square-pen-BbkJ_6P-.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./types-D0vF8QzC.mjs";
function AdminProductos() {
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  async function load() {
    const {
      data
    } = await supabase.from("products").select("id, slug, name, price, category, published, is_new, is_best_seller, is_on_sale, position, product_images(cloudinary_id, role)").order("position");
    setProducts(data ?? []);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  const categories = [...new Set(products.map((p) => p.category))].sort();
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
  const counts = {
    all: products.length,
    published: products.filter((p) => p.published).length,
    draft: products.filter((p) => !p.published).length,
    new: products.filter((p) => p.is_new).length,
    sale: products.filter((p) => p.is_on_sale).length,
    best: products.filter((p) => p.is_best_seller).length
  };
  async function togglePublished(id, current) {
    await supabase.from("products").update({
      published: !current
    }).eq("id", id);
    setProducts((prev) => prev.map((p) => p.id === id ? {
      ...p,
      published: !current
    } : p));
  }
  async function deleteProduct(id, name) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
  function getFrontImage(images) {
    return images.find((i) => i.role === "front") ?? images[0];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Catálogo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Productos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/productos/nuevo", className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 2 }),
        "Nuevo"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Buscar producto...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none" }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearch(""), className: "absolute right-2 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-lg", children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filterCategory, onChange: (e) => setFilterCategory(e.target.value), className: "bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas las categorías" }),
        categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "all", children: [
          "Todos (",
          counts.all,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "published", children: [
          "✓ Publicados (",
          counts.published,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "draft", children: [
          "○ Borradores (",
          counts.draft,
          ")"
        ] }),
        counts.new > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "new", children: [
          "★ Nuevos (",
          counts.new,
          ")"
        ] }),
        counts.sale > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "sale", children: [
          "% Ofertas (",
          counts.sale,
          ")"
        ] }),
        counts.best > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "best", children: [
          "♥ Top ventas (",
          counts.best,
          ")"
        ] })
      ] }),
      (filterCategory !== "all" || filterStatus !== "all" || search) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setFilterCategory("all");
        setFilterStatus("all");
        setSearch("");
      }, className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors", children: "Limpiar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/30 ml-auto", children: [
        filtered.length,
        " de ",
        products.length
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-cream/5 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-sm mb-4", children: products.length === 0 ? "No hay productos todavía." : "No hay productos que coincidan con los filtros." }),
      products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/productos/nuevo", className: "text-[11px] uppercase tracking-[0.3em] text-acid hover:underline", children: "Crear el primero →" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: filtered.map((p) => {
      const front = getFrontImage(p.product_images);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-bone overflow-hidden shrink-0", children: front ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imgUrl(front.cloudinary_id, "w_48,h_48,c_fill,q_auto"), alt: p.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-cream/5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream truncate", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40 uppercase tracking-[0.2em]", children: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40", children: fmtCOP(p.price) }),
            p.is_new && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.2em] text-acid", children: "Nuevo" }),
            p.is_on_sale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.2em] text-orange-400", children: "Oferta" }),
            p.is_best_seller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.2em] text-purple-400", children: "Top" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${p.published ? "bg-acid/10 text-acid" : "bg-cream/5 text-cream/30"}`, children: p.published ? "Publicado" : "Borrador" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublished(p.id, p.published), title: p.published ? "Despublicar" : "Publicar", className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors", children: p.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 14, strokeWidth: 1.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/productos/$id", params: {
            id: p.id
          }, className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 14, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteProduct(p.id, p.name), className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, strokeWidth: 1.5 }) })
        ] })
      ] }, p.id);
    }) })
  ] });
}
export {
  AdminProductos as component
};
