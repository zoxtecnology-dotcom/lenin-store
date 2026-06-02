import { Y as reactExports, N as jsxRuntimeExports } from "./_ssr/index.mjs";
import { m as Route2, $ as useNavigate, P as Plus, X, Q as supabase } from "./_ssr/router-Cd0oBxWL.mjs";
import { I as ImageUpload } from "./_ssr/ImageUpload-CTKNwbF7.mjs";
import { L as Loader } from "./_ssr/loader-bWMdxCq7.mjs";
import { S as Save } from "./_ssr/save-CVIDclM7.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
function EditarDrop() {
  const {
    id
  } = Route2.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [images, setImages] = reactExports.useState([]);
  const [dropProducts, setDropProducts] = reactExports.useState([]);
  const [allProducts, setAllProducts] = reactExports.useState([]);
  const [showPicker, setShowPicker] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    slug: "",
    name: "",
    label: "",
    season: "",
    release_date: "",
    editorial_quote: "",
    editorial_body: "",
    discount: "12",
    published: false
  });
  reactExports.useEffect(() => {
    async function load() {
      const [{
        data: drop
      }, {
        data: prods
      }] = await Promise.all([supabase.from("drops").select("*, drop_images(*)").eq("id", id).single(), supabase.from("products").select("id, slug, name, category, drop_id").order("position")]);
      if (!drop) {
        navigate({
          to: "/admin/drops"
        });
        return;
      }
      setForm({
        slug: drop.slug,
        name: drop.name,
        label: drop.label ?? "",
        season: drop.season ?? "",
        release_date: drop.release_date ?? "",
        editorial_quote: drop.editorial_quote ?? "",
        editorial_body: drop.editorial_body ?? "",
        discount: String(drop.discount ?? 12),
        published: drop.published
      });
      setImages(drop.drop_images.map((img) => ({
        cloudinary_id: img.cloudinary_id,
        role: "gallery",
        alt_text: img.alt_text,
        position: img.position
      })));
      const all = prods ?? [];
      setAllProducts(all);
      setDropProducts(all.filter((p) => p.drop_id === id));
      setLoading(false);
    }
    load();
  }, [id, navigate]);
  function set(key, value) {
    setForm((p) => ({
      ...p,
      [key]: value
    }));
  }
  async function assignProduct(product) {
    await supabase.from("products").update({
      drop_id: id
    }).eq("id", product.id);
    setDropProducts((prev) => [...prev, product]);
    setShowPicker(false);
  }
  async function removeProduct(product) {
    await supabase.from("products").update({
      drop_id: null
    }).eq("id", product.id);
    setDropProducts((prev) => prev.filter((p) => p.id !== product.id));
  }
  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("drops").update({
        ...form,
        release_date: form.release_date || null,
        discount: parseInt(form.discount) || 12
      }).eq("id", id);
      await supabase.from("drop_images").delete().eq("drop_id", id);
      if (images.length > 0) {
        await supabase.from("drop_images").insert(images.map((img) => ({
          drop_id: id,
          cloudinary_id: img.cloudinary_id,
          alt_text: img.alt_text,
          position: img.position
        })));
      }
      navigate({
        to: "/admin/drops"
      });
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const unassigned = allProducts.filter((p) => !dropProducts.find((dp) => dp.id === p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Drops" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Editar drop" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Label" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.label, onChange: (e) => set("label", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Season" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.season, onChange: (e) => set("season", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Fecha de lanzamiento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.release_date, onChange: (e) => set("release_date", e.target.value), className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Descuento drop completo %" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 99, value: form.discount, onChange: (e) => set("discount", e.target.value), placeholder: "12", className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => set("published", e.target.checked), className: "accent-[#d4f542]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/60", children: "Publicado" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Frase editorial" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.editorial_quote, onChange: (e) => set("editorial_quote", e.target.value), className: input })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Texto editorial" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.editorial_body, onChange: (e) => set("editorial_body", e.target.value), rows: 4, className: input })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid border-b border-border pb-2", children: "Imágenes editoriales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { images, onChange: setImages, showRoles: false })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: [
          "Productos en este drop (",
          dropProducts.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowPicker((v) => !v), className: "flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-acid hover:opacity-70 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2 }),
          " Asignar producto"
        ] })
      ] }),
      dropProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/30", children: "No hay productos en este drop todavía." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: dropProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border border-border px-4 py-3 hover:bg-cream/5 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: p.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeProduct(p), title: "Quitar del drop", className: "text-cream/30 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, strokeWidth: 1.5 }) })
      ] }, p.id)) }),
      showPicker && unassigned.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-acid/30 bg-acid/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40 px-4 py-2 border-b border-acid/20", children: "Selecciona un producto para agregar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto divide-y divide-border", children: unassigned.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => assignProduct(p), className: "w-full flex items-center justify-between px-4 py-3 hover:bg-acid/10 transition-colors text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: p.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2, className: "text-acid shrink-0" })
        ] }, p.id)) })
      ] }),
      showPicker && unassigned.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/30", children: "Todos los productos ya están en este drop." })
    ] })
  ] });
}
const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
export {
  EditarDrop as component
};
