import { Y as reactExports, N as jsxRuntimeExports } from "./_ssr/index.mjs";
import { m as Route$2, $ as useNavigate, Q as supabase, X, P as Plus } from "./_ssr/router-BWVHQLZp.mjs";
import { L as Loader } from "./_ssr/loader-C9Dviu41.mjs";
import { S as Save } from "./_ssr/save-D07xq8uH.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
import "./_ssr/types-D0vF8QzC.mjs";
function EditarPack() {
  const {
    id
  } = Route$2.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [allProducts, setAllProducts] = reactExports.useState([]);
  const [selectedProductIds, setSelectedProductIds] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    slug: "",
    name: "",
    tag: "",
    discount: "10",
    description: "",
    published: false
  });
  reactExports.useEffect(() => {
    Promise.all([supabase.from("packs").select("*, pack_items(product_id, position)").eq("id", id).single(), supabase.from("products").select("id, name, price, category").order("position")]).then(([{
      data: pack
    }, {
      data: products
    }]) => {
      if (!pack) {
        navigate({
          to: "/admin/packs"
        });
        return;
      }
      setForm({
        slug: pack.slug,
        name: pack.name,
        tag: pack.tag ?? "",
        discount: String(pack.discount),
        description: pack.description ?? "",
        published: pack.published
      });
      const sorted = [...pack.pack_items].sort((a, b) => a.position - b.position);
      setSelectedProductIds(sorted.map((i) => i.product_id));
      setAllProducts(products ?? []);
      setLoading(false);
    });
  }, [id, navigate]);
  function set(key, value) {
    setForm((p) => ({
      ...p,
      [key]: value
    }));
  }
  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("packs").update({
        ...form,
        discount: parseInt(form.discount)
      }).eq("id", id);
      await supabase.from("pack_items").delete().eq("pack_id", id);
      await supabase.from("pack_items").insert(selectedProductIds.map((product_id, position) => ({
        pack_id: id,
        product_id,
        position
      })));
      navigate({
        to: "/admin/packs"
      });
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const selectedProducts = allProducts.filter((p) => selectedProductIds.includes(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(total * (1 - parseInt(form.discount || "0") / 100));
  const fmt = (n) => new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(n);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Packs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Editar pack" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saving ? "Guardando..." : "Guardar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (e) => set("name", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (e) => set("slug", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Tag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.tag, onChange: (e) => set("tag", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Descuento %" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 99, value: form.discount, onChange: (e) => set("discount", e.target.value), className: input })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Descripción" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => set("description", e.target.value), rows: 2, className: input })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => set("published", e.target.checked), className: "accent-[#d4f542]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/60", children: "Publicado" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: "Productos" }) }),
      selectedProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border border-acid/20 px-4 py-3 bg-acid/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: fmt(p.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedProductIds((prev) => prev.filter((pid) => pid !== p.id)), className: "text-cream/30 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, strokeWidth: 1.5 }) })
      ] }, p.id)),
      selectedProducts.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40", children: [
          "Con -",
          form.discount,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-acid font-medium", children: fmt(discounted) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border max-h-48 overflow-y-auto", children: allProducts.filter((p) => !selectedProductIds.includes(p.id)).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedProductIds((prev) => [...prev, p.id]), className: "w-full flex items-center justify-between px-4 py-3 hover:bg-cream/5 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: p.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2, className: "text-acid shrink-0" })
      ] }, p.id)) })
    ] })
  ] });
}
const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
export {
  EditarPack as component
};
