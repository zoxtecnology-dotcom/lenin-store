import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { $ as useNavigate, Q as supabase } from "./router-Cd0oBxWL.mjs";
import { I as ImageUpload } from "./ImageUpload-CTKNwbF7.mjs";
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
function NuevoDrop() {
  const navigate = useNavigate();
  const [saving, setSaving] = reactExports.useState(false);
  const [images, setImages] = reactExports.useState([]);
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
  async function handleSave() {
    if (!form.slug || !form.name) {
      alert("Slug y nombre son obligatorios.");
      return;
    }
    setSaving(true);
    try {
      const {
        data: drop,
        error
      } = await supabase.from("drops").insert({
        ...form,
        release_date: form.release_date || null,
        discount: parseInt(form.discount) || 12
      }).select().single();
      if (error) throw error;
      if (images.length > 0) {
        await supabase.from("drop_images").insert(images.map((img) => ({
          drop_id: drop.id,
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
  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Drops" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Nuevo drop" })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Nombre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (e) => set("name", e.target.value), placeholder: "Drop 01", className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Slug (URL) — se genera solo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (e) => set("slug", e.target.value), placeholder: "drop-01", className: `${input} text-cream/50` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.label, onChange: (e) => set("label", e.target.value), placeholder: "Essentials", className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Season" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.season, onChange: (e) => set("season", e.target.value), placeholder: "SS26", className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Fecha de lanzamiento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.release_date, onChange: (e) => set("release_date", e.target.value), className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Descuento drop completo %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 99, value: form.discount, onChange: (e) => set("discount", e.target.value), placeholder: "12", className: input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => set("published", e.target.checked), className: "accent-[#d4f542]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/60", children: "Publicado" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Editorial — frase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.editorial_quote, onChange: (e) => set("editorial_quote", e.target.value), placeholder: "Hecho por amor, vestido con actitud.", className: input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Editorial — texto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.editorial_body, onChange: (e) => set("editorial_body", e.target.value), rows: 4, placeholder: "Descripción editorial del drop...", className: input })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: "Imágenes editoriales" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { images, onChange: setImages, showRoles: false })
    ] })
  ] });
}
const label = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
export {
  NuevoDrop as component
};
