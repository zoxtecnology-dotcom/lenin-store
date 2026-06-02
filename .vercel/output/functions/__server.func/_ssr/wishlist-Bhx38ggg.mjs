import { N as jsxRuntimeExports } from "./index.mjs";
import { R as Route$I, a1 as useWishlist, L as Link } from "./router-Cd0oBxWL.mjs";
import { S as SiteHeader, H as Heart, F as Footer } from "./Footer-CbOX52zc.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { P as ProductCard } from "./ProductCard-DJGdfYqh.mjs";
import { A as ArrowLeft } from "./arrow-left-COmzqrIF.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./menu-BYb1-akj.mjs";
import "./user-vzxeEXK0.mjs";
import "./shopping-bag-6dSKfxZg.mjs";
import "./check-DeLqmXJ4.mjs";
function WishlistPage() {
  const {
    products
  } = Route$I.useLoaderData();
  const {
    items
  } = useWishlist();
  const saved = products.filter((p) => items.includes(p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 12 }),
        "Volver a inicio"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Tu lista" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream", children: "Guardados" }) }),
      saved.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-cream/40", children: [
        saved.length,
        " ",
        saved.length === 1 ? "producto" : "productos"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: saved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 40, strokeWidth: 1, className: "text-cream/20 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl uppercase text-cream/30 mb-4", children: "Nada guardado aún" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/40 mb-8 max-w-xs", children: "Guarda las prendas que te interesan para no perderlas cuando se acabe el drop." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$handle", params: {
        handle: "nuevo"
      }, className: "bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity", children: "Ver colección" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6", children: saved.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, delay: i * 60 }, p.slug)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  WishlistPage as component
};
