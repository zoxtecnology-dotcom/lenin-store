import { N as jsxRuntimeExports } from "./index.mjs";
import { e as Route$r, L as Link, z as fmtCOP } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./types-D0vF8QzC.mjs";
import "./menu-BkUjdS50.mjs";
import "./user-zcyQNMe0.mjs";
import "./arrow-right-BKj3kHQ9.mjs";
import "./shopping-bag-Ce0JJ2U8.mjs";
function PackCard({
  pack
}) {
  const original = pack.items.reduce((s, i) => s + i.product.price, 0);
  const final = Math.round(original * (1 - pack.discount / 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packs/$id", params: {
    id: pack.slug
  }, className: "group block border border-border hover:border-cream/30 transition-colors h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 flex gap-px bg-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 z-10 bg-acid text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-1 font-medium", children: [
        "-",
        pack.discount,
        "%"
      ] }),
      pack.items.map(({
        product
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.front, alt: product.name, className: "h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s]" }) }, product.slug))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] text-acid mb-1", children: pack.tag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl uppercase text-cream mb-3", children: pack.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50 leading-relaxed mb-4 line-clamp-2", children: pack.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-5 border-t border-border pt-4", children: pack.items.map(({
        product
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.12em] text-cream/50 truncate", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/30 line-through shrink-0", children: fmtCOP(product.price) })
      ] }, product.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-cream", children: fmtCOP(final) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.15em] text-acid", children: [
          "-",
          fmtCOP(original - final)
        ] })
      ] })
    ] })
  ] });
}
function PacksPage() {
  const {
    packs
  } = Route$r.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Mejor precio" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream", children: "Packs" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-lg text-base leading-relaxed text-cream/55", children: "Combina prendas y ahorra hasta un 15%. Elige tu pack, selecciona las tallas y listo." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: packs.map((pack, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackCard, { pack }) }, pack.id)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PacksPage as component
};
