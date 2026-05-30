import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./_ssr/Footer-DHlaPfKw.mjs";
import { g as Route$d, l as Sheet, n as SheetContent, o as SheetHeader, p as SheetTitle, m as SheetClose, q as cn } from "./_ssr/router-BAT9GkoO.mjs";
import { P as ProductCard } from "./_ssr/ProductCard-CfXfT008.mjs";
import { w as SlidersHorizontal, c as ChevronDown, X } from "./_libs/lucide-react.mjs";
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
import "./_ssr/Reveal-CFCeKteN.mjs";
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
const COLORS = [
  { name: "Negro", swatch: "#0a0a0a" },
  { name: "Grafito", swatch: "#363636" },
  { name: "Hueso", swatch: "#e8e0d0" },
  { name: "Olive", swatch: "#4a4a30" },
  { name: "Acid", swatch: "#d4ff00" }
];
const PRICE_MIN = 0;
const PRICE_MAX = 35e4;
const DEFAULT_FILTERS = {
  tallas: [],
  colores: [],
  precioMin: PRICE_MIN,
  precioMax: PRICE_MAX,
  disponible: false
};
function fmtCOP(n) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
}
function FilterDrawer({
  open,
  onClose,
  filters,
  onFiltersChange,
  activeCount,
  availableSizes
}) {
  const sizes = availableSizes ?? ALL_SIZES;
  const minPct = (filters.precioMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100;
  const maxPct = (filters.precioMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100;
  function toggleTalla(t) {
    const next = filters.tallas.includes(t) ? filters.tallas.filter((x) => x !== t) : [...filters.tallas, t];
    onFiltersChange({ ...filters, tallas: next });
  }
  function toggleColor(c) {
    const next = filters.colores.includes(c) ? filters.colores.filter((x) => x !== c) : [...filters.colores, c];
    onFiltersChange({ ...filters, colores: next });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "left",
      className: "bg-background border-r border-border flex flex-col p-0 w-full max-w-[340px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display text-base uppercase tracking-[0.2em] text-cream", children: [
            "Filtros ",
            activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-acid", children: [
              "(",
              activeCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onFiltersChange(DEFAULT_FILTERS),
                className: "text-[10px] uppercase tracking-[0.25em] text-cream/50 hover:text-acid transition-colors",
                children: "Limpiar"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetClose, { className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, strokeWidth: 1.5 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Precio" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-5 flex items-center mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 h-px bg-cream pointer-events-none",
                  style: { left: `${minPct}%`, right: `${100 - maxPct}%` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: PRICE_MIN,
                  max: PRICE_MAX,
                  step: 1e4,
                  value: filters.precioMin,
                  onChange: (e) => {
                    const val = Number(e.target.value);
                    if (val < filters.precioMax) onFiltersChange({ ...filters, precioMin: val });
                  },
                  className: "absolute inset-0 w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-10\n                  [&::-webkit-slider-runnable-track]:bg-transparent\n                  [&::-webkit-slider-thumb]:appearance-none\n                  [&::-webkit-slider-thumb]:w-4\n                  [&::-webkit-slider-thumb]:h-4\n                  [&::-webkit-slider-thumb]:rounded-full\n                  [&::-webkit-slider-thumb]:bg-cream\n                  [&::-webkit-slider-thumb]:border-2\n                  [&::-webkit-slider-thumb]:border-background\n                  [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_oklch(0.87_0.015_80)]\n                  [&::-moz-range-track]:bg-transparent\n                  [&::-moz-range-thumb]:w-4\n                  [&::-moz-range-thumb]:h-4\n                  [&::-moz-range-thumb]:rounded-full\n                  [&::-moz-range-thumb]:bg-cream\n                  [&::-moz-range-thumb]:border-2\n                  [&::-moz-range-thumb]:border-background"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: PRICE_MIN,
                  max: PRICE_MAX,
                  step: 1e4,
                  value: filters.precioMax,
                  onChange: (e) => {
                    const val = Number(e.target.value);
                    if (val > filters.precioMin) onFiltersChange({ ...filters, precioMax: val });
                  },
                  className: "absolute inset-0 w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-20\n                  [&::-webkit-slider-runnable-track]:bg-transparent\n                  [&::-webkit-slider-thumb]:appearance-none\n                  [&::-webkit-slider-thumb]:w-4\n                  [&::-webkit-slider-thumb]:h-4\n                  [&::-webkit-slider-thumb]:rounded-full\n                  [&::-webkit-slider-thumb]:bg-acid\n                  [&::-webkit-slider-thumb]:border-2\n                  [&::-webkit-slider-thumb]:border-background\n                  [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_oklch(0.95_0.22_115)]\n                  [&::-moz-range-track]:bg-transparent\n                  [&::-moz-range-thumb]:w-4\n                  [&::-moz-range-thumb]:h-4\n                  [&::-moz-range-thumb]:rounded-full\n                  [&::-moz-range-thumb]:bg-acid\n                  [&::-moz-range-thumb]:border-2\n                  [&::-moz-range-thumb]:border-background"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceInput,
                {
                  label: "Mínimo",
                  value: filters.precioMin,
                  min: PRICE_MIN,
                  max: filters.precioMax - 1e4,
                  onChange: (v) => onFiltersChange({ ...filters, precioMin: v })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-3 bg-border shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceInput,
                {
                  label: "Máximo",
                  value: filters.precioMax,
                  min: filters.precioMin + 1e4,
                  max: PRICE_MAX,
                  onChange: (v) => onFiltersChange({ ...filters, precioMax: v })
                }
              )
            ] })
          ] }),
          sizes.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: "Talla" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleTalla(s),
                className: cn(
                  "min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all",
                  filters.tallas.includes(s) ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"
                ),
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: "Color" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleColor(c.name),
                "aria-label": c.name,
                title: c.name,
                className: cn(
                  "w-8 h-8 border-2 transition-all",
                  filters.colores.includes(c.name) ? "border-cream scale-110" : "border-transparent hover:border-cream/50"
                ),
                style: { backgroundColor: c.swatch }
              },
              c.name
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => onFiltersChange({ ...filters, disponible: !filters.disponible }),
              className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-cream/70 hover:text-cream transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                  "w-8 h-4 border relative flex-shrink-0 transition-colors",
                  filters.disponible ? "bg-acid border-acid" : "border-border"
                ), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                  "absolute top-0.5 w-3 h-3 bg-ink transition-all",
                  filters.disponible ? "left-4" : "left-0.5"
                ) }) }),
                "Solo disponibles"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 pt-4 border-t border-border shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-full bg-cream text-ink py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors",
            children: "Ver resultados"
          }
        ) })
      ]
    }
  ) });
}
function PriceInput({ label, value, min, max, onChange }) {
  const [raw, setRaw] = reactExports.useState("");
  const [focused, setFocused] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 border border-border focus-within:border-cream transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-[0.25em] text-cream/30", children: label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        inputMode: "numeric",
        value: focused ? raw : fmtCOP(value),
        onChange: (e) => setRaw(e.target.value),
        onFocus: () => {
          setFocused(true);
          setRaw(String(value));
        },
        onBlur: () => {
          setFocused(false);
          const parsed = parseInt(raw.replace(/\D/g, ""), 10);
          if (!isNaN(parsed)) {
            onChange(Math.min(max, Math.max(min, Math.round(parsed / 1e3) * 1e3)));
          }
          setRaw("");
        },
        className: "w-full bg-transparent px-2 pb-2 text-[11px] tabular-nums text-cream focus:outline-none"
      }
    )
  ] });
}
const SORT_LABELS = {
  "reciente": "Más reciente",
  "precio-asc": "Precio ↑",
  "precio-desc": "Precio ↓",
  "vendidos": "Más vendidos"
};
function CollectionPage() {
  const {
    collection,
    products
  } = Route$d.useLoaderData();
  const search = Route$d.useSearch();
  const navigate = useNavigate({
    from: Route$d.fullPath
  });
  const [filterOpen, setFilterOpen] = reactExports.useState(false);
  const [sortOpen, setSortOpen] = reactExports.useState(false);
  const [filters, setFilters] = reactExports.useState({
    tallas: search.talla ? [search.talla] : [],
    colores: search.color ? [search.color] : [],
    precioMin: 0,
    precioMax: PRICE_MAX,
    disponible: search.disponible ?? false
  });
  const [sort, setSort] = reactExports.useState(search.sort ?? "reciente");
  const [visibleCount, setVisibleCount] = reactExports.useState(8);
  const activeFilterCount = filters.tallas.length + filters.colores.length + (filters.precioMin > 0 || filters.precioMax < PRICE_MAX ? 1 : 0) + (filters.disponible ? 1 : 0);
  const collectionProducts = reactExports.useMemo(() => {
    let list = collection.isAll ? [...products] : collection.isNewArrivals ? products.filter((p) => p.isNew) : collection.isBestSellers ? products.filter((p) => p.isBestSeller) : collection.isHotSale ? products.filter((p) => p.isOnSale) : products.filter((p) => p.category === collection.category);
    if (filters.tallas.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => filters.tallas.includes(s)));
    }
    if (filters.colores.length > 0) {
      list = list.filter((p) => p.colors.some((c) => filters.colores.includes(c.name)));
    }
    list = list.filter((p) => p.price >= filters.precioMin && p.price <= filters.precioMax);
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [collection.category, filters, sort]);
  function handleFiltersChange(f) {
    setFilters(f);
    navigate({
      search: (prev) => ({
        ...prev,
        talla: f.tallas[0],
        color: f.colores[0],
        disponible: f.disponible || void 0
      })
    });
  }
  function handleClearAll() {
    setFilters(DEFAULT_FILTERS);
  }
  function handleSortChange(s) {
    setSort(s);
    navigate({
      search: (prev) => ({
        ...prev,
        sort: s
      })
    });
    setSortOpen(false);
  }
  const visible = collectionProducts.slice(0, visibleCount);
  const availableSizes = reactExports.useMemo(() => {
    const all = products.filter((p) => collection.isAll ? true : collection.isNewArrivals ? p.isNew : collection.isBestSellers ? p.isBestSeller : collection.isHotSale ? p.isOnSale : p.category === collection.category).flatMap((p) => p.sizes);
    return [...new Set(all)];
  }, [products, collection]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[50vh] min-h-[340px] w-full overflow-hidden mt-[88px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: collection.image, alt: collection.name, className: "absolute inset-0 h-full w-full object-cover object-top", fetchPriority: "high" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full mx-auto max-w-[1500px] px-5 md:px-10 flex flex-col justify-end pb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(4rem,14vw,12rem)] uppercase leading-[0.85] text-cream", children: collection.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-serif-i text-base text-cream/70 max-w-xs", children: collection.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-8 right-8 text-[10px] uppercase tracking-[0.35em] text-cream/50", children: [
        collectionProducts.length,
        " productos"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[88px] z-40 bg-background border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilterOpen(true), className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 14, strokeWidth: 1.5 }),
        "Filtrar",
        activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 bg-acid text-ink text-[10px] font-bold flex items-center justify-center leading-none", children: activeFilterCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSortOpen((v) => !v), className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors", children: [
          SORT_LABELS[sort],
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12, strokeWidth: 1.5, className: sortOpen ? "rotate-180 transition-transform" : "transition-transform" })
        ] }),
        sortOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-2 bg-background border border-border w-44 z-50", children: Object.entries(SORT_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSortChange(value), className: `block w-full text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors border-b border-border/50 last:border-0 ${sort === value ? "text-cream bg-border/30" : "text-cream/60 hover:text-cream hover:bg-border/20"}`, children: label }, value)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1500px] px-5 py-12 md:px-10", children: [
      visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/40", children: "No hay productos con estos filtros" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClearAll, className: "mt-6 text-[10px] uppercase tracking-[0.25em] text-acid hover:opacity-70 transition-opacity", children: "Limpiar filtros" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5", children: visible.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, delay: i * 40 }, p.slug)) }),
      visibleCount < collectionProducts.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setVisibleCount((n) => n + 8), className: "border border-cream px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-ink transition-colors", children: [
        "Cargar más (",
        collectionProducts.length - visibleCount,
        " restantes)"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterDrawer, { open: filterOpen, onClose: () => setFilterOpen(false), filters, sort, onFiltersChange: handleFiltersChange, onSortChange: () => {
    }, activeCount: activeFilterCount, availableSizes })
  ] });
}
export {
  CollectionPage as component
};
