import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { G as useCart, H as useWishlist, q as cn, r as fmtCOP } from "./router-BAT9GkoO.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { H as Heart, C as Check, q as Plus } from "../_libs/lucide-react.mjs";
function ProductCard({ product: p, delay = 0 }) {
  const { add, setOpen } = useCart();
  const { toggle, has } = useWishlist();
  const [panelOpen, setPanelOpen] = reactExports.useState(false);
  const [justAdded, setJustAdded] = reactExports.useState(false);
  const [selectedColor, setSelectedColor] = reactExports.useState(p.colors[0]?.name ?? "");
  const isConjunto = p.type === "conjunto";
  const wishlisted = has(p.slug);
  const totalStock = p.stock ?? 0;
  const isAgotado = totalStock === 0;
  const discountPct = p.compareAtPrice && p.compareAtPrice > p.price ? Math.round((1 - p.price / p.compareAtPrice) * 100) : null;
  function stockForVariant(color, size) {
    if (!p.variants || p.variants.length === 0) return 99;
    return p.variants.filter((v) => v.color_name === color && v.size === size && v.piece === null).reduce((sum, v) => sum + v.stock, 0);
  }
  function handleSize(size, e) {
    e.preventDefault();
    e.stopPropagation();
    if (stockForVariant(selectedColor, size) === 0) return;
    add({ slug: p.slug, name: p.name, price: p.price, image: p.front, size, color: selectedColor });
    setJustAdded(true);
    setOpen(true);
    setTimeout(() => {
      setJustAdded(false);
      setPanelOpen(false);
    }, 1e3);
  }
  function togglePanel(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAgotado) setPanelOpen((v) => !v);
  }
  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.slug);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-bone", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-3 top-3 z-10 flex flex-col gap-1.5", children: [
        discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid text-ink px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em]", children: [
          "-",
          discountPct,
          "%"
        ] }),
        isAgotado && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-background/90 border border-border text-cream/60 px-2 py-1 text-[9px] uppercase tracking-[0.2em]", children: "Agotado" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleWishlist,
          "aria-label": wishlisted ? "Quitar de guardados" : "Guardar",
          className: cn(
            "absolute right-3 top-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200",
            wishlisted ? "text-acid bg-background/80" : "text-cream/0 bg-background/0 group-hover:text-cream/70 group-hover:bg-background/60"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 15, strokeWidth: 1.5, fill: wishlisted ? "currentColor" : "none" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: { slug: p.slug }, className: "block h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: p.front,
            alt: p.name,
            loading: "lazy",
            width: 1024,
            height: 1280,
            className: cn(
              "card-img card-img-front absolute inset-0 h-full w-full object-cover",
              isAgotado && "opacity-50"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: p.back,
            alt: "",
            "aria-hidden": true,
            loading: "lazy",
            width: 1024,
            height: 1280,
            className: "card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0"
          }
        )
      ] }),
      !isConjunto && !isAgotado && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
        "absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-3 py-3 transition-transform duration-200",
        panelOpen ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
      ), children: [
        p.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mb-2", children: p.colors.map((c) => {
          const colorStock = p.sizes.reduce((sum, s) => sum + stockForVariant(c.name, s), 0);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedColor(c.name);
              },
              disabled: colorStock === 0,
              title: colorStock === 0 ? `${c.name} — agotado` : c.name,
              className: cn(
                "w-5 h-5 border-2 rounded-full transition-all",
                selectedColor === c.name ? "border-cream scale-110" : "border-transparent",
                colorStock === 0 && "opacity-30 cursor-not-allowed"
              ),
              style: { backgroundColor: c.swatch }
            },
            c.name
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.25em] text-cream/40 mb-2", children: justAdded ? "¡Agregado!" : "Selecciona talla" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: p.sizes.map((size) => {
          const stock = stockForVariant(selectedColor, size);
          const outOfStock = stock === 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => handleSize(size, e),
              disabled: outOfStock,
              className: cn(
                "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors border relative",
                justAdded && !outOfStock ? "border-acid bg-acid text-ink" : outOfStock ? "border-border/30 text-cream/20 cursor-not-allowed line-through" : "border-border text-cream hover:bg-acid hover:text-ink hover:border-acid"
              ),
              children: justAdded && !outOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, strokeWidth: 2.5 }) : size
            },
            size
          );
        }) })
      ] }),
      !isConjunto && !isAgotado && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: togglePanel,
          "aria-label": "Compra rápida",
          className: cn(
            "absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200 md:hidden",
            panelOpen ? "bg-acid text-ink rotate-45" : "bg-background/80 text-cream border border-border/60"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, strokeWidth: 2 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$slug", params: { slug: p.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.18em] text-cream", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tabular-nums text-cream/70", children: fmtCOP(p.price) }),
        p.compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] tabular-nums text-cream/30 line-through", children: fmtCOP(p.compareAtPrice) })
      ] })
    ] }) })
  ] }) });
}
export {
  ProductCard as P
};
