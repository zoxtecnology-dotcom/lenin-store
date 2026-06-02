import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, T as Trash2, P as Plus } from "./router-Cd0oBxWL.mjs";
import { i as invalidateSizeCache } from "./size-guides-BTy17x57.mjs";
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
const GUIDE_TYPES = [{
  value: "camiseta",
  label: "Camisetas",
  description: "T-shirts, polos, camisas"
}, {
  value: "buso",
  label: "Chaqueta / Busos",
  description: "Chaquetas, busos, hoodies, sudaderas"
}, {
  value: "pantalon",
  label: "Pantalones",
  description: "Pantalones largos, jeans, joggers"
}, {
  value: "pantaloneta",
  label: "Pantalonetas",
  description: "Shorts, pantalonetas, bermudas"
}];
function AdminTallas() {
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  const [activeType, setActiveType] = reactExports.useState("camiseta");
  const [measurements, setMeasurements] = reactExports.useState([]);
  const [fitNote, setFitNote] = reactExports.useState("");
  reactExports.useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    setLoading(true);
    const {
      data
    } = await supabase.from("size_measurements").select("*").order("guide_type").order("position");
    setMeasurements(data ?? []);
    setLoading(false);
  }
  const filtered = measurements.filter((m) => m.guide_type === activeType);
  const columns = filtered.length > 0 ? Object.keys(filtered[0].measurements) : [];
  reactExports.useEffect(() => {
    const first = filtered.find((m) => m.fit_note);
    setFitNote(first?.fit_note ?? "");
  }, [activeType, measurements]);
  function updateMeasurement(id, col, value) {
    setMeasurements((prev) => prev.map((m) => m.id === id ? {
      ...m,
      measurements: {
        ...m.measurements,
        [col]: value
      }
    } : m));
  }
  function updateFitNote(value) {
    setFitNote(value);
  }
  async function handleSave() {
    setSaving(true);
    try {
      const toSave = measurements.filter((m) => m.guide_type === activeType);
      for (let i = 0; i < toSave.length; i++) {
        const m = toSave[i];
        await supabase.from("size_measurements").update({
          measurements: m.measurements,
          fit_note: i === 0 ? fitNote : null
        }).eq("id", m.id);
      }
      invalidateSizeCache();
      setSaved(true);
      setTimeout(() => setSaved(false), 2e3);
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }
  async function addSize() {
    const existingSizes = filtered.map((m) => m.size);
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
    const nextSize = allSizes.find((s) => !existingSizes.includes(s));
    if (!nextSize) {
      alert("Ya existen todas las tallas estándar");
      return;
    }
    const template = filtered[0];
    if (!template) {
      alert("No hay plantilla de medidas para este tipo");
      return;
    }
    const emptyMeasurements = {};
    Object.keys(template.measurements).forEach((key) => {
      emptyMeasurements[key] = "";
    });
    const {
      data,
      error
    } = await supabase.from("size_measurements").insert({
      guide_type: activeType,
      guide_label: template.guide_label,
      size: nextSize.toUpperCase(),
      measurements: emptyMeasurements,
      position: filtered.length
    }).select().single();
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    setMeasurements((prev) => [...prev, data]);
    invalidateSizeCache();
  }
  async function removeSize(id) {
    if (!confirm("¿Eliminar esta talla?")) return;
    const {
      error
    } = await supabase.from("size_measurements").delete().eq("id", id);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
    invalidateSizeCache();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Ajustes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Guía de Tallas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saved ? "¡Guardado!" : saving ? "Guardando..." : "Guardar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-border", children: GUIDE_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveType(type.value), className: `px-4 py-3 text-[11px] uppercase tracking-[0.2em] border-b-2 transition-colors ${activeType === type.value ? "border-acid text-acid" : "border-transparent text-cream/50 hover:text-cream"}`, children: type.label }, type.value)) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-cream/5 animate-pulse" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50", children: GUIDE_TYPES.find((t) => t.value === activeType)?.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-bone/[0.03]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal w-20", children: "Talla" }),
          columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal", children: col.charAt(0).toUpperCase() + col.slice(1) }, col)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-12" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-bone/[0.02]"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-4 font-display text-base text-acid", children: row.size.toUpperCase() }),
          columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: row.measurements[col] ?? "", onChange: (e) => updateMeasurement(row.id, col, e.target.value), className: "w-full bg-background border border-border/50 text-cream text-sm px-2 py-1.5 focus:outline-none focus:border-cream/40" }) }, col)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeSize(row.id), className: "text-cream/30 hover:text-red-400 transition-colors p-1", title: "Eliminar talla", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) }) })
        ] }, row.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addSize, className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/50 hover:text-acid transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Añadir talla"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40", children: "Nota de fit (se muestra en el modal)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: fitNote, onChange: (e) => updateFitNote(e.target.value), rows: 2, className: "w-full bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40 resize-none", placeholder: "Ej: La talla M equivale a un L en corte regular..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/50 p-4 bg-bone/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2", children: "Vista previa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/70", children: "Todas las medidas son en centímetros (cm) del cuerpo, no de la prenda." })
      ] })
    ] })
  ] });
}
export {
  AdminTallas as component
};
