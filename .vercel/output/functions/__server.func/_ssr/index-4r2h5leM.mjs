import { N as jsxRuntimeExports, Y as reactExports } from "./index.mjs";
import { f as Route$q, L as Link } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
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
function useCountdown(target) {
  const [timeLeft, setTimeLeft] = reactExports.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  reactExports.useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 864e5),
        hours: Math.floor(diff % 864e5 / 36e5),
        minutes: Math.floor(diff % 36e5 / 6e4),
        seconds: Math.floor(diff % 6e4 / 1e3)
      });
    }
    calc();
    const id = setInterval(calc, 1e3);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}
function DropsPage() {
  const {
    drops,
    drop01,
    drop01Products,
    upcoming
  } = Route$q.useLoaderData();
  const upcomingDate = upcoming?.releaseDate ? new Date(upcoming.releaseDate) : /* @__PURE__ */ new Date("2099-01-01");
  const countdown = useCountdown(upcomingDate);
  const heroImg = drop01?.editorialImages[0] ?? "";
  const editImg1 = drop01?.editorialImages[0] ?? "";
  const editImg2 = drop01?.editorialImages[1] ?? "";
  const editImg3 = drop01?.editorialImages[2] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[60vh] min-h-[400px] overflow-hidden", children: [
      heroImg && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "AIAHN Drops", fetchPriority: "high", className: "absolute inset-0 h-full w-full object-cover object-[60%_30%]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full mx-auto max-w-[1500px] px-5 md:px-10 flex flex-col justify-end pb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-4", children: "Archivo de lanzamientos" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(5rem,18vw,16rem)] uppercase leading-[0.82] text-cream", children: "Drops" }) })
      ] })
    ] }),
    drop01 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24 md:py-36 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-3", children: "— Disponible ahora" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream", children: drop01.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-xl text-cream/60 mt-2", children: [
            drop01.label,
            " · ",
            drop01.season
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40", children: "Medellín, Colombia" }),
          drop01.releaseDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-1", children: new Date(drop01.releaseDate).toLocaleDateString("es-CO", {
            month: "long",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-1", children: [
            drop01Products.length,
            " piezas"
          ] })
        ] })
      ] }) }),
      editImg1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-3 md:gap-4 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 md:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editImg1, alt: "Drop 01 editorial", className: "w-full aspect-[4/3] object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 md:col-span-5 flex flex-col gap-3", children: [
          editImg2 && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editImg2, alt: "Drop 01 detalle", className: "w-full flex-1 object-cover", style: {
            minHeight: 0
          } }),
          editImg3 && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editImg3, alt: "Drop 01 look", className: "w-full flex-1 object-cover", style: {
            minHeight: 0
          } })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-8 mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-cream/90", children: [
          '"',
          drop01.editorialQuote,
          '"'
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5 md:col-start-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/60", children: drop01.editorialBody }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 mb-12", children: drop01Products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, delay: i * 80 }, p.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drops/$id", params: {
        id: drop01.slug
      }, className: "group inline-flex items-center gap-3 border border-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-ink transition-colors duration-300", children: [
        "Ver ",
        drop01.name,
        " completo",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, strokeWidth: 1.5, className: "transition-transform duration-300 group-hover:translate-x-1" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
    upcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-cream/30 mb-6", children: "— Próximamente" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6 mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream/20", children: upcoming.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-xl text-cream/30 mt-2", children: [
              upcoming.label,
              upcoming.season ? ` · ${upcoming.season}` : ""
            ] })
          ] }),
          upcoming.releaseDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/30", children: new Date(upcoming.releaseDate).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) })
        ] }) }),
        upcoming.releaseDate && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-px border border-border/40 mb-20 max-w-2xl", children: [{
          value: countdown.days,
          label: "Días"
        }, {
          value: countdown.hours,
          label: "Horas"
        }, {
          value: countdown.minutes,
          label: "Min"
        }, {
          value: countdown.seconds,
          label: "Seg"
        }].map(({
          value,
          label
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 border-r border-border/40 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[clamp(2.5rem,6vw,5rem)] tabular-nums leading-none text-cream", children: String(value).padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-[9px] uppercase tracking-[0.35em] text-cream/30", children: label })
        ] }, label)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 160, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid mb-6", children: "— Newsletter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-cream mb-14", children: [
            "Sé el primero",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it normal-case text-cream/80", children: "en los drops." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "flex max-w-2xl items-center gap-0 border-b border-cream/30 pb-2 focus-within:border-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "tu@correo.com", "aria-label": "Correo electrónico", className: "w-full bg-transparent py-3 text-base text-cream placeholder:text-cream/40 focus:outline-none md:text-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "group shrink-0 flex items-center gap-3 px-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:text-acid transition-colors", children: [
              "Suscribirme",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, strokeWidth: 1.5, className: "transition-transform duration-500 group-hover:translate-x-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-[11px] uppercase tracking-[0.22em] text-cream/40", children: "Al suscribirte aceptas recibir comunicaciones. Cero spam, solo drops." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden border-y border-border bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap animate-marquee", children: Array.from({
      length: 2
    }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0", children: Array.from({
      length: 4
    }).map((_2, k2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
      drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-none mx-8 text-cream/10", children: [
          d.name,
          " disponible"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid/30 mx-4", children: "✦" })
      ] }, d.id)),
      upcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif-it text-[clamp(1.5rem,4vw,3rem)] leading-none mx-8 text-cream/10", children: [
          upcoming.name,
          " en camino"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid/30 mx-4", children: "✦" })
      ] })
    ] }, k2)) }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  DropsPage as component
};
