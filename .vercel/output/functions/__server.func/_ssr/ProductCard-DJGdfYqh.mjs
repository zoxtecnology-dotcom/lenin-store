import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { V as useCart, a1 as useWishlist, t as cn, L as Link, P as Plus, y as fmtCOP, X, x as createLucideIcon } from "./router-Cd0oBxWL.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { H as Heart } from "./Footer-CbOX52zc.mjs";
import { C as Check } from "./check-DeLqmXJ4.mjs";
import { S as ShoppingBag } from "./shopping-bag-6dSKfxZg.mjs";
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function ProductCard({ product: p, delay = 0, noTouchSwipe = false }) {
  const { add, setOpen } = useCart();
  const { toggle, has } = useWishlist();
  const [justAdded, setJustAdded] = reactExports.useState(false);
  const [selectedColor, setSelectedColor] = reactExports.useState(p.colors[0]?.name ?? "");
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [sheetSize, setSheetSize] = reactExports.useState(null);
  const isConjunto = p.type === "conjunto";
  const wishlisted = has(p.id);
  const totalStock = p.stock ?? 0;
  const isAgotado = totalStock === 0;
  const allImages = (isConjunto && p.conjunto ? [
    p.conjunto.fullImages?.[0],
    p.conjunto.topImages?.[0],
    p.conjunto.bottomImages?.[0]
  ] : [p.front, p.back, ...p.images.slice(2)]).filter(Boolean).slice(0, 3);
  const [hoverImg, setHoverImg] = reactExports.useState(0);
  const touchRef = reactExports.useRef({ x: 0, y: 0, lock: null });
  function imgFromX(clientX, rect) {
    if (allImages.length <= 1) return 0;
    const x = (clientX - rect.left) / rect.width;
    return Math.min(Math.max(Math.floor(x * allImages.length), 0), allImages.length - 1);
  }
  function onTouchStart(e) {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, lock: null };
  }
  function onTouchMove(e) {
    if (allImages.length <= 1) return;
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (!touchRef.current.lock && Math.abs(dx) + Math.abs(dy) > 8) {
      touchRef.current.lock = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
    }
    if (touchRef.current.lock === "h") {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverImg(imgFromX(t.clientX, rect));
    }
  }
  function onTouchEnd() {
    touchRef.current.lock = null;
    setHoverImg(0);
  }
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
    setTimeout(() => setJustAdded(false), 1e3);
  }
  function addFromSheet() {
    if (!sheetSize) return;
    add({ slug: p.slug, name: p.name, price: p.price, image: p.front, size: sheetSize, color: selectedColor });
    setSheetOpen(false);
    setSheetSize(null);
    setOpen(true);
  }
  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.id);
  }
  function openSheet(e) {
    e.preventDefault();
    e.stopPropagation();
    setSheetOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
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
              wishlisted ? "text-acid bg-background/80" : "text-cream/60 bg-background/60 md:text-cream/0 md:bg-background/0 md:group-hover:text-cream/70 md:group-hover:bg-background/60"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 15, strokeWidth: 1.5, fill: wishlisted ? "currentColor" : "none" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$slug",
            params: { slug: p.slug },
            className: "block h-full",
            onMouseMove: (e) => {
              if (allImages.length <= 1) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              setHoverImg(Math.min(Math.floor(x * allImages.length), allImages.length - 1));
            },
            onMouseLeave: () => setHoverImg(0),
            onTouchStart: noTouchSwipe ? void 0 : onTouchStart,
            onTouchMove: noTouchSwipe ? void 0 : onTouchMove,
            onTouchEnd: noTouchSwipe ? void 0 : onTouchEnd,
            children: allImages.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img,
                alt: i === 0 ? p.name : "",
                "aria-hidden": i > 0,
                loading: "lazy",
                width: 1024,
                height: 1280,
                className: cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  isAgotado && i === 0 && "opacity-50",
                  hoverImg === i ? "opacity-100" : i === 0 && hoverImg === 0 ? "opacity-100" : "opacity-0"
                )
              },
              i
            ))
          }
        ),
        !isConjunto && !isAgotado && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-3 py-3 transition-transform duration-200 translate-y-full group-hover:translate-y-0", children: [
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
            onClick: openSheet,
            "aria-label": "Compra rápida",
            className: "md:hidden absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-cream text-ink rounded-full shadow-lg active:scale-90 transition-transform",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18, strokeWidth: 2 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$slug", params: { slug: p.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start justify-between gap-3 min-h-[3rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.18em] text-cream line-clamp-2 flex-1", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tabular-nums text-cream/70", children: fmtCOP(p.price) }),
          p.compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] tabular-nums text-cream/30 line-through", children: fmtCOP(p.compareAtPrice) })
        ] })
      ] }) })
    ] }),
    sheetOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed inset-0 z-[100]", onClick: () => setSheetOpen(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          className: "absolute bottom-0 inset-x-0 bg-background border-t border-border p-5 pb-8 animate-in slide-in-from-bottom duration-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.front, alt: p.name, className: "w-16 h-20 object-cover bg-bone shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.18em] text-cream", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream", children: fmtCOP(p.price) }),
                  p.compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/30 line-through", children: fmtCOP(p.compareAtPrice) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSheetOpen(false), className: "text-cream/40 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, strokeWidth: 1.5 }) })
            ] }),
            p.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2", children: [
                "Color — ",
                selectedColor
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: p.colors.map((c) => {
                const colorStock = p.sizes.reduce((sum, s) => sum + stockForVariant(c.name, s), 0);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setSelectedColor(c.name);
                      setSheetSize(null);
                    },
                    disabled: colorStock === 0,
                    className: cn(
                      "w-8 h-8 border-2 rounded-full transition-all",
                      selectedColor === c.name ? "border-cream scale-110" : "border-transparent",
                      colorStock === 0 && "opacity-30 cursor-not-allowed"
                    ),
                    style: { backgroundColor: c.swatch }
                  },
                  c.name
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2", children: "Talla" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.sizes.map((size) => {
                const stock = stockForVariant(selectedColor, size);
                const out = stock === 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => !out && setSheetSize(size),
                    disabled: out,
                    className: cn(
                      "min-w-[48px] px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] border transition-colors",
                      sheetSize === size ? "bg-cream text-ink border-cream" : out ? "border-border/30 text-cream/20 line-through cursor-not-allowed" : "border-border text-cream"
                    ),
                    children: size
                  },
                  size
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: addFromSheet,
                  disabled: !sheetSize,
                  className: "w-full flex items-center justify-center gap-2 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium disabled:opacity-40 transition-opacity",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, strokeWidth: 2 }),
                    " Comprar ahora"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: addFromSheet,
                  disabled: !sheetSize,
                  className: "w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium disabled:opacity-40 transition-opacity",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14, strokeWidth: 1.5 }),
                    " Agregar al carrito"
                  ]
                }
              ),
              !sheetSize && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] uppercase tracking-[0.2em] text-cream/30 mt-1", children: "Selecciona una talla" })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductCard as P
};
