import { Y as reactExports, N as jsxRuntimeExports } from "./_ssr/index.mjs";
import { g as Route$l, V as useCart, L as Link, y as fmtCOP, A as ArrowRight, t as cn } from "./_ssr/router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer } from "./_ssr/Footer-CbOX52zc.mjs";
import { R as Reveal } from "./_ssr/Reveal-BJbI2hXw.mjs";
import { S as SizeGuideModal } from "./_ssr/SizeGuideModal-CAP3KUJt.mjs";
import { C as Check } from "./_ssr/check-DeLqmXJ4.mjs";
import { P as Package } from "./_ssr/package-Dl87lcow.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
import "./_ssr/menu-BYb1-akj.mjs";
import "./_ssr/user-vzxeEXK0.mjs";
import "./_ssr/shopping-bag-6dSKfxZg.mjs";
import "./_ssr/size-guides-BTy17x57.mjs";
import "./_ssr/loader-bWMdxCq7.mjs";
function PackDetailPage() {
  const {
    pack,
    allPacks
  } = Route$l.useLoaderData();
  const {
    add,
    setOpen
  } = useCart();
  const [sizes, setSizes] = reactExports.useState({});
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [guideOpen, setGuideOpen] = reactExports.useState(false);
  const [guideCategory, setGuideCategory] = reactExports.useState(void 0);
  const [added, setAdded] = reactExports.useState(false);
  const originalTotal = pack.items.reduce((s, i) => s + i.product.price, 0);
  const discountedTotal = Math.round(originalTotal * (1 - pack.discount / 100));
  const savings = originalTotal - discountedTotal;
  const allImages = pack.items.flatMap((i) => i.product.images.slice(0, 2));
  const allSelected = pack.items.every(({
    product
  }) => product.sizes.length <= 1 || sizes[product.slug]);
  function handleAdd() {
    if (!allSelected) return;
    add({
      slug: `pack-${pack.id}`,
      name: pack.name,
      price: discountedTotal,
      image: pack.items[0].product.front,
      pieces: pack.items.map(({
        product
      }) => ({
        name: product.name,
        size: sizes[product.slug] ?? product.sizes[0] ?? "Única"
      }))
    });
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SizeGuideModal, { open: guideOpen, onClose: () => setGuideOpen(false), category: guideCategory }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-cream transition-colors", children: "Inicio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packs", className: "hover:text-cream transition-colors", children: "Packs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80", children: pack.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: allImages[activeImg] ?? pack.items[0].product.front, alt: pack.name, className: "h-full w-full object-cover object-top transition-opacity duration-300" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: allImages.slice(0, 8).map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImg(i), className: `aspect-square overflow-hidden bg-bone border-b-2 transition-colors ${activeImg === i ? "border-cream" : "border-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-full w-full object-cover object-top" }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid mb-3", children: pack.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-4", children: pack.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-4 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-cream", children: fmtCOP(discountedTotal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-cream/35 line-through", children: fmtCOP(originalTotal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium", children: [
                "-",
                pack.discount,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.2em] text-acid mb-6", children: [
              "Ahorras ",
              fmtCOP(savings)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/60 mb-8", children: pack.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8", children: pack.items.map(({
            product
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.front, alt: product.name, className: "w-12 h-14 object-cover object-top bg-bone shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.2em] text-cream/40", children: product.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream font-medium", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/35 line-through", children: fmtCOP(product.price) })
              ] })
            ] }),
            product.sizes.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] text-cream/40", children: "Talla" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                  setGuideCategory(product.category);
                  setGuideOpen(true);
                }, className: "text-[9px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1", children: [
                  "Guía de tallas ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 9, strokeWidth: 1.5 })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSizes((prev) => ({
                ...prev,
                [product.slug]: size
              })), className: cn("px-3 py-2 text-[11px] uppercase tracking-[0.15em] border transition-colors", sizes[product.slug] === size ? "bg-acid text-ink border-acid" : "border-border text-cream/70 hover:border-cream/40 hover:text-cream"), children: size }, size)) }),
              sizes[product.slug] && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[9px] text-acid uppercase tracking-[0.2em] flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, strokeWidth: 2 }),
                " Talla ",
                sizes[product.slug]
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40", children: "Talla única" })
          ] }) }, product.slug)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, disabled: !allSelected, className: cn("w-full flex items-center justify-center gap-3 py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all", allSelected ? "bg-acid text-ink hover:opacity-90" : "bg-border text-cream/30 cursor-not-allowed"), children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, strokeWidth: 2 }),
            " ¡Pack agregado!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14, strokeWidth: 1.5 }),
            allSelected ? "Agregar pack al carrito" : "Selecciona todas las tallas"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-border pt-5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] text-cream/35 mb-3", children: "Incluye" }),
            pack.items.map(({
              product
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/55", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/35 line-through", children: fmtCOP(product.price) })
            ] }, product.slug)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] border-t border-border pt-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-acid uppercase tracking-[0.15em]", children: [
                "Total pack (",
                pack.discount,
                "% off)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream font-medium", children: fmtCOP(discountedTotal) })
            ] })
          ] }) })
        ] })
      ] }),
      allPacks.filter((p) => p.id !== pack.id).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-24 border-t border-border pt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-8", children: "— Otros packs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-5", children: allPacks.filter((p) => p.id !== pack.id).map((p) => {
          const orig = p.items.reduce((s, i) => s + i.product.price, 0);
          const final = Math.round(orig * (1 - p.discount / 100));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packs/$id", params: {
            id: p.slug
          }, className: "group border border-border hover:border-cream/30 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 flex gap-px bg-border overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 right-2 z-10 bg-acid text-ink text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 font-medium", children: [
                "-",
                p.discount,
                "%"
              ] }),
              p.items.map(({
                product
              }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.front, alt: "", className: "h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700" }) }, product.slug))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm uppercase text-cream mb-1", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/50", children: fmtCOP(final) })
            ] })
          ] }, p.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PackDetailPage as component
};
