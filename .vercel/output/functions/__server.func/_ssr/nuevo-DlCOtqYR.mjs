import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { $ as useNavigate, Q as supabase, X, P as Plus } from "./router-Cd0oBxWL.mjs";
import { L as Loader } from "./loader-bWMdxCq7.mjs";
import { S as Save } from "./save-CVIDclM7.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
function NuevoPack() {
  const navigate = useNavigate();
  const [saving, setSaving] = reactExports.useState(false);
  const [allProducts, setAllProducts] = reactExports.useState([]);
  const [selectedProductIds, setSelectedProductIds] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    slug: "",
    name: "",
    discount: "10",
    description: "",
    published: true
  });
  reactExports.useEffect(() => {
    supabase.from("products").select("id, name, price, category").order("position").then(({
      data
    }) => setAllProducts(data ?? []));
  }, []);
  function slugify(str) {
    return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  }
  function set(key, value) {
    setForm((p) => ({
      ...p,
      [key]: value,
      ...key === "name" ? {
        slug: slugify(value)
      } : {}
    }));
  }
  function addProduct(id) {
    if (!selectedProductIds.includes(id)) setSelectedProductIds((prev) => [...prev, id]);
  }
  function removeProduct(id) {
    setSelectedProductIds((prev) => prev.filter((pid) => pid !== id));
  }
  async function handleSave() {
    if (!form.slug || !form.name || selectedProductIds.length < 2) {
      alert("Slug, nombre y al menos 2 productos son obligatorios.");
      return;
    }
    setSaving(true);
    try {
      const {
        data: pack,
        error
      } = await supabase.from("packs").insert({
        slug: form.slug,
        name: form.name,
        discount: parseInt(form.discount),
        description: form.description,
        published: true
      }).select().single();
      if (error) throw error;
      await supabase.from("pack_items").insert(selectedProductIds.map((product_id, position) => ({
        pack_id: pack.id,
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
  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const selectedProducts = allProducts.filter((p) => selectedProductIds.includes(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(total * (1 - parseInt(form.discount || "0") / 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Packs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Nuevo pack" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saving ? "Guardando..." : "Guardar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: "Información" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Nombre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (e) => set("name", e.target.value), placeholder: "Pack Esencial", className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Slug — se genera solo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (e) => set("slug", e.target.value), className: `${input} text-cream/50` })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/20", children: "Se publica automáticamente. Gestionalo desde el listado." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: "Productos del pack *" }) }),
      selectedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
        selectedProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border border-acid/20 px-4 py-3 bg-acid/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: p.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeProduct(p.id), className: "text-cream/30 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, strokeWidth: 1.5 }) })
        ] }, p.id)),
        selectedProducts.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40", children: [
            "Precio con -",
            form.discount,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-acid font-medium", children: new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
          }).format(discounted) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-2", children: "Agregar producto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border max-h-64 overflow-y-auto", children: allProducts.filter((p) => !selectedProductIds.includes(p.id)).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => addProduct(p.id), className: "w-full flex items-center justify-between px-4 py-3 hover:bg-cream/5 transition-colors text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: p.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2, className: "text-acid shrink-0" })
        ] }, p.id)) })
      ] })
    ] })
  ] });
}
const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
export {
  NuevoPack as component
};
