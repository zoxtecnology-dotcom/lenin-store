import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { f as fetchSizeMeasurements, b as getGuideTypeFromCategory, a as filterByGuideType, d as getMeasurementColumns, c as getHowToMeasure, g as getFitNote } from "./size-guides-Be2wHUyr.mjs";
import { X } from "./router-BWVHQLZp.mjs";
import { L as Loader } from "./loader-C9Dviu41.mjs";
function SizeGuideModal({ open, onClose, category }) {
  const [loading, setLoading] = reactExports.useState(true);
  const [measurements, setMeasurements] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetchSizeMeasurements().then((data) => {
      setMeasurements(data);
      setLoading(false);
    });
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  const guideType = getGuideTypeFromCategory(category);
  const filtered = filterByGuideType(measurements, guideType);
  const columns = getMeasurementColumns(filtered);
  const howToMeasure = getHowToMeasure(filtered);
  const fitNote = getFitNote(filtered);
  const guideLabel = filtered[0]?.guide_label ?? (guideType === "pantaloneta" ? "Pantalonetas" : guideType === "pantalon" ? "Pantalones" : guideType === "buso" ? "Chaqueta / Busos" : "Camisetas");
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-border animate-in zoom-in-95 fade-in duration-200",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-background border-b border-border flex items-center justify-between px-6 py-4 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid", children: "— Ayuda" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl uppercase leading-none text-cream mt-1", children: [
                "Guía de Tallas · ",
                guideLabel
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, "aria-label": "Cerrar", className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22, strokeWidth: 1.5 }) })
          ] }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "animate-spin text-acid", size: 24 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/55", children: "Medidas en centímetros, del cuerpo (no de la prenda). AIAHN usa corte oversize — si quieres un fit más ceñido, baja una talla." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-4", children: "Dónde medir" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-bone/[0.03] p-6 flex justify-center", children: guideType === "pantaloneta" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 180", className: "w-full max-w-[200px]", fill: "none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M70 20 L170 20 L175 70 L155 160 L120 160 L120 90 L100 160 L65 160 L65 70 Z",
                    stroke: "var(--cream)",
                    strokeWidth: "1.5",
                    opacity: "0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "12", x2: "180", y2: "12", stroke: "var(--acid)", strokeWidth: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "120", y: "6", fill: "var(--acid)", fontSize: "10", textAnchor: "middle", children: "Cintura" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "62", y1: "50", x2: "178", y2: "50", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "195", y: "52", fill: "var(--acid)", fontSize: "10", children: "Cadera" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "120", y1: "20", x2: "120", y2: "85", stroke: "var(--acid)", strokeWidth: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "126", y: "55", fill: "var(--acid)", fontSize: "10", children: "Tiro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "22", x2: "82", y2: "158", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "40", y: "95", fill: "var(--acid)", fontSize: "10", children: "Largo" })
              ] }) : guideType === "pantalon" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 280", className: "w-full max-w-[200px]", fill: "none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M70 20 L170 20 L175 120 L150 270 L120 270 L120 140 L100 270 L70 270 L65 120 Z",
                    stroke: "var(--cream)",
                    strokeWidth: "1.5",
                    opacity: "0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "12", x2: "180", y2: "12", stroke: "var(--acid)", strokeWidth: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "120", y: "6", fill: "var(--acid)", fontSize: "10", textAnchor: "middle", children: "Cintura" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "62", y1: "60", x2: "178", y2: "60", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "195", y: "62", fill: "var(--acid)", fontSize: "10", children: "Cadera" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "120", y1: "20", x2: "120", y2: "130", stroke: "var(--acid)", strokeWidth: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "126", y: "80", fill: "var(--acid)", fontSize: "10", children: "Tiro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "85", y1: "22", x2: "85", y2: "268", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "40", y: "150", fill: "var(--acid)", fontSize: "10", children: "Largo" })
              ] }) : guideType === "buso" ? (
                /* Chaqueta / Buso - manga larga sin capucha */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 320 260", className: "w-full max-w-[280px]", fill: "none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M95 55 L55 65 L25 195 L55 200 L75 95",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M225 55 L265 65 L295 195 L265 200 L245 95",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M95 55 L95 220 L225 220 L225 55",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M95 55 L130 40 Q160 50 190 40 L225 55",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M130 40 Q160 55 190 40",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "160", y1: "52", x2: "160", y2: "218", stroke: "var(--cream)", strokeWidth: "1", opacity: "0.25", strokeDasharray: "5 3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "25", y1: "195", x2: "55", y2: "200", stroke: "var(--cream)", strokeWidth: "1.5", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "295", y1: "195", x2: "265", y2: "200", stroke: "var(--cream)", strokeWidth: "1.5", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "95", y1: "30", x2: "225", y2: "30", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "95", cy: "30", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "225", cy: "30", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "160", y: "22", fill: "var(--acid)", fontSize: "10", textAnchor: "middle", children: "A · Hombros" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "95", y1: "55", x2: "40", y2: "197", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "95", cy: "55", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "197", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "45", y: "130", fill: "var(--acid)", fontSize: "10", transform: "rotate(-72 45 130)", children: "B · Manga" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "160", y1: "48", x2: "160", y2: "218", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "160", cy: "48", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "160", cy: "218", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "172", y: "135", fill: "var(--acid)", fontSize: "10", children: "C · Largo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "95", y1: "240", x2: "225", y2: "240", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "95", cy: "240", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "225", cy: "240", r: "2", fill: "var(--acid)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "160", y: "254", fill: "var(--acid)", fontSize: "10", textAnchor: "middle", children: "D · Pecho" })
                ] })
              ) : (
                /* Camiseta - manga corta */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 300 260", className: "w-full max-w-[280px]", fill: "none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M70 50 L40 75 L60 100 L75 90 L75 220 L225 220 L225 90 L240 100 L260 75 L230 50 L195 35 Q150 60 105 35 Z",
                      stroke: "var(--cream)",
                      strokeWidth: "1.5",
                      opacity: "0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M105 35 Q150 60 195 35", stroke: "var(--cream)", strokeWidth: "1.5", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "105", y1: "22", x2: "195", y2: "22", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "150", y: "16", fill: "var(--acid)", fontSize: "11", textAnchor: "middle", children: "A · Hombros" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "232", y1: "48", x2: "255", y2: "95", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "270", y: "75", fill: "var(--acid)", fontSize: "11", textAnchor: "middle", transform: "rotate(63 270 75)", children: "B · Manga" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "150", y1: "65", x2: "150", y2: "215", stroke: "var(--acid)", strokeWidth: "1", strokeDasharray: "3 3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "158", y: "145", fill: "var(--acid)", fontSize: "11", children: "C · Largo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "78", y1: "235", x2: "222", y2: "235", stroke: "var(--acid)", strokeWidth: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "150", y: "252", fill: "var(--acid)", fontSize: "11", textAnchor: "middle", children: "D · Pecho" })
                ] })
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-4", children: "Tabla de tallas (cm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse min-w-[420px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-bone/[0.03]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal", children: "Talla" }),
                  columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal", children: capitalize(col) }, col))
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-bone/[0.02]"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-display text-base text-acid", children: row.size.toUpperCase() }),
                  columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-cream/70", children: row.measurements[col] }, col))
                ] }, row.id)) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10px] text-cream/30 uppercase tracking-[0.2em]", children: "* Pueden variar ±1 cm según el tejido y el lavado." })
            ] }),
            Object.keys(howToMeasure).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-4", children: "Cómo tomar tus medidas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Object.entries(howToMeasure).map(([key, value], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-acid/60 shrink-0 w-6", children: String(idx + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm uppercase text-cream", children: capitalize(key) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-relaxed text-cream/55 mt-0.5", children: value })
                ] })
              ] }, key)) })
            ] }),
            fitNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-5 bg-acid/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-2", children: "Fit oversize" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-relaxed text-cream/55", children: fitNote })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  SizeGuideModal as S
};
