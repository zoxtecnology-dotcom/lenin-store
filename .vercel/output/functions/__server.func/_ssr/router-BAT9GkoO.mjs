import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { R as Root, C as Close, P as Portal, a as Content, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { X, T as Trash2, o as Minus, q as Plus, c as ChevronDown, a as ArrowRight, s as Send } from "../_libs/lucide-react.mjs";
import { o as objectType, b as booleanType, e as enumType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-CYuFTo0p.css";
const FREE_SHIPPING_THRESHOLD = 2e5;
const CartContext = reactExports.createContext(null);
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(false);
  function add(item) {
    setItems((prev) => {
      const key2 = item.slug + (item.conjuntoMode ?? "");
      const existing = prev.find((i) => i.slug + (i.conjuntoMode ?? "") === key2);
      if (existing) {
        return prev.map(
          (i) => i.slug + (i.conjuntoMode ?? "") === key2 ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }
  function remove(slug) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }
  function updateQty(slug, qty) {
    if (qty < 1) return remove(slug);
    setItems((prev) => prev.map((i) => i.slug === slug ? { ...i, qty } : i));
  }
  function clear() {
    setItems([]);
  }
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: {
    items,
    add,
    remove,
    updateQty,
    clear,
    total,
    count,
    open,
    setOpen,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping
  }, children });
}
function useCart() {
  const ctx = reactExports.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = Root;
const SheetClose = Close;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { ref, className: cn(sheetVariants({ side }), className), "aria-describedby": void 0, ...props, children })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const p1 = "/assets/p1-DTRZgmgW.jpg";
const p2 = "/assets/p2-C-s5Mf9o.jpg";
const p3 = "/assets/p3-C0El3M2E.jpg";
const p4 = "/assets/p4-DktKgsAq.jpg";
const look1 = "/assets/look1-C5ahD_32.jpg";
const look2 = "/assets/look2-BkPJnbaq.jpg";
const look3 = "/assets/look3-Dkn_DqYV.jpg";
const products = [
  {
    slug: "camiseta-box-distressed",
    name: "Camiseta / Box Distressed",
    price: 12e4,
    front: p3,
    back: p4,
    images: [p3, p4, p1, p2],
    drop: "Drop 01 — Essentials",
    category: "Camisetas",
    isNew: true,
    isBestSeller: true,
    isOnSale: true,
    tag: "-30%",
    shortDescription: "Box-fit en algodón pesado 280gsm con desgaste manual. Caída recta y mangas anchas.",
    description: "Tejido grueso con tratamiento sand-wash y desgaste en bajos. Una pieza con memoria propia desde el primer uso.",
    details: "100% algodón peinado\nPeso: 280 gsm\nCorte: Box fit\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Hueso Lavado", swatch: "#e8e0d0" },
      { name: "Negro Carbón", swatch: "#1a1a1a" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 3
  },
  {
    slug: "camiseta-essentials",
    name: "Camiseta / Essentials",
    price: 95e3,
    front: p4,
    back: p3,
    images: [p4, p3, p2, p1],
    drop: "Drop 01 — Essentials",
    category: "Camisetas",
    shortDescription: "Básico oversize en algodón 220gsm. Logo bordado en pecho. El punto de partida.",
    description: "La camiseta que necesitabas sin saber que la necesitabas. Algodón pesado, corte amplio, durabilidad real.",
    details: "100% algodón ring-spun\nPeso: 220 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Grafito", swatch: "#3a3a3a" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "buso-oversize-negro",
    name: "Hoodie Oversize / Negro",
    price: 189e3,
    front: p1,
    back: p2,
    images: [p1, p2, p3, p4],
    drop: "Drop 01 — Essentials",
    category: "Busos",
    isNew: true,
    isBestSeller: true,
    shortDescription: "Box-fit en algodón pesado 380gsm con acabado brushed interior. Capucha estructurada.",
    description: "Tejido grueso con tratamiento sand-wash y desgaste en costuras. Corte oversize real, no aspiracional.",
    details: "80% algodón / 20% poliéster\nPeso: 380 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Hueso Lavado", swatch: "#e8e0d0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "buso-acid",
    name: "Hoodie / Acid Drop",
    price: 199e3,
    front: p2,
    back: p1,
    images: [p2, p1, p4, p3],
    drop: "Drop 01 — Essentials",
    category: "Busos",
    shortDescription: "Hoodie en algodón 360gsm con detalle acid-wash en mangas. Pieza de edición limitada.",
    description: "Mismo cuerpo que el hoodie negro, diferente tratamiento. El acid-wash es irrepetible — cada pieza es única.",
    details: "80% algodón / 20% poliéster\nPeso: 360 gsm\nCorte: Oversize\nLavado a máquina fría\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Acid Black", swatch: "#2a2a2a" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 2
  },
  {
    slug: "conjunto-angoscia",
    name: "Conjunto / Angoscia",
    price: 28e4,
    front: look1,
    back: look2,
    images: [look1, look2, look3, p1],
    drop: "Drop 01 — Essentials",
    category: "Conjuntos",
    isNew: true,
    shortDescription: "Buso + pantalón en french terry 320gsm. El look completo. Mejor precio al comprar el conjunto.",
    description: "Dos piezas pensadas para usarse juntas. El french terry da cuerpo sin perder comodidad. Cómpralo completo y ahorra.",
    details: "80% algodón / 20% poliéster\nPeso: 320 gsm\nCorte: Relaxed\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Grafito Oscuro", swatch: "#2e2e2e" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 4,
    type: "conjunto",
    conjunto: {
      topName: "Buso Angoscia",
      bottomName: "Pantalón Angoscia",
      topPrice: 16e4,
      bottomPrice: 14e4,
      topImages: [p1, p2],
      bottomImages: [p2, p3],
      fullImages: [look1, look2, look3]
    }
  },
  {
    slug: "pantaloneta-cargo",
    name: "Pantaloneta / Cargo",
    price: 115e3,
    front: p4,
    back: p3,
    images: [p4, p3, p2, p1],
    drop: "Drop 01 — Essentials",
    category: "Pantalonetas",
    shortDescription: "Pantaloneta cargo en ripstop 200gsm. Bolsillos funcionales, cintura elástica con cordón.",
    description: "Hecha para la calle, aguanta el uso diario. Ripstop ligero, bolsillos cargo laterales y elástico ajustable.",
    details: "100% poliéster ripstop\nPeso: 200 gsm\nCorte: Baggy cargo\nLavado a máquina 40°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Olive", swatch: "#4a4a30" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "pantalon-wide",
    name: "Pantalón / Wide Leg",
    price: 145e3,
    front: p2,
    back: p1,
    images: [p2, p1, p4, p3],
    drop: "Drop 01 — Essentials",
    category: "Pantalones",
    shortDescription: "Wide leg en gabardina 260gsm. Caída perfecta, bolsillos profundos, bajo sin dobladillo.",
    description: "El pantalón que funciona con todo. Corte ancho real, tela con cuerpo, bajo crudo sin dobladillo.",
    details: "65% poliéster / 35% viscosa\nPeso: 260 gsm\nCorte: Wide leg\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Charcoal", swatch: "#363636" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "gorra-snapback",
    name: "Gorra / Snapback AIAHN",
    price: 75e3,
    front: p4,
    back: p3,
    images: [p4, p3, p1, p2],
    drop: "Drop 01 — Essentials",
    category: "Gorras",
    isBestSeller: true,
    shortDescription: "Snapback 6 paneles en twill 100% algodón. Logo bordado en relieve. Talla única.",
    description: "Seis paneles, frente estructurado, cierre snapback ajustable. Logo AIAHN bordado en 3D.",
    details: "100% algodón twill\nEstructura: 6 paneles\nCierre: Snapback\nLavado a mano\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Hueso", swatch: "#e8e0d0" }
    ],
    sizes: ["Única"]
  }
];
function fmtCOP(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(amount);
}
function CartDrawer() {
  const { items, remove, updateQty, total, count, open, setOpen, freeShippingThreshold, amountToFreeShipping } = useCart();
  const [couponOpen, setCouponOpen] = reactExports.useState(false);
  const [coupon, setCoupon] = reactExports.useState("");
  const shippingProgress = Math.min(100, total / freeShippingThreshold * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "bg-background text-foreground flex flex-col p-0 w-full max-w-[420px] border-l border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display text-lg uppercase tracking-[0.15em] text-cream", children: [
            "Tu carrito ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-acid", children: [
              "(",
              count,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetClose, { className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, strokeWidth: 1.5 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border shrink-0", children: [
          amountToFreeShipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.25em] text-acid", children: "¡Tienes envío gratis!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.22em] text-cream/70", children: [
            "Te faltan ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream font-medium", children: fmtCOP(amountToFreeShipping) }),
            " para envío gratis"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-px bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-acid transition-all duration-500", style: { width: `${shippingProgress}%` } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4 space-y-6", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/40 uppercase tracking-widest pt-8 text-center", children: "Tu carrito está vacío" }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-20 h-24 bg-bone overflow-hidden", children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-[0.18em] text-cream leading-snug", children: item.name }),
                  item.conjuntoMode === "completo" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 bg-acid text-ink text-[8px] px-1.5 py-0.5 uppercase tracking-[0.15em] font-medium", children: "Conjunto" })
                ] }),
                (item.size || item.color) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] uppercase tracking-[0.2em] text-cream/50", children: [item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(" · ") }),
                item.pieces && item.pieces.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 space-y-0.5", children: item.pieces.map((piece, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] uppercase tracking-[0.15em] text-cream/40", children: [
                  "↳ ",
                  piece.name,
                  " — Talla ",
                  piece.size
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => remove(item.slug),
                  "aria-label": "Eliminar",
                  className: "text-cream/30 hover:text-cream transition-colors shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13, strokeWidth: 1.5 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border border-border px-3 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => updateQty(item.slug, item.qty - 1),
                    "aria-label": "Reducir cantidad",
                    className: "text-cream/50 hover:text-cream transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12, strokeWidth: 1.5 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tabular-nums text-cream w-4 text-center", children: item.qty }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => updateQty(item.slug, item.qty + 1),
                    "aria-label": "Aumentar cantidad",
                    className: "text-cream/50 hover:text-cream transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 1.5 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tabular-nums text-cream", children: fmtCOP(item.price * item.qty) })
            ] })
          ] })
        ] }, item.slug)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-t border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCouponOpen((v) => !v),
              className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/60 hover:text-cream transition-colors",
              children: [
                "¿Tienes un código?",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 13,
                    strokeWidth: 1.5,
                    className: `transition-transform duration-200 ${couponOpen ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          couponOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: coupon,
                onChange: (e) => setCoupon(e.target.value),
                placeholder: "CÓDIGO",
                className: "flex-1 bg-transparent border-b border-border text-xs uppercase tracking-widest text-cream placeholder:text-cream/30 py-1.5 focus:outline-none focus:border-cream"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[10px] uppercase tracking-widest text-acid hover:opacity-70 transition-opacity", children: "Aplicar" })
          ] })
        ] }),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-4 pb-6 border-t border-border shrink-0 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 mt-0.5", children: "Envío e impuestos calculados al pagar" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-acid tabular-nums", children: fmtCOP(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-3 bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300", children: [
            "Ir a pagar ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, strokeWidth: 1.5 })
          ] })
        ] })
      ]
    }
  ) });
}
const BRAND = {
  name: "AIAHN",
  store: "AIAHN STORE",
  legal: "AIAHN Store S.A.S.",
  tagline: "Hecho por amor. Vestido con actitud. Medellín, Colombia.",
  domain: "aiahn.co",
  city: "Medellín",
  country: "Colombia",
  cityFull: "Medellín, Colombia",
  cityLegal: "Medellín, Antioquia",
  year: "2026",
  copyright: "© 2026 AIAHN Store S.A.S — Todos los derechos reservados",
  madeIn: "Made with love in Medellín"
};
const EMAIL = {
  general: "hola@aiahn.co",
  returns: "cambios@aiahn.co",
  data: "datos@aiahn.co",
  press: "prensa@aiahn.co",
  pqrs: "pqrs@aiahn.co",
  legal: "legal@aiahn.co"
};
const SOCIAL = {
  instagram: { handle: "@aiahn.co", url: "https://instagram.com/aiahn.co" },
  tiktok: { url: "https://tiktok.com/@aiahn.co" },
  youtube: { url: "https://youtube.com/@aiahn" },
  whatsapp: { display: "+57 314 630 9301", url: "https://wa.me/573146309301" }
};
const pageTitle = (title) => `${title} — ${BRAND.store}`;
function WaIcon({ size = 24 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) });
}
const WA_NUMBER = SOCIAL.whatsapp.url.replace("https://wa.me/", "");
function WhatsappWidget() {
  const [open, setOpen] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  function send() {
    if (!message.trim()) return;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message.trim())}`,
      "_blank"
    );
    setMessage("");
    setOpen(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "w-[22rem] bg-background border border-border overflow-hidden transition-all duration-300 origin-bottom-right",
      open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-acid px-5 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaIcon, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm uppercase tracking-[0.25em] text-ink leading-none", children: BRAND.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-ink/50 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-ink/60 uppercase tracking-[0.15em]", children: "En línea" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "text-ink/50 hover:text-ink transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15, strokeWidth: 2 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-bone/5 border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.25em] text-acid mb-2", children: [
          BRAND.name,
          " · Soporte"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/65 leading-relaxed", children: "Hola 👋 ¿En qué te podemos ayudar? Escríbenos y te respondemos en minutos." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border flex items-center gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && send(),
            placeholder: "Escribe un mensaje...",
            className: "flex-1 bg-transparent text-sm text-cream placeholder:text-cream/30 outline-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: send,
            disabled: !message.trim(),
            className: "w-8 h-8 bg-acid text-ink flex items-center justify-center disabled:opacity-30 hover:opacity-80 transition-opacity shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13, strokeWidth: 1.5 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((v) => !v),
        className: "w-14 h-14 bg-acid text-ink flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 rounded-full",
        "aria-label": "Abrir chat de WhatsApp",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("transition-all duration-200", open ? "scale-90 rotate-90" : "scale-100 rotate-0"), children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22, strokeWidth: 2 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WaIcon, { size: 26 }) })
      }
    )
  ] });
}
const WishlistContext = reactExports.createContext(null);
function WishlistProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  const ready = reactExports.useRef(false);
  reactExports.useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("aiahn-wishlist") ?? "[]"));
    } catch {
    }
    ready.current = true;
  }, []);
  reactExports.useEffect(() => {
    if (!ready.current) return;
    localStorage.setItem("aiahn-wishlist", JSON.stringify(items));
  }, [items]);
  function toggle(slug) {
    setItems(
      (prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistContext.Provider, { value: { items, toggle, has: (slug) => items.includes(slug) }, children });
}
const useWishlist = () => reactExports.useContext(WishlistContext);
const url = "https://fqsprmctzfukebplodlb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxc3BybWN0emZ1a2VicGxvZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODQwNjcsImV4cCI6MjA5NTY2MDA2N30.PS9ny7ihTX0PqXM4p7H92vFeUU_TBEsmalHGMcKrOuw";
const supabase = createClient(url, key, {
  auth: {
    flowType: "implicit",
    detectSessionInUrl: true
  }
});
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session2) => {
      setSession(session2);
      setUser(session2?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  async function signInWithEmail(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/cuenta`
      }
    });
    return { error: error?.message ?? null };
  }
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { error: error?.message ?? null };
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, session, loading, signInWithEmail, signInWithGoogle, signOut }, children });
}
const useAuth = () => reactExports.useContext(AuthContext);
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-5 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Error 404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        className: "font-display uppercase leading-[0.85] text-cream",
        style: { fontSize: "clamp(5rem, 20vw, 16rem)" },
        children: "404"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-serif-i text-xl text-cream/50 mb-10", children: "Esta página no existe o fue movida." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity",
          children: "Volver al inicio"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/collections/$handle",
          params: { handle: "nuevo" },
          className: "border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors",
          children: "Ver colección"
        }
      )
    ] })
  ] });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Esta página no cargó" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Algo falló de nuestro lado. Puedes intentar de nuevo o volver al inicio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Intentar de nuevo"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Volver al inicio"
        }
      )
    ] })
  ] }) });
}
const Route$D = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AIAHN STORE — Streetwear masculino hecho en Colombia" },
      { name: "description", content: "Streetwear masculino premium hecho en Colombia. Drop 01 — AIAHN Essentials SS26." },
      { name: "author", content: "AIAHN Store" },
      { property: "og:title", content: "AIAHN STORE — Drop 01" },
      { property: "og:description", content: "Ropa hecha por amor, vestida con actitud. Drop 01 disponible ahora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@aiahn_store" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$D.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsappWidget, {})
  ] }) }) }) });
}
const CLOUD = "dtoosryre";
function imgUrl(publicId, opts = "w_800,q_auto,f_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${opts}/${publicId}`;
}
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
function sortSizes(sizes) {
  return [...sizes].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a);
    const ib = SIZE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}
const PRODUCT_SELECT = `
  id, slug, name, price, compare_at_price,
  is_new, is_best_seller, is_on_sale,
  category, short_desc, description, details, type,
  top_name, bottom_name, top_price, bottom_price, drop_id, created_at,
  product_images(cloudinary_id, role, position),
  product_colors(name, swatch, position),
  product_variants(color_name, size, piece, stock),
  drops(name, label)
`;
const CARD_IMG = "w_1024,q_auto,f_auto";
function rowToProduct(row) {
  const imgs = [...row.product_images].sort((a, b) => a.position - b.position);
  const front = imgs.find((i) => i.role === "front") ?? imgs[0];
  const back = imgs.find((i) => i.role === "back") ?? imgs[1] ?? front;
  const galleryImgs = imgs.filter((i) => ["front", "back", "gallery"].includes(i.role));
  const colors = [...row.product_colors].sort((a, b) => a.position - b.position).map((c) => ({ name: c.name, swatch: c.swatch }));
  const sizeSet = new Set(row.product_variants.map((v) => v.size));
  const sizes = sortSizes([...sizeSet]);
  const totalStock = row.product_variants.reduce((sum, v) => sum + v.stock, 0);
  const dropLabel = row.drops ? `${row.drops.name} — ${row.drops.label}` : "";
  const variants = row.product_variants.map((v) => ({
    color_name: v.color_name,
    size: v.size,
    piece: v.piece,
    stock: v.stock
  }));
  const compareAtPrice = row.compare_at_price ?? void 0;
  const product = {
    slug: row.slug,
    name: row.name,
    price: row.price,
    compareAtPrice,
    front: front ? imgUrl(front.cloudinary_id, CARD_IMG) : "",
    back: back ? imgUrl(back.cloudinary_id, CARD_IMG) : "",
    images: galleryImgs.map((i) => imgUrl(i.cloudinary_id, CARD_IMG)),
    isNew: row.is_new,
    isBestSeller: row.is_best_seller,
    isOnSale: row.is_on_sale,
    drop: dropLabel,
    category: row.category,
    shortDescription: row.short_desc ?? "",
    description: row.description ?? "",
    details: row.details ?? "",
    colors,
    sizes,
    variants,
    stock: totalStock,
    type: row.type === "conjunto" ? "conjunto" : "standard"
  };
  if (row.type === "conjunto") {
    const topImgs = imgs.filter((i) => i.role === "top").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));
    const bottomImgs = imgs.filter((i) => i.role === "bottom").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));
    const fullImgs = imgs.filter((i) => i.role === "full").map((i) => imgUrl(i.cloudinary_id, CARD_IMG));
    product.conjunto = {
      topName: row.top_name ?? "",
      bottomName: row.bottom_name ?? "",
      topPrice: row.top_price ?? 0,
      bottomPrice: row.bottom_price ?? 0,
      topImages: topImgs.length ? topImgs : product.images,
      bottomImages: bottomImgs.length ? bottomImgs : product.images,
      fullImages: fullImgs.length ? fullImgs : product.images
    };
  }
  return product;
}
async function fetchProducts() {
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("published", true).order("position");
  if (error) throw error;
  return data.map(rowToProduct);
}
async function fetchProductBySlug(slug) {
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw error;
  return data ? rowToProduct(data) : null;
}
async function fetchProductsNewest(limit) {
  let query = supabase.from("products").select(PRODUCT_SELECT).eq("published", true).order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(rowToProduct);
}
async function fetchProductsIsNew() {
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("published", true).eq("is_new", true).order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(rowToProduct);
}
async function fetchMostSoldProducts() {
  const { data: items } = await supabase.from("order_items").select("product_id, qty").not("product_id", "is", null);
  if (!items || items.length === 0) {
    return fetchProductsNewest(8);
  }
  const totals = {};
  for (const item of items) {
    if (item.product_id) {
      totals[item.product_id] = (totals[item.product_id] ?? 0) + (item.qty ?? 0);
    }
  }
  const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a).map(([id]) => id);
  if (sorted.length === 0) return fetchProductsNewest(8);
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("published", true).in("id", sorted);
  if (error) throw error;
  const products2 = data.map(rowToProduct);
  return sorted.map((id) => products2.find((p) => data.find((r) => r.slug === p.slug && r.id === id))).filter((p) => !!p);
}
function rowToCollection(row) {
  return {
    handle: row.handle,
    name: row.name,
    subtitle: row.subtitle ?? "",
    image: row.cloudinary_id ? imgUrl(row.cloudinary_id, "w_1200,q_auto,f_auto") : "",
    category: row.filter_category ?? "",
    isNewArrivals: row.is_new_arrivals,
    isBestSellers: row.is_best_sellers,
    isHotSale: row.is_hot_sale,
    isAll: !row.filter_category && !row.is_new_arrivals && !row.is_best_sellers && !row.is_hot_sale
  };
}
async function fetchCollections() {
  const { data, error } = await supabase.from("collections").select("handle, name, subtitle, cloudinary_id, filter_category, is_new_arrivals, is_best_sellers, is_hot_sale, position").eq("active", true).order("position");
  if (error) throw error;
  return data.map(rowToCollection);
}
async function fetchCollection(handle) {
  const all = await fetchCollections();
  return all.find((c) => c.handle === handle) ?? null;
}
async function fetchPacks() {
  const { data, error } = await supabase.from("packs").select(`id, slug, name, tag, discount, description, position,
      pack_items(position, product:products(${PRODUCT_SELECT}))`).eq("published", true).order("position");
  if (error) throw error;
  return (data ?? []).map((pack) => ({
    id: pack.id,
    slug: pack.slug,
    name: pack.name,
    tag: pack.tag ?? "",
    discount: pack.discount,
    description: pack.description ?? "",
    items: (pack.pack_items ?? []).sort((a, b) => a.position - b.position).map((pi) => ({ product: rowToProduct(pi.product) }))
  }));
}
async function fetchPackBySlug(slug) {
  const all = await fetchPacks();
  return all.find((p) => p.slug === slug) ?? null;
}
function rowToDrop(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    label: row.label ?? "",
    season: row.season ?? "",
    releaseDate: row.release_date,
    editorialQuote: row.editorial_quote ?? "",
    editorialBody: row.editorial_body ?? "",
    editorialImages: [...row.drop_images].sort((a, b) => a.position - b.position).map((i) => imgUrl(i.cloudinary_id, "w_1200,q_auto,f_auto"))
  };
}
const DROP_SELECT = `id, slug, name, label, season, release_date,
  editorial_quote, editorial_body, drop_images(cloudinary_id, position)`;
async function fetchDrops() {
  const { data, error } = await supabase.from("drops").select(DROP_SELECT).eq("published", true).order("position");
  if (error) throw error;
  return data.map(rowToDrop);
}
async function fetchDropBySlug(slug) {
  const { data, error } = await supabase.from("drops").select(DROP_SELECT).eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw error;
  return data ? rowToDrop(data) : null;
}
async function fetchProductsByDrop(dropId) {
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("drop_id", dropId).eq("published", true).order("position");
  if (error) throw error;
  return data.map(rowToProduct);
}
const $$splitComponentImporter$C = () => import("./wishlist-CifARFQj.mjs");
const Route$C = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{
      title: pageTitle("Guardados")
    }]
  }),
  loader: async () => ({
    products: await fetchProducts()
  }),
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import("./tiendas-C-eeCl7S.mjs");
const Route$B = createFileRoute("/tiendas")({
  head: () => ({
    meta: [{
      title: pageTitle("Tiendas")
    }, {
      name: "description",
      content: `${BRAND.name} es una marca 100% online con pop-ups periódicos en ${BRAND.city}. Encuentra los próximos eventos aquí.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./terminos-B_7R1Si9.mjs");
const Route$A = createFileRoute("/terminos")({
  head: () => ({
    meta: [{
      title: pageTitle("Términos y Condiciones")
    }, {
      name: "description",
      content: `Términos y condiciones de uso de ${BRAND.store}. Compras, drops limitados y propiedad intelectual.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./privacidad-BXjAf3sh.mjs");
const Route$z = createFileRoute("/privacidad")({
  head: () => ({
    meta: [{
      title: pageTitle("Privacidad")
    }, {
      name: "description",
      content: `Política de privacidad de ${BRAND.legal}. Cómo recopilamos, usamos y protegemos tu información.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./prensa-CABYjBvC.mjs");
const Route$y = createFileRoute("/prensa")({
  head: () => ({
    meta: [{
      title: pageTitle("Prensa")
    }, {
      name: "description",
      content: `Kit de prensa y contacto de medios para ${BRAND.store}. Fotos, logos y ficha de marca.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./packs-BFsOu0JM.mjs");
const Route$x = createFileRoute("/packs")({
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./login-C-6ZY47Y.mjs");
const Route$w = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: pageTitle("Iniciar sesión")
    }]
  }),
  beforeLoad: ({
    context
  }) => {
  },
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./historia-BsWOzBgg.mjs");
const Route$v = createFileRoute("/historia")({
  head: () => ({
    meta: [{
      title: "Historia — AIAHN STORE"
    }, {
      name: "description",
      content: "AIAHN nace de dos nombres: Alahia e Iahn. Una marca fundada por un padre, escrita sobre el pecho como una promesa. Streetwear masculino hecho en Medellín."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./guia-de-tallas-DLl4mHcj.mjs");
const Route$u = createFileRoute("/guia-de-tallas")({
  head: () => ({
    meta: [{
      title: pageTitle("Guía de Tallas")
    }, {
      name: "description",
      content: "Guía de tallas AIAHN. Cómo tomar tus medidas y elegir la talla correcta para nuestros drops."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./faq-DqUPThK1.mjs");
const Route$t = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: pageTitle("Preguntas Frecuentes")
    }, {
      name: "description",
      content: `Respuestas a las dudas más comunes sobre pedidos, envíos, tallas y la marca ${BRAND.name}.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./envios-CBLbzSD0.mjs");
const Route$s = createFileRoute("/envios")({
  head: () => ({
    meta: [{
      title: pageTitle("Envíos")
    }, {
      name: "description",
      content: `Política de envíos de ${BRAND.name}. Enviamos a toda Colombia con seguimiento en tiempo real.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./drops-BFsOu0JM.mjs");
const Route$r = createFileRoute("/drops")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./cuenta-I-WdPzWA.mjs");
const Route$q = createFileRoute("/cuenta")({
  head: () => ({
    meta: [{
      title: pageTitle("Mi cuenta")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./cookies-BelR0qwh.mjs");
const Route$p = createFileRoute("/cookies")({
  head: () => ({
    meta: [{
      title: pageTitle("Cookies")
    }, {
      name: "description",
      content: `Política de cookies de ${BRAND.store}. Qué cookies usamos y cómo gestionarlas.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./contacto-4l8xfxJr.mjs");
const Route$o = createFileRoute("/contacto")({
  head: () => ({
    meta: [{
      title: pageTitle("Contacto")
    }, {
      name: "description",
      content: "Contáctanos para pedidos, PQRS, prensa o colaboraciones. Respondemos en menos de 24 horas."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./cambios-devoluciones-9mDDzKid.mjs");
const Route$n = createFileRoute("/cambios-devoluciones")({
  head: () => ({
    meta: [{
      title: pageTitle("Cambios y Devoluciones")
    }, {
      name: "description",
      content: "Política de cambios y devoluciones de AIAHN. 15 días para cambiar tu prenda, sin complicaciones."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./aviso-Cmme_CGj.mjs");
const Route$m = createFileRoute("/aviso")({
  head: () => ({
    meta: [{
      title: pageTitle("Aviso Legal")
    }, {
      name: "description",
      content: `Aviso legal de ${BRAND.legal}. Información de la empresa y condiciones de uso del sitio.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./admin-CADzfFe_.mjs");
const Route$l = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./index-D9rAcI7g.mjs");
const Route$k = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "AIAHN STORE — Hecho por amor, vestido con actitud"
    }, {
      name: "description",
      content: "Streetwear premium de Colombia. Drop 01 — AIAHN Essentials SS26. Ropa hecha por amor, vestida con actitud."
    }, {
      property: "og:title",
      content: "AIAHN STORE — Drop 01"
    }, {
      property: "og:description",
      content: "Ropa hecha por amor, vestida con actitud. Drop 01 disponible ahora."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  loader: async () => {
    const [products2, packs, drops, collections] = await Promise.all([
      fetchProductsNewest(10),
      // carrusel: los 10 más nuevos
      fetchPacks(),
      fetchDrops(),
      fetchCollections()
    ]);
    return {
      products: products2,
      packs,
      drops,
      collections
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./index-BV_wK-Ys.mjs");
const Route$j = createFileRoute("/packs/")({
  head: () => ({
    meta: [{
      title: pageTitle("Packs")
    }, {
      name: "description",
      content: "Packs AIAHN — combina prendas y ahorra. Más look, mejor precio."
    }]
  }),
  loader: async () => ({
    packs: await fetchPacks()
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./index-C5VGO8xf.mjs");
const Route$i = createFileRoute("/drops/")({
  head: () => ({
    meta: [{
      title: "Drops — AIAHN STORE"
    }, {
      name: "description",
      content: "Todos los lanzamientos de AIAHN. Ediciones limitadas, streetwear masculino hecho en Medellín."
    }]
  }),
  loader: async () => {
    const drops = await fetchDrops();
    const drop01 = drops[0] ?? null;
    const drop01Products = drop01 ? (await fetchProductsByDrop(drop01.id)).slice(0, 3) : [];
    return {
      drops,
      drop01,
      drop01Products
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./index-DU8z_Ds2.mjs");
const Route$h = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("../_slug-ClkL7egM.mjs");
const Route$g = createFileRoute("/products/$slug")({
  head: ({
    loaderData
  }) => ({
    meta: loaderData?.product ? [{
      title: `${loaderData.product.name} — AIAHN STORE`
    }, {
      name: "description",
      content: loaderData.product.shortDescription
    }] : [{
      title: "Producto no encontrado — AIAHN STORE"
    }]
  }),
  loader: async ({
    params
  }) => {
    const [product, allProducts] = await Promise.all([fetchProductBySlug(params.slug), fetchProducts()]);
    if (!product) throw notFound();
    return {
      product,
      allProducts
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("../_id-BvSqmsUO.mjs");
const Route$f = createFileRoute("/packs/$id")({
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: loaderData?.pack ? `${loaderData.pack.name} — AIAHN STORE` : "Pack — AIAHN STORE"
    }]
  }),
  loader: async ({
    params
  }) => {
    const pack = await fetchPackBySlug(params.id);
    if (!pack) throw notFound();
    return {
      pack
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("../_id-1e-qC2lZ.mjs");
const Route$e = createFileRoute("/drops/$id")({
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: loaderData?.drop ? `${loaderData.drop.name} — ${loaderData.drop.label} — AIAHN STORE` : "Drop — AIAHN STORE"
    }, {
      name: "description",
      content: loaderData?.drop?.editorialBody ?? ""
    }]
  }),
  loader: async ({
    params
  }) => {
    const drop = await fetchDropBySlug(params.id);
    if (!drop) throw notFound();
    const dropProducts = await fetchProductsByDrop(drop.id);
    return {
      drop,
      dropProducts
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("../_handle-CclCFCjl.mjs");
const searchSchema = objectType({
  talla: stringType().optional(),
  color: stringType().optional(),
  sort: enumType(["reciente", "precio-asc", "precio-desc", "vendidos"]).default("reciente"),
  disponible: booleanType().optional()
});
const Route$d = createFileRoute("/collections/$handle")({
  validateSearch: (search) => searchSchema.parse(search),
  head: ({
    loaderData
  }) => ({
    meta: loaderData?.collection ? [{
      title: `${loaderData.collection.name} — AIAHN STORE`
    }, {
      name: "description",
      content: `Streetwear masculino premium — ${loaderData.collection.name}. ${loaderData.collection.subtitle}`
    }] : [{
      title: "Colección no encontrada"
    }]
  }),
  loader: async ({
    params
  }) => {
    const collection = await fetchCollection(params.handle);
    if (!collection) throw notFound();
    let products2;
    if (collection.isNewArrivals) {
      products2 = await fetchProductsIsNew();
    } else if (collection.isBestSellers) {
      products2 = await fetchMostSoldProducts();
    } else {
      products2 = await fetchProducts();
    }
    return {
      collection,
      products: products2
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./callback-DhaTLAg5.mjs");
const Route$c = createFileRoute("/auth/callback")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./configuracion-CIQMefA-.mjs");
const Route$b = createFileRoute("/admin/configuracion")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-D3Ahtyqs.mjs");
const Route$a = createFileRoute("/admin/productos/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-vObCIkei.mjs");
const Route$9 = createFileRoute("/admin/pedidos/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-CEy0wi9Q.mjs");
const Route$8 = createFileRoute("/admin/packs/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-DvUQBIXT.mjs");
const Route$7 = createFileRoute("/admin/drops/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./nuevo-CDIsTUkt.mjs");
const Route$6 = createFileRoute("/admin/productos/nuevo")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_id-9DE-8lSV.mjs");
const Route$5 = createFileRoute("/admin/productos/$id")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_id-DOSmRo_b.mjs");
const Route$4 = createFileRoute("/admin/pedidos/$id")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./nuevo-CbnDbbe4.mjs");
const Route$3 = createFileRoute("/admin/packs/nuevo")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_id-VJkLD-LJ.mjs");
const Route$2 = createFileRoute("/admin/packs/$id")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./nuevo-BBoAgesz.mjs");
const Route$1 = createFileRoute("/admin/drops/nuevo")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_id-Dkt8FknI.mjs");
const Route = createFileRoute("/admin/drops/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WishlistRoute = Route$C.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => Route$D
});
const TiendasRoute = Route$B.update({
  id: "/tiendas",
  path: "/tiendas",
  getParentRoute: () => Route$D
});
const TerminosRoute = Route$A.update({
  id: "/terminos",
  path: "/terminos",
  getParentRoute: () => Route$D
});
const PrivacidadRoute = Route$z.update({
  id: "/privacidad",
  path: "/privacidad",
  getParentRoute: () => Route$D
});
const PrensaRoute = Route$y.update({
  id: "/prensa",
  path: "/prensa",
  getParentRoute: () => Route$D
});
const PacksRoute = Route$x.update({
  id: "/packs",
  path: "/packs",
  getParentRoute: () => Route$D
});
const LoginRoute = Route$w.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$D
});
const HistoriaRoute = Route$v.update({
  id: "/historia",
  path: "/historia",
  getParentRoute: () => Route$D
});
const GuiaDeTallasRoute = Route$u.update({
  id: "/guia-de-tallas",
  path: "/guia-de-tallas",
  getParentRoute: () => Route$D
});
const FaqRoute = Route$t.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$D
});
const EnviosRoute = Route$s.update({
  id: "/envios",
  path: "/envios",
  getParentRoute: () => Route$D
});
const DropsRoute = Route$r.update({
  id: "/drops",
  path: "/drops",
  getParentRoute: () => Route$D
});
const CuentaRoute = Route$q.update({
  id: "/cuenta",
  path: "/cuenta",
  getParentRoute: () => Route$D
});
const CookiesRoute = Route$p.update({
  id: "/cookies",
  path: "/cookies",
  getParentRoute: () => Route$D
});
const ContactoRoute = Route$o.update({
  id: "/contacto",
  path: "/contacto",
  getParentRoute: () => Route$D
});
const CambiosDevolucionesRoute = Route$n.update({
  id: "/cambios-devoluciones",
  path: "/cambios-devoluciones",
  getParentRoute: () => Route$D
});
const AvisoRoute = Route$m.update({
  id: "/aviso",
  path: "/aviso",
  getParentRoute: () => Route$D
});
const AdminRoute = Route$l.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$D
});
const IndexRoute = Route$k.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$D
});
const PacksIndexRoute = Route$j.update({
  id: "/",
  path: "/",
  getParentRoute: () => PacksRoute
});
const DropsIndexRoute = Route$i.update({
  id: "/",
  path: "/",
  getParentRoute: () => DropsRoute
});
const AdminIndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ProductsSlugRoute = Route$g.update({
  id: "/products/$slug",
  path: "/products/$slug",
  getParentRoute: () => Route$D
});
const PacksIdRoute = Route$f.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => PacksRoute
});
const DropsIdRoute = Route$e.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => DropsRoute
});
const CollectionsHandleRoute = Route$d.update({
  id: "/collections/$handle",
  path: "/collections/$handle",
  getParentRoute: () => Route$D
});
const AuthCallbackRoute = Route$c.update({
  id: "/auth/callback",
  path: "/auth/callback",
  getParentRoute: () => Route$D
});
const AdminConfiguracionRoute = Route$b.update({
  id: "/configuracion",
  path: "/configuracion",
  getParentRoute: () => AdminRoute
});
const AdminProductosIndexRoute = Route$a.update({
  id: "/productos/",
  path: "/productos/",
  getParentRoute: () => AdminRoute
});
const AdminPedidosIndexRoute = Route$9.update({
  id: "/pedidos/",
  path: "/pedidos/",
  getParentRoute: () => AdminRoute
});
const AdminPacksIndexRoute = Route$8.update({
  id: "/packs/",
  path: "/packs/",
  getParentRoute: () => AdminRoute
});
const AdminDropsIndexRoute = Route$7.update({
  id: "/drops/",
  path: "/drops/",
  getParentRoute: () => AdminRoute
});
const AdminProductosNuevoRoute = Route$6.update({
  id: "/productos/nuevo",
  path: "/productos/nuevo",
  getParentRoute: () => AdminRoute
});
const AdminProductosIdRoute = Route$5.update({
  id: "/productos/$id",
  path: "/productos/$id",
  getParentRoute: () => AdminRoute
});
const AdminPedidosIdRoute = Route$4.update({
  id: "/pedidos/$id",
  path: "/pedidos/$id",
  getParentRoute: () => AdminRoute
});
const AdminPacksNuevoRoute = Route$3.update({
  id: "/packs/nuevo",
  path: "/packs/nuevo",
  getParentRoute: () => AdminRoute
});
const AdminPacksIdRoute = Route$2.update({
  id: "/packs/$id",
  path: "/packs/$id",
  getParentRoute: () => AdminRoute
});
const AdminDropsNuevoRoute = Route$1.update({
  id: "/drops/nuevo",
  path: "/drops/nuevo",
  getParentRoute: () => AdminRoute
});
const AdminDropsIdRoute = Route.update({
  id: "/drops/$id",
  path: "/drops/$id",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminConfiguracionRoute,
  AdminIndexRoute,
  AdminDropsIdRoute,
  AdminDropsNuevoRoute,
  AdminPacksIdRoute,
  AdminPacksNuevoRoute,
  AdminPedidosIdRoute,
  AdminProductosIdRoute,
  AdminProductosNuevoRoute,
  AdminDropsIndexRoute,
  AdminPacksIndexRoute,
  AdminPedidosIndexRoute,
  AdminProductosIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const DropsRouteChildren = {
  DropsIdRoute,
  DropsIndexRoute
};
const DropsRouteWithChildren = DropsRoute._addFileChildren(DropsRouteChildren);
const PacksRouteChildren = {
  PacksIdRoute,
  PacksIndexRoute
};
const PacksRouteWithChildren = PacksRoute._addFileChildren(PacksRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  AvisoRoute,
  CambiosDevolucionesRoute,
  ContactoRoute,
  CookiesRoute,
  CuentaRoute,
  DropsRoute: DropsRouteWithChildren,
  EnviosRoute,
  FaqRoute,
  GuiaDeTallasRoute,
  HistoriaRoute,
  LoginRoute,
  PacksRoute: PacksRouteWithChildren,
  PrensaRoute,
  PrivacidadRoute,
  TerminosRoute,
  TiendasRoute,
  WishlistRoute,
  AuthCallbackRoute,
  CollectionsHandleRoute,
  ProductsSlugRoute
};
const routeTree = Route$D._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  products as A,
  BRAND as B,
  router as C,
  supabase as D,
  EMAIL as E,
  useAuth as F,
  useCart as G,
  useWishlist as H,
  Route$C as R,
  SOCIAL as S,
  Route$k as a,
  Route$j as b,
  Route$i as c,
  Route$g as d,
  Route$f as e,
  Route$e as f,
  Route$d as g,
  Route$5 as h,
  Route$4 as i,
  Route$2 as j,
  Route as k,
  Sheet as l,
  SheetClose as m,
  SheetContent as n,
  SheetHeader as o,
  SheetTitle as p,
  cn as q,
  fmtCOP as r,
  imgUrl as s,
  look1 as t,
  look2 as u,
  look3 as v,
  p1 as w,
  p2 as x,
  p3 as y,
  p4 as z
};
