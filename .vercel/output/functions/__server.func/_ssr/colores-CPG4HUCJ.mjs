import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, P as Plus, T as Trash2 } from "./router-Cd0oBxWL.mjs";
import { L as Loader } from "./loader-bWMdxCq7.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
function AdminColores() {
  const [colors, setColors] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [newColor, setNewColor] = reactExports.useState({
    name: "",
    swatch: "#1a1a1a"
  });
  reactExports.useEffect(() => {
    load();
  }, []);
  async function load() {
    const {
      data
    } = await supabase.from("colors").select("*").order("name");
    setColors(data ?? []);
    setLoading(false);
  }
  async function addColor() {
    if (!newColor.name.trim()) return;
    setSaving(true);
    const {
      error
    } = await supabase.from("colors").insert({
      name: newColor.name.trim(),
      swatch: newColor.swatch
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      setNewColor({
        name: "",
        swatch: "#1a1a1a"
      });
      load();
    }
    setSaving(false);
  }
  function updateColor(id, field, value) {
    setColors((prev) => prev.map((c) => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  }
  async function saveColor(color) {
    const {
      error
    } = await supabase.from("colors").update({
      name: color.name,
      swatch: color.swatch
    }).eq("id", color.id);
    if (error) alert("Error: " + error.message);
  }
  async function deleteColor(id) {
    if (!confirm("¿Eliminar este color?")) return;
    const {
      error
    } = await supabase.from("colors").delete().eq("id", id);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setColors((prev) => prev.filter((c) => c.id !== id));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Catálogo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Colores" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/40 mt-2", children: "Paleta de colores disponibles para productos." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40", children: "Agregar color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: newColor.swatch, onChange: (e) => setNewColor((prev) => ({
          ...prev,
          swatch: e.target.value
        })), className: "w-12 h-10 bg-transparent border border-border cursor-pointer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: newColor.name, onChange: (e) => setNewColor((prev) => ({
          ...prev,
          name: e.target.value
        })), onKeyDown: (e) => e.key === "Enter" && addColor(), placeholder: "Nombre del color (ej: Negro Carbón)", className: "flex-1 bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addColor, disabled: saving || !newColor.name.trim(), className: "flex items-center gap-2 bg-acid text-ink px-4 py-2 text-[10px] uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          "Agregar"
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 bg-cream/5 animate-pulse" }, i)) }) : colors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-sm", children: "No hay colores guardados." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: color.swatch, onChange: (e) => updateColor(color.id, "swatch", e.target.value), onBlur: () => saveColor(color), className: "w-10 h-10 bg-transparent border border-border cursor-pointer shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: color.name, onChange: (e) => updateColor(color.id, "name", e.target.value), onBlur: () => saveColor(color), className: "flex-1 bg-transparent border-none text-sm text-cream focus:outline-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/30 font-mono uppercase shrink-0", children: color.swatch }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteColor(color.id), className: "p-2 text-cream/20 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
    ] }, color.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/20", children: [
      colors.length,
      " colores en la paleta"
    ] })
  ] });
}
export {
  AdminColores as component
};
