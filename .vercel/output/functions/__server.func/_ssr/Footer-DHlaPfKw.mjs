import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { G as useCart, H as useWishlist, F as useAuth, q as cn, y as p3, w as p1, u as look2, z as p4, x as p2, B as BRAND, S as SOCIAL, A as products, r as fmtCOP } from "./router-BAT9GkoO.mjs";
import { c as ChevronDown, r as Search, z as User, H as Heart, v as ShoppingBag, m as Menu, a as ArrowRight, X, I as Instagram, Y as Youtube } from "../_libs/lucide-react.mjs";
const catAcc = "/assets/cat-acc-66fvjE5z.jpg";
const megaCategories = [
  { handle: "camisetas", name: "Camisetas", image: p3 },
  { handle: "busos", name: "Busos", image: p1 },
  { handle: "conjuntos", name: "Conjuntos", image: look2 },
  { handle: "pantalonetas", name: "Pantalonetas", image: p4 },
  { handle: "pantalones", name: "Pantalones", image: p2 },
  { handle: "gorras", name: "Gorras", image: catAcc }
];
function SearchModal({ open, onClose }) {
  const [query, setQuery] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const results = query.trim().length > 0 ? products.filter((p) => {
    const q = query.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.drop.toLowerCase().includes(q);
  }).slice(0, 6) : [];
  const popular = products.slice(0, 4);
  reactExports.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);
  reactExports.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[200] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-ink/80 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-background border-b border-border w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-5 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, strokeWidth: 1.5, className: "text-cream/40 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Buscar productos...",
            className: "flex-1 bg-transparent text-base text-cream placeholder:text-cream/30 focus:outline-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            "aria-label": "Cerrar búsqueda",
            className: "text-cream/40 hover:text-cream transition-colors shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, strokeWidth: 1.5 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 pb-8", children: [
        query.trim().length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-5", children: "Productos populares" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: popular.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, onClose }, p.slug)) })
        ] }) : results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-5", children: [
            results.length,
            " resultado",
            results.length !== 1 ? "s" : "",
            ' para "',
            query,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", children: results.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, onClose }, p.slug)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/30", children: [
            'Sin resultados para "',
            query,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/20", children: "Intenta con otra palabra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-border flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-full text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-2", children: "Categorías" }),
          ["Camisetas", "Busos", "Conjuntos", "Pantalonetas", "Pantalones", "Gorras"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/collections/$handle",
              params: { handle: cat.toLowerCase() },
              onClick: onClose,
              className: "flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-cream/50 hover:text-cream hover:border-cream transition-colors",
              children: [
                cat,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 9, strokeWidth: 1.5 })
              ]
            },
            cat
          ))
        ] })
      ] })
    ] }) })
  ] });
}
function ProductCard({ product, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$slug",
      params: { slug: product.slug },
      onClick: onClose,
      className: "group block",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-bone relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.front,
            alt: product.name,
            className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.18em] text-cream leading-snug line-clamp-2", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] tabular-nums text-cream/50", children: fmtCOP(product.price) })
        ] })
      ]
    }
  );
}
const announcements = [
  "Envíos a toda Colombia",
  "Envío gratis desde $200.000",
  "Nueva colección Drop 01",
  "AIAHN Store",
  "Streetwear masculino hecho en Medellín"
];
function SiteHeader({ transparentTop }) {
  const { count, setOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();
  const { location } = useRouterState();
  const [megaOpen, setMegaOpen] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [hombreExpanded, setHombreExpanded] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const closeTimer = reactExports.useRef();
  const isActive = (path) => location.pathname.startsWith(path);
  function openMega() {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleMegaClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  }
  const navItems = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/collections/$handle", params: { handle: "nuevo" }, active: isActive("/collections/nuevo"), children: "Nuevo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", onMouseEnter: openMega, onMouseLeave: scheduleMegaClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/collections/$handle",
        params: { handle: "hombre" },
        className: cn(
          "relative flex items-center gap-1 transition-colors group",
          isActive("/collections/hombre") || megaOpen ? "text-cream" : "text-cream/70 hover:text-cream"
        ),
        children: [
          "HOMBRE",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 11,
              strokeWidth: 1.5,
              className: cn("transition-transform duration-200", megaOpen && "rotate-180")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
            "absolute -bottom-px left-0 h-px bg-cream transition-transform duration-300 origin-left",
            isActive("/collections/hombre") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          ), style: { width: "calc(100% - 16px)" } })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/collections/$handle", params: { handle: "camisetas" }, active: isActive("/collections/camisetas"), children: "Camisetas" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/collections/$handle", params: { handle: "gorras" }, active: isActive("/collections/gorras"), children: "Gorras" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/collections/$handle", params: { handle: "mas-vendidos" }, active: isActive("/collections/mas-vendidos"), children: "Más Vendidos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/collections/$handle", params: { handle: "hot-sale" }, active: isActive("/collections/hot-sale"), highlight: true, children: "Hot Sale" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/drops", active: isActive("/drops"), children: "Drops" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/historia", active: isActive("/historia"), children: "Historia" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed top-0 left-0 right-0 z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-acid text-ink overflow-hidden py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap animate-marquee", children: [0, 1].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0", children: announcements.map((text, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-[0.28em] mx-6", children: text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ink/40 mx-1", children: "✦" })
      ] }, i)) }, k)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn(
        "border-b border-border transition-colors duration-300",
        transparentTop && !megaOpen ? "bg-background/80 backdrop-blur-sm" : "bg-background"
      ), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto hidden md:grid max-w-[1500px] grid-cols-[auto_1fr_auto] items-start gap-x-8 px-10 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "shrink-0 pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block bg-acid px-2 py-0.5 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink", children: [
            "AI",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
            "HN"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.28em] pt-1", children: navItems }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 text-cream pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearchOpen(true), "aria-label": "Buscar", className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: user ? "/cuenta" : "/login",
                "aria-label": "Mi cuenta",
                className: "relative hover:text-acid transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, strokeWidth: 1.5 }),
                  user && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-acid rounded-full" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/wishlist", "aria-label": "Guardados", className: "relative hover:text-acid transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18, strokeWidth: 1.5 }),
              wishlistItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 bg-acid text-ink text-[9px] font-bold flex items-center justify-center leading-none", children: wishlistItems.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpen(true),
                "aria-label": `Carrito, ${count} artículos`,
                className: "relative hover:text-acid transition-colors flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] tracking-widest", children: [
                    "(",
                    count,
                    ")"
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex items-center justify-between px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block bg-acid px-2 py-0.5 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink", children: [
            "AI",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
            "HN"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/wishlist", "aria-label": "Guardados", className: "relative hover:text-acid transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18, strokeWidth: 1.5 }),
              wishlistItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 bg-acid text-ink text-[9px] font-bold flex items-center justify-center leading-none", children: wishlistItems.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpen(true),
                "aria-label": `Carrito, ${count} artículos`,
                className: "hover:text-acid transition-colors flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] tracking-widest", children: [
                    "(",
                    count,
                    ")"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(true), "aria-label": "Abrir menú", className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20, strokeWidth: 1.5 }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-full bg-background border-b border-border overflow-hidden transition-all duration-200 ease-out",
            megaOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          ),
          onMouseEnter: openMega,
          onMouseLeave: scheduleMegaClose,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 py-6 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/collections/$handle",
                params: { handle: "hombre" },
                onClick: () => setMegaOpen(false),
                className: "group flex items-center justify-between py-2 border-b border-border/40 text-[11px] uppercase tracking-[0.28em] text-acid hover:text-acid transition-colors",
                children: [
                  "Ver todo",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11, strokeWidth: 1.5, className: "opacity-0 group-hover:opacity-100 transition-opacity" })
                ]
              }
            ),
            megaCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/collections/$handle",
                params: { handle: cat.handle },
                onClick: () => setMegaOpen(false),
                className: "group flex items-center justify-between py-2 border-b border-border/40 last:border-0 text-[11px] uppercase tracking-[0.28em] text-cream/60 hover:text-cream transition-colors",
                children: [
                  cat.name,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11, strokeWidth: 1.5, className: "opacity-0 group-hover:opacity-100 transition-opacity" })
                ]
              },
              cat.handle
            ))
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchModal, { open: searchOpen, onClose: () => setSearchOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "fixed inset-0 z-[100] bg-background flex flex-col transition-transform duration-400 ease-out md:hidden",
      mobileOpen ? "translate-x-0" : "translate-x-full"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-5 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block bg-acid px-2 py-0.5 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink", children: [
          "AI",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
          "HN"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(false), className: "text-cream hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22, strokeWidth: 1.5 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto px-5 py-8 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/collections/$handle", params: { handle: "nuevo" }, onClick: () => setMobileOpen(false), children: "Nuevo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setHombreExpanded((v) => !v),
              className: "flex w-full items-center justify-between py-4 border-b border-border text-[13px] uppercase tracking-[0.3em] text-cream",
              children: [
                "Hombre",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 14,
                    strokeWidth: 1.5,
                    className: cn("transition-transform duration-200", hombreExpanded && "rotate-180")
                  }
                )
              ]
            }
          ),
          hombreExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-4 py-2 space-y-1", children: megaCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/collections/$handle",
              params: { handle: cat.handle },
              onClick: () => setMobileOpen(false),
              className: "block py-3 border-b border-border/50 text-[12px] uppercase tracking-[0.28em] text-cream/70 hover:text-cream transition-colors",
              children: cat.name
            },
            cat.handle
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/collections/$handle", params: { handle: "camisetas" }, onClick: () => setMobileOpen(false), children: "Camisetas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/collections/$handle", params: { handle: "gorras" }, onClick: () => setMobileOpen(false), children: "Gorras" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/collections/$handle", params: { handle: "mas-vendidos" }, onClick: () => setMobileOpen(false), children: "Más Vendidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/collections/$handle", params: { handle: "hot-sale" }, onClick: () => setMobileOpen(false), highlight: true, children: "Hot Sale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/drops", onClick: () => setMobileOpen(false), children: "Drops" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavLink, { to: "/historia", onClick: () => setMobileOpen(false), children: "Historia" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-8 border-t border-border pt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setMobileOpen(false);
            setSearchOpen(true);
          }, className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: user ? "/cuenta" : "/login",
              onClick: () => setMobileOpen(false),
              className: "relative hover:text-acid transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, strokeWidth: 1.5 }),
                user && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-acid rounded-full" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/30", children: "Streetwear masculino · Medellín, Colombia" })
      ] })
    ] })
  ] });
}
function NavLink({ to, params, active, highlight, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      params,
      className: cn(
        "relative group transition-colors shrink-0",
        highlight ? "text-acid hover:text-acid/80" : active ? "text-cream" : "text-cream/70 hover:text-cream"
      ),
      children: [
        children,
        !highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
          "absolute -bottom-px left-0 h-px w-full bg-cream transition-transform duration-300 origin-left",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        ) })
      ]
    }
  );
}
function MobileNavLink({ to, params, onClick, highlight, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      params,
      onClick,
      className: cn(
        "block py-4 border-b border-border text-[13px] uppercase tracking-[0.3em] transition-colors",
        highlight ? "text-acid hover:text-acid/70" : "text-cream hover:text-acid"
      ),
      children
    }
  );
}
const NAV_COLS = [
  {
    h: "Marca",
    links: [
      { label: "Sobre nosotros", to: "/historia" },
      { label: "Packs", to: "/packs" },
      { label: "Tiendas", to: "/tiendas" },
      { label: "Contacto", to: "/contacto" },
      { label: "Prensa", to: "/prensa" }
    ]
  },
  {
    h: "Ayuda",
    links: [
      { label: "Envíos", to: "/envios" },
      { label: "Cambios y devoluciones", to: "/cambios-devoluciones" },
      { label: "Guía de tallas", to: "/guia-de-tallas" },
      { label: "FAQ", to: "/faq" }
    ]
  },
  {
    h: "Legal",
    links: [
      { label: "Privacidad", to: "/privacidad" },
      { label: "Términos", to: "/terminos" },
      { label: "Cookies", to: "/cookies" },
      { label: "Aviso legal", to: "/aviso" }
    ]
  }
];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative border-t border-border bg-background pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/50", children: BRAND.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[18rem] font-serif-i text-base leading-snug text-cream/80", children: BRAND.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-4 text-cream/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SOCIAL.instagram.url, target: "_blank", rel: "noreferrer", "aria-label": "Instagram", className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 18, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SOCIAL.tiktok.url, target: "_blank", rel: "noreferrer", "aria-label": "TikTok", className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3v2.5a4.5 4.5 0 0 0 4.5 4.5V13a7.5 7.5 0 0 1-4.5-1.5V16a5.5 5.5 0 1 1-5.5-5.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SOCIAL.youtube.url, target: "_blank", rel: "noreferrer", "aria-label": "YouTube", className: "hover:text-acid transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { size: 18, strokeWidth: 1.5 }) })
        ] })
      ] }),
      NAV_COLS.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/50", children: col.h }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3", children: col.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "link-underline text-sm text-cream/85 hover:text-cream", children: l.label }) }, l.label)) })
      ] }, col.h))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.25em] text-cream/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: BRAND.copyright }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: BRAND.madeIn })
    ] })
  ] }) });
}
export {
  Footer as F,
  SiteHeader as S
};
