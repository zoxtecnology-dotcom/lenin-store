import { Y as reactExports, N as jsxRuntimeExports } from "./_ssr/index.mjs";
import { i as Route$l, L as Link, u as cn, z as fmtCOP } from "./_ssr/router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./_ssr/Footer-DFgriNjy.mjs";
import { R as Reveal } from "./_ssr/Reveal-BJbI2hXw.mjs";
import { P as ProductCard } from "./_ssr/ProductCard-ljUhpBBa.mjs";
import { S as SizeGuideModal } from "./_ssr/SizeGuideModal-CNTZkq3m.mjs";
import { A as ArrowLeft } from "./_ssr/arrow-left-jnwlvACu.mjs";
import { A as ArrowRight } from "./_ssr/arrow-right-BKj3kHQ9.mjs";
import { C as Check } from "./_ssr/check-D3HPHoXN.mjs";
import { P as Package } from "./_ssr/package-g1oPrVnX.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
import "./_ssr/types-D0vF8QzC.mjs";
import "./_ssr/menu-BkUjdS50.mjs";
import "./_ssr/user-zcyQNMe0.mjs";
import "./_ssr/shopping-bag-Ce0JJ2U8.mjs";
import "./_ssr/size-guides-Be2wHUyr.mjs";
import "./_ssr/loader-C9Dviu41.mjs";
function DropDetailPage() {
  const {
    drop,
    dropProducts
  } = Route$l.useLoaderData();
  const [mode, setMode] = reactExports.useState("piezas");
  const [sizes, setSizes] = reactExports.useState({});
  const [added, setAdded] = reactExports.useState(false);
  const [guideOpen, setGuideOpen] = reactExports.useState(false);
  const [guideCategory, setGuideCategory] = reactExports.useState(void 0);
  const DROP_DISCOUNT = drop.discount;
  const originalTotal = dropProducts.reduce((s, p) => s + p.price, 0);
  const discountedTotal = Math.round(originalTotal * (1 - DROP_DISCOUNT / 100));
  const savings = originalTotal - discountedTotal;
  const allSelected = dropProducts.every((p) => p.sizes.length <= 1 || sizes[p.slug]);
  function handleAddDrop() {
    if (!allSelected) return;
    add({
      slug: `drop-${drop.slug}`,
      name: `${drop.name} — ${drop.label}`,
      price: discountedTotal,
      image: dropProducts[0]?.front,
      pieces: dropProducts.map((p) => ({
        name: p.name,
        size: sizes[p.slug] ?? p.sizes[0] ?? "Única"
      }))
    });
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SizeGuideModal, { open: guideOpen, onClose: () => setGuideOpen(false), category: guideCategory }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 min-h-[70vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden order-2 md:order-1", style: {
        minHeight: "400px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop.editorialImages[0], alt: drop.name, fetchPriority: "high", className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-1 md:order-2 flex flex-col justify-end pb-12 pt-28 md:pt-36 px-5 md:px-10 lg:px-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drops", className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/40 hover:text-acid transition-colors mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 12, strokeWidth: 1.5 }),
          "Todos los drops"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 60, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-3", children: "— Disponible ahora" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(4rem,12vw,11rem)] uppercase leading-[0.85] text-cream", children: drop.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-2xl text-cream/60 mt-3 mb-6", children: [
          drop.label,
          " · ",
          drop.season
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.3em] text-cream/35", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Medellín, Colombia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: drop.releaseDate ? new Date(drop.releaseDate).toLocaleDateString("es-CO", {
            month: "long",
            year: "numeric"
          }) : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            dropProducts.length,
            " piezas"
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-cream/90", children: [
          '"',
          drop.editorialQuote,
          '"'
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5 md:col-start-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/60", children: drop.editorialBody }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:gap-4 mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop.editorialImages[1], alt: "Editorial", className: "w-full aspect-[3/4] object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop.editorialImages[2], alt: "Editorial", className: "w-full aspect-[3/4] object-cover" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Cómo quieres llevártelo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-px w-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("piezas"), className: cn("px-6 py-3 text-[11px] uppercase tracking-[0.25em] border transition-colors", mode === "piezas" ? "bg-cream text-ink border-cream" : "border-border text-cream/50 hover:border-cream/40 hover:text-cream"), children: "Por piezas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("completo"), className: cn("px-6 py-3 text-[11px] uppercase tracking-[0.25em] border transition-colors flex items-center gap-2", mode === "completo" ? "bg-acid text-ink border-acid" : "border-border text-cream/50 hover:border-cream/40 hover:text-cream"), children: [
            "Drop completo",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-[9px] px-1.5 py-0.5 font-medium", mode === "completo" ? "bg-ink/20 text-ink" : "bg-acid/20 text-acid"), children: [
              "-",
              DROP_DISCOUNT,
              "%"
            ] })
          ] })
        ] })
      ] }) }),
      mode === "piezas" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", children: dropProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, delay: i * 60 }, p.slug)) }),
      mode === "completo" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-6", children: "Selecciona tu talla en cada prenda" }),
          dropProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.front, alt: p.name, className: "w-12 h-14 object-cover object-top bg-bone shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.2em] text-cream/40", children: p.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream font-medium", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/35 line-through", children: fmtCOP(p.price) })
              ] })
            ] }),
            p.sizes.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] text-cream/40", children: "Talla" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                  setGuideCategory(p.category);
                  setGuideOpen(true);
                }, className: "text-[9px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1", children: [
                  "Guía ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 9, strokeWidth: 1.5 })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSizes((prev) => ({
                ...prev,
                [p.slug]: size
              })), className: cn("px-3 py-2 text-[11px] uppercase tracking-[0.15em] border transition-colors", sizes[p.slug] === size ? "bg-acid text-ink border-acid" : "border-border text-cream/70 hover:border-cream/40 hover:text-cream"), children: size }, size)) }),
              sizes[p.slug] && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[9px] text-acid uppercase tracking-[0.2em] flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, strokeWidth: 2 }),
                " Talla ",
                sizes[p.slug]
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40", children: "Talla única" })
          ] }, p.slug))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] text-cream/35 mb-4", children: "Resumen del drop" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: dropProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/55", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/35 line-through", children: fmtCOP(p.price) })
            ] }, p.slug)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/40 uppercase tracking-[0.15em]", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/40 line-through", children: fmtCOP(originalTotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-acid uppercase tracking-[0.15em]", children: [
                  "Descuento -",
                  DROP_DISCOUNT,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-acid", children: [
                  "-",
                  fmtCOP(savings)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mt-3 pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-[0.2em] text-cream", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-cream", children: fmtCOP(discountedTotal) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddDrop, disabled: !allSelected, className: cn("w-full flex items-center justify-center gap-3 py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all", allSelected ? "bg-acid text-ink hover:opacity-90" : "bg-border text-cream/30 cursor-not-allowed"), children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, strokeWidth: 2 }),
            " ¡Drop agregado!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14, strokeWidth: 1.5 }),
            allSelected ? `Agregar drop completo — ${fmtCOP(discountedTotal)}` : "Selecciona todas las tallas"
          ] }) }),
          !allSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[10px] text-cream/35 text-center uppercase tracking-[0.2em]", children: [
            "Falta seleccionar talla en ",
            dropProducts.filter((p) => p.sizes.length > 1 && !sizes[p.slug]).length,
            " prenda",
            dropProducts.filter((p) => p.sizes.length > 1 && !sizes[p.slug]).length !== 1 ? "s" : ""
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  DropDetailPage as component
};
