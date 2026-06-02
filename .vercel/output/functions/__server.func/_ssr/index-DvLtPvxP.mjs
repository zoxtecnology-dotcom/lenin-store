import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, L as Link, P as Plus, T as Trash2 } from "./router-BWVHQLZp.mjs";
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
function AdminDrops() {
  const [drops, setDrops] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    supabase.from("drops").select("*").order("position").then(({
      data
    }) => {
      setDrops(data ?? []);
      setLoading(false);
    });
  }, []);
  const filtered = drops.filter((d) => {
    if (filter === "published" && !d.published) return false;
    if (filter === "draft" && d.published) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const counts = {
    all: drops.length,
    published: drops.filter((d) => d.published).length,
    draft: drops.filter((d) => !d.published).length
  };
  async function toggle(id, current) {
    await supabase.from("drops").update({
      published: !current
    }).eq("id", id);
    setDrops((prev) => prev.map((d) => d.id === id ? {
      ...d,
      published: !current
    } : d));
  }
  async function deleteDrop(id, name) {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    await supabase.from("drops").delete().eq("id", id);
    setDrops((prev) => prev.filter((d) => d.id !== id));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Colecciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Drops" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/drops/nuevo", className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 2 }),
        " Nuevo"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Buscar drop...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none" }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearch(""), className: "absolute right-2 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-lg", children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer", children: [
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
        ] })
      ] }),
      (filter !== "all" || search) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setFilter("all");
        setSearch("");
      }, className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors", children: "Limpiar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/30 ml-auto", children: [
        filtered.length,
        " de ",
        drops.length
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-cream/5 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-sm mb-4", children: drops.length === 0 ? "No hay drops todavía." : "No hay drops que coincidan." }),
      drops.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/drops/nuevo", className: "text-[11px] uppercase tracking-[0.3em] text-acid hover:underline", children: "Crear el primero →" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cream", children: [
          d.name,
          " — ",
          d.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/40 mt-0.5", children: [
          d.season,
          " · ",
          d.release_date ?? "Sin fecha"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${d.published ? "bg-acid/10 text-acid" : "bg-cream/5 text-cream/30"}`, children: d.published ? "Publicado" : "Borrador" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(d.id, d.published), className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors", children: d.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 14, strokeWidth: 1.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14, strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/drops/$id", params: {
          id: d.id
        }, className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 14, strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteDrop(d.id, d.name), className: "w-8 h-8 flex items-center justify-center text-cream/40 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, strokeWidth: 1.5 }) })
      ] })
    ] }, d.id)) })
  ] });
}
export {
  AdminDrops as component
};
