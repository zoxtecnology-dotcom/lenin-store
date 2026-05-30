import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./_ssr/Footer-DHlaPfKw.mjs";
import { d as Route$g, G as useCart, r as fmtCOP, H as useWishlist, q as cn } from "./_ssr/router-BAT9GkoO.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "./_libs/radix-ui__react-accordion.mjs";
import { a as ArrowRight, H as Heart, P as Package, R as RefreshCw, u as ShieldCheck, o as Minus, q as Plus, c as ChevronDown } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/zod.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-collapsible.mjs";
import "./_libs/radix-ui__react-direction.mjs";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
function ProductPage() {
  const {
    product
  } = Route$g.useLoaderData();
  const isConjunto = product.type === "conjunto" && !!product.conjunto;
  return isConjunto ? /* @__PURE__ */ jsxRuntimeExports.jsx(ConjuntoProductPage, { product }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StandardProductPage, { product });
}
function StandardProductPage({
  product
}) {
  const {
    add,
    setOpen
  } = useCart();
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [selectedColor, setSelectedColor] = reactExports.useState(0);
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [qty, setQty] = reactExports.useState(1);
  const {
    toggle: toggle2,
    has
  } = useWishlist();
  const wishlisted = has(product.slug);
  function handleAddToCart() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.front,
      size: selectedSize ?? void 0,
      color: product.colors[selectedColor]?.name
    });
    setOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { category: product.category, name: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gallery, { images: product.images, active: activeImage, onSelect: setActiveImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropWishlist, { drop: product.drop, wishlisted, onWishlist: () => toggle2(product.slug) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceBlock, { price: product.price, compareAtPrice: product.compareAtPrice }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/70 mb-8", children: product.shortDescription }),
          product.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { colors: product.colors, selected: selectedColor, onSelect: setSelectedColor, variants: product.variants ?? [], sizes: product.sizes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SizePicker, { sizes: product.sizes, selected: selectedSize, onSelect: setSelectedSize, variants: product.variants ?? [], selectedColor: product.colors[selectedColor]?.name ?? "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QtyPicker, { qty, onChange: setQty }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddToCart, className: "w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300", children: "Añadir al carrito" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300", children: [
              "Comprar ya ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13, strokeWidth: 1.5 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductAccordion, { product })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { currentSlug: product.slug, category: product.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function ConjuntoProductPage({
  product
}) {
  const {
    add,
    setOpen
  } = useCart();
  const c = product.conjunto;
  const [combo, setCombo] = reactExports.useState("completo");
  const [topSize, setTopSize] = reactExports.useState(null);
  const [bottomSize, setBottomSize] = reactExports.useState(null);
  const [selectedColor, setSelectedColor] = reactExports.useState(0);
  const [wishlisted, setWishlisted] = reactExports.useState(false);
  const activeImages = combo === "completo" ? c.fullImages : combo === "top" ? c.topImages : c.bottomImages;
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const activePrice = combo === "completo" ? product.price : combo === "top" ? c.topPrice : c.bottomPrice;
  const activeName = combo === "completo" ? product.name : combo === "top" ? c.topName : c.bottomName;
  const savings = Math.round((1 - product.price / (c.topPrice + c.bottomPrice)) * 100);
  function handleAddToCart() {
    if (combo === "completo") {
      add({
        slug: product.slug + "-completo",
        name: product.name,
        price: product.price,
        image: c.fullImages[0],
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "completo",
        pieces: [{
          name: c.topName,
          size: topSize ?? "?"
        }, {
          name: c.bottomName,
          size: bottomSize ?? "?"
        }]
      });
    } else if (combo === "top") {
      add({
        slug: product.slug + "-top",
        name: c.topName,
        price: c.topPrice,
        image: c.topImages[0],
        size: topSize ?? void 0,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "top"
      });
    } else {
      add({
        slug: product.slug + "-bottom",
        name: c.bottomName,
        price: c.bottomPrice,
        image: c.bottomImages[0],
        size: bottomSize ?? void 0,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "bottom"
      });
    }
    setOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { category: product.category, name: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gallery, { images: activeImages, active: Math.min(activeImage, activeImages.length - 1), onSelect: setActiveImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropWishlist, { drop: product.drop, wishlisted, onWishlist: () => toggle(product.slug) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6", children: activeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-cream", children: fmtCOP(activePrice) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-6", children: [
            "6 cuotas de ",
            fmtCOP(Math.round(activePrice / 6)),
            " con Addi / Sistecredito"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/70 mb-8", children: product.shortDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-4", children: "Elige tu combo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [{
              key: "completo",
              label: "Conjunto Completo",
              sub: `${c.topName.split("/")[0].trim()} + ${c.bottomName.split("/")[0].trim()}`,
              price: product.price,
              badge: `Ahorra ${savings}%`,
              img: c.fullImages[0]
            }, {
              key: "top",
              label: c.topName.split("/")[0].trim(),
              sub: "Solo buso",
              price: c.topPrice,
              img: c.topImages[0]
            }, {
              key: "bottom",
              label: c.bottomName.split("/")[0].trim(),
              sub: "Solo pantalón",
              price: c.bottomPrice,
              img: c.bottomImages[0]
            }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setCombo(opt.key);
              setActiveImage(0);
            }, className: `relative flex flex-col border text-left transition-all duration-200 overflow-hidden ${combo === opt.key ? "border-cream" : "border-border hover:border-cream/40"}`, children: [
              combo === opt.key && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-2.5 h-2.5 bg-acid rounded-full z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-bone relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: opt.img, alt: opt.label, className: "absolute inset-0 w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-medium uppercase tracking-[0.2em] text-cream leading-tight", children: opt.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-cream/40 uppercase tracking-[0.15em] mt-0.5", children: fmtCOP(opt.price) }),
                "badge" in opt && opt.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 inline-block bg-acid text-ink text-[8px] px-1.5 py-0.5 uppercase tracking-[0.15em] font-medium", children: opt.badge })
              ] })
            ] }, opt.key)) }),
            combo === "completo" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] uppercase tracking-[0.2em] text-acid flex items-center gap-1", children: "✓ Mejor precio" })
          ] }),
          product.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { colors: product.colors, selected: selectedColor, onSelect: setSelectedColor }),
          (combo === "completo" || combo === "top") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: [
              "Talla — ",
              c.topName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTopSize(size), className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${topSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: size }, size)) })
          ] }),
          (combo === "completo" || combo === "bottom") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: [
              "Talla — ",
              c.bottomName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBottomSize(size), className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${bottomSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: size }, size)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddToCart, className: "w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300", children: combo === "completo" ? "Añadir conjunto al carrito" : combo === "top" ? `Añadir ${c.topName.split("/")[0].trim()} al carrito` : `Añadir ${c.bottomName.split("/")[0].trim()} al carrito` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300", children: [
              "Comprar ya ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13, strokeWidth: 1.5 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductAccordion, { product })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { currentSlug: product.slug, category: product.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const CATEGORY_HANDLE = {
  Camisetas: "camisetas",
  Gorras: "gorras",
  Busos: "hombre",
  Conjuntos: "hombre",
  Pantalonetas: "hombre",
  Pantalones: "hombre"
};
function Breadcrumb({
  category,
  name
}) {
  const handle = CATEGORY_HANDLE[category] ?? "nuevo";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-cream transition-colors", children: "Inicio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$handle", params: {
      handle
    }, className: "hover:text-cream transition-colors", children: category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 truncate max-w-[16rem]", children: name })
  ] });
}
function Gallery({
  images,
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: images[active], alt: "", className: "h-full w-full object-cover transition-opacity duration-300" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSelect(i), className: `aspect-square overflow-hidden bg-bone border-b-2 transition-colors ${active === i ? "border-cream" : "border-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-full w-full object-cover" }) }, i)) })
  ] });
}
function DropWishlist({
  drop,
  wishlisted,
  onWishlist
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: drop }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onWishlist, "aria-label": "Guardar en wishlist", className: `transition-colors ${wishlisted ? "text-acid" : "text-cream/40 hover:text-cream"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18, strokeWidth: 1.5, fill: wishlisted ? "currentColor" : "none" }) })
  ] });
}
function PriceBlock({
  price,
  compareAtPrice
}) {
  const discountPct = compareAtPrice && compareAtPrice > price ? Math.round((1 - price / compareAtPrice) * 100) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-cream", children: fmtCOP(price) }),
      compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-cream/30 line-through", children: fmtCOP(compareAtPrice) }),
      discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid text-ink text-[10px] px-2 py-0.5 uppercase tracking-[0.15em] font-medium", children: [
        "-",
        discountPct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-5", children: [
      "6 cuotas de ",
      fmtCOP(Math.round(price / 6)),
      " con Addi / Sistecredito"
    ] })
  ] });
}
function ColorPicker({
  colors,
  selected,
  onSelect,
  variants,
  sizes
}) {
  function colorStock(colorName) {
    if (!variants.length) return 99;
    return sizes.reduce((sum, s) => sum + variants.filter((v) => v.color_name === colorName && v.size === s && v.piece === null).reduce((a, v) => a + v.stock, 0), 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream", children: colors[selected].name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: colors.map((color, i) => {
      const stock = colorStock(color.name);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => stock > 0 && onSelect(i), "aria-label": `${color.name}${stock === 0 ? " — agotado" : ""}`, disabled: stock === 0, className: `w-8 h-8 border-2 transition-all ${selected === i ? "border-cream scale-110" : "border-transparent"} ${stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`, style: {
        backgroundColor: color.swatch
      } }, i);
    }) })
  ] });
}
function SizePicker({
  sizes,
  selected,
  onSelect,
  variants,
  selectedColor
}) {
  function sizeStock(size) {
    if (!variants.length) return 99;
    return variants.filter((v) => v.color_name === selectedColor && v.size === size && v.piece === null).reduce((sum, v) => sum + v.stock, 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Talla" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/guia-de-tallas", className: "text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1", children: [
        "Guía de tallas ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 10, strokeWidth: 1.5 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sizes.map((size) => {
      const stock = sizeStock(size);
      const out = stock === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !out && onSelect(size), disabled: out, className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all relative ${selected === size ? "bg-cream text-ink border-cream" : out ? "text-cream/20 border-border/30 cursor-not-allowed line-through" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: [
        size,
        !out && stock <= 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-acid text-ink text-[8px] w-4 h-4 flex items-center justify-center font-bold", children: stock })
      ] }, size);
    }) })
  ] });
}
function QtyPicker({
  qty,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: "Cantidad" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 border border-border w-fit px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(Math.max(1, qty - 1)), "aria-label": "Reducir", className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tabular-nums text-cream w-6 text-center", children: qty }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(qty + 1), "aria-label": "Aumentar", className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 1.5 }) })
    ] })
  ] });
}
function TrustBadges() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-6 mb-10 pb-8 border-b border-border", children: [{
    icon: Package,
    label: "Envío gratis +$200k"
  }, {
    icon: RefreshCw,
    label: "Cambios 30 días"
  }, {
    icon: ShieldCheck,
    label: "Pago seguro"
  }].map(({
    icon: Icon,
    label
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, strokeWidth: 1.5 }),
    label
  ] }, label)) });
}
function ProductAccordion({
  product
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { type: "multiple", defaultValue: ["descripcion"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "descripcion", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Descripción" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm leading-relaxed text-cream/70 pb-5", children: product.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "detalles", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Detalles & Materiales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: product.details.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-cream/70", children: line }, i)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "envio", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Envío & Devoluciones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm leading-relaxed text-cream/70 pb-5", children: "Envío gratis en pedidos mayores a $200.000. Despacho en 1–3 días hábiles. Cambios dentro de los 30 días siguientes a la compra." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "tallas", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Guía de Tallas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[11px] uppercase tracking-[0.15em] text-cream/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Talla", "Pecho", "Largo", "Hombro"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-cream/50 font-normal", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [["XS", "96cm", "68cm", "44cm"], ["S", "100cm", "70cm", "46cm"], ["M", "104cm", "72cm", "48cm"], ["L", "108cm", "74cm", "50cm"], ["XL", "112cm", "76cm", "52cm"], ["XXL", "116cm", "78cm", "54cm"]].map(([size, ...vals]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-cream", children: size }),
          vals.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: v }, i))
        ] }, size)) })
      ] }) })
    ] })
  ] });
}
function RelatedProducts({
  currentSlug,
  category
}) {
  const {
    allProducts
  } = Route$g.useLoaderData();
  const related = getRelated(currentSlug, category, allProducts);
  if (!related.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid mb-3", children: "Drop 01" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.88] text-cream mb-10", children: "También te puede gustar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: {
      slug: p.slug
    }, className: "group block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-bone", children: [
        p.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${p.tag.startsWith("-") ? "bg-acid text-ink" : "bg-ink text-cream"}`, children: p.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.front, alt: p.name, loading: "lazy", className: "card-img card-img-front absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.back, alt: "", "aria-hidden": true, loading: "lazy", className: "card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.18em] text-cream", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs tabular-nums text-cream/70", children: fmtCOP(p.price) })
      ] })
    ] }, p.slug)) })
  ] }) });
}
function getRelated(currentSlug, category, allProducts, limit = 3) {
  const sameCategory = allProducts.filter((p) => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = allProducts.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
export {
  ProductPage as component
};
