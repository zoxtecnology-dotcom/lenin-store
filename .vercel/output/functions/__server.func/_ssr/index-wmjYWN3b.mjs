import { N as jsxRuntimeExports, Y as reactExports } from "./index.mjs";
import { d as Route$s, A as imgUrl, L as Link, y as createLucideIcon, z as fmtCOP } from "./router-BWVHQLZp.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { P as ProductCard } from "./ProductCard-ljUhpBBa.mjs";
import { A as ArrowRight } from "./arrow-right-BKj3kHQ9.mjs";
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
import "./shopping-bag-Ce0JJ2U8.mjs";
import "./check-D3HPHoXN.mjs";
const __iconNode$2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$2);
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function Index() {
  const {
    products,
    packs,
    drops,
    collections
  } = Route$s.useLoaderData();
  const drop01 = drops[0];
  const heroImg = drop01?.editorialImages[0] ?? imgUrl("aiahn/seed/hero");
  const col = (handle) => collections.find((c) => c.handle === handle);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground selection:bg-acid selection:text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, { transparentTop: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative grain min-h-[92vh] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Modelo con hoodie oversize negro en escena urbana oscura", fetchPriority: "high", width: 1536, height: 1920, className: "absolute inset-0 z-0 h-full w-full object-cover object-[60%_30%]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-background/55 via-background/20 to-background/90" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex min-h-[92vh] max-w-[1500px] flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-36 md:pb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rise mb-6 text-[11px] uppercase tracking-[0.32em] text-cream/70", style: {
            animationDelay: "0.1s"
          }, children: drop01 ? `${drop01.season} — ${drop01.name}` : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-cream leading-[0.82] uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rise block text-[clamp(3.6rem,12vw,11rem)]", style: {
              animationDelay: "0.25s"
            }, children: "Hecho" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rise block text-[clamp(3.6rem,12vw,11rem)] pl-[8vw]", style: {
              animationDelay: "0.4s"
            }, children: [
              "por ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it lowercase text-acid", children: "amor" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rise block text-[clamp(3.6rem,12vw,11rem)]", style: {
              animationDelay: "0.55s"
            }, children: "Vestido" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rise block text-[clamp(3.6rem,12vw,11rem)] pl-[14vw]", style: {
              animationDelay: "0.7s"
            }, children: [
              "con ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it lowercase", children: "actitud" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", style: {
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 0.95s forwards"
        }, children: [
          drop01 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs text-[11px] uppercase tracking-[0.28em] text-cream/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: drop01.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
              drop01.label,
              " — ",
              drop01.season
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drops", className: "group flex items-center gap-3 text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "link-underline font-display text-xl uppercase tracking-wider md:text-2xl", children: "Explorar colección" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 22, strokeWidth: 1.5, className: "transition-transform duration-500 group-hover:translate-x-2" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-y border-border bg-background py-28 md:py-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 noise-bg opacity-[0.04]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[1400px] px-5 md:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: "— Manifiesto" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-8 font-serif-i text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] text-cream", children: [
          "Dos nombres.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Una sangre.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display not-italic tracking-tight", children: "Una marca." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-10 md:grid-cols-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "md:col-start-7 md:col-span-6 text-sm leading-relaxed text-cream/70 md:text-base", children: [
          "AIAHN nace de dos nombres: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: "Alahia" }),
          " y ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: "Iahn" }),
          ". Una marca fundada por un padre, escrita sobre el pecho como una promesa. Cada prenda es un capítulo — cosido en Medellín, vestido en la calle, hecho para durar más que la temporada."
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedDrop, { products }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-[1600px] grid-cols-1 gap-3 px-5 md:grid-cols-2 md:gap-4 md:px-6", children: [{
      label: "Hombre",
      handle: "hombre",
      img: col("hombre")?.image ?? imgUrl("aiahn/seed/cat-hombre"),
      cta: "Ver colección"
    }, {
      label: "Gorras",
      handle: "gorras",
      img: col("gorras")?.image ?? imgUrl("aiahn/seed/cat-acc"),
      cta: "Ver colección"
    }].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collections/$handle", params: {
      handle: c.handle
    }, className: "group relative block aspect-[3/4] md:aspect-[4/5] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.label, loading: "lazy", width: 1024, height: 1280, className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-8 md:p-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-none text-cream", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/80 transition-transform duration-500 group-hover:translate-x-2", children: [
          c.cta,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, strokeWidth: 1.5 })
        ] })
      ] })
    ] }) }, c.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PacksStrip, { packs }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-background py-24 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: "— Editorial" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85]", children: [
            "Lookbook",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it normal-case text-cream/70", children: "drop 01" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "hidden max-w-[16rem] text-xs uppercase tracking-[0.25em] text-cream/60 md:block", children: [
          "Fotografía — Lucía Restrepo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Dirección — A. Henao",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Medellín · 2026"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-3 md:gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "col-span-12 md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop01?.editorialImages[0] ?? "", alt: drop01?.editorialCaptions[0] ?? "", loading: "lazy", width: 1024, height: 1280, className: "aspect-[4/5] w-full object-cover" }),
          drop01?.editorialCaptions[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50", children: drop01.editorialCaptions[0] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "col-span-12 md:col-span-7 md:pt-24", delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop01?.editorialImages[1] ?? "", alt: drop01?.editorialCaptions[1] ?? "", loading: "lazy", width: 1536, height: 1024, className: "aspect-[3/2] w-full object-cover" }),
          drop01?.editorialCaptions[1] && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50", children: drop01.editorialCaptions[1] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "col-span-8 md:col-span-4 md:col-start-3", delay: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop01?.editorialImages[2] ?? "", alt: drop01?.editorialCaptions[2] ?? "", loading: "lazy", width: 1024, height: 1280, className: "aspect-[4/5] w-full object-cover" }),
          drop01?.editorialCaptions[2] && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50", children: drop01.editorialCaptions[2] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "col-span-12 md:col-span-6 md:col-start-7 md:self-end", delay: 150, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif-i text-2xl leading-snug text-cream/90 md:text-3xl", children: '"La prenda no es disfraz. Es archivo. Es memoria. Cada hilo recuerda quién fuimos antes de salir a la calle."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "— Diario de taller, 2026" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden border-y border-border bg-acid py-12 text-ink md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap animate-marquee", children: Array.from({
      length: 2
    }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0", children: Array.from({
      length: 4
    }).map((_2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-none mx-8", children: "No es ropa." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it text-[clamp(3rem,9vw,8rem)] leading-none mx-8", children: "Es un legado." })
    ] }, i)) }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-background py-28 md:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1100px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: "— Newsletter" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9]", children: [
        "Sé el primero",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it normal-case text-cream/80", children: "en los drops." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "mt-14 flex max-w-2xl items-center gap-0 border-b border-cream/30 pb-2 focus-within:border-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "tu@correo.com", "aria-label": "Correo electrónico", className: "w-full bg-transparent py-3 text-base text-cream placeholder:text-cream/40 focus:outline-none md:text-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", "aria-label": "Suscribirme", className: "group flex shrink-0 items-center gap-3 px-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:text-acid", children: [
          "Suscribirme",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, strokeWidth: 1.5, className: "transition-transform duration-500 group-hover:translate-x-2" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-[11px] uppercase tracking-[0.22em] text-cream/40", children: "Al suscribirte aceptas recibir comunicaciones de AIAHN. Cero spam, sólo drops." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function FeaturedDrop({
  products
}) {
  const ref = reactExports.useRef(null);
  const CARD_W = 320;
  function scroll(dir) {
    ref.current?.scrollBy({
      left: dir === "right" ? CARD_W : -CARD_W,
      behavior: "smooth"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "drop", className: "relative bg-background py-20 md:py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: "— Disponible ahora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85]", children: [
          "Lo nuevo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it normal-case text-cream/70", children: "esta semana" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$handle", params: {
        handle: "nuevo"
      }, className: "link-underline text-[11px] uppercase tracking-[0.28em] text-cream/80 hover:text-cream", children: "Ver todo →" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scroll("left"), className: "absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none", children: products.slice(0, 6).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-[260px] lg:w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, delay: i * 60, noTouchSwipe: true }) }, p.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scroll("right"), className: "absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, strokeWidth: 1.5 }) })
    ] }) })
  ] });
}
function PacksStrip({
  packs
}) {
  const ref = reactExports.useRef(null);
  function scroll(dir) {
    ref.current?.scrollBy({
      left: dir === "right" ? 320 : -320,
      behavior: "smooth"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-t border-border bg-background py-20 md:py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-4", children: "— Packs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[0.88] text-cream", children: [
          "Más look,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "mejor precio."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packs", className: "group inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity", children: [
        "Ver packs",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, strokeWidth: 1.5, className: "transition-transform group-hover:translate-x-1" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scroll("left"), className: "absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none", children: packs.map((pack, i) => {
        const original = pack.items.reduce((sum, {
          product
        }) => sum + product.price, 0);
        const final = Math.round(original * (1 - pack.discount / 100));
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-[280px] lg:w-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packs/$id", params: {
          id: pack.slug
        }, className: "group flex flex-col border border-border hover:border-cream/30 transition-colors", style: {
          height: "340px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 flex gap-px bg-border overflow-hidden shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2.5 right-2.5 z-10 bg-acid text-ink text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 font-medium", children: [
              "-",
              pack.discount,
              "%"
            ] }),
            pack.items.map(({
              product
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.front, alt: product.name, className: "h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700" }) }, product.slug))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
            pack.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.25em] text-acid mb-1", children: pack.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base uppercase text-cream mb-3", children: pack.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: fmtCOP(final) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-acid", children: [
                "-",
                fmtCOP(original - final)
              ] })
            ] })
          ] })
        ] }) }) }, pack.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => scroll("right"), className: "absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, strokeWidth: 1.5 }) })
    ] }) })
  ] });
}
export {
  Index as component
};
