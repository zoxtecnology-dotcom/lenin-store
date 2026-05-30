import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DHlaPfKw.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { P as ProductCard } from "./ProductCard-CfXfT008.mjs";
import { c as Route$i } from "./router-BAT9GkoO.mjs";
import { a as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
const DROP_02_DATE = /* @__PURE__ */ new Date("2026-10-01T00:00:00");
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
    drop01,
    drop01Products
  } = Route$i.useLoaderData();
  const countdown = useCountdown(DROP_02_DATE);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-cream/30 mb-6", children: "— Próximamente" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream/20", children: "Drop 02" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif-i text-xl text-cream/30 mt-2", children: "Otoño · 26" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream/30", children: "01 Oct 2026" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-px border border-border/40 mb-20 max-w-2xl", children: [{
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif-i text-[clamp(1.2rem,2.5vw,1.8rem)] leading-snug text-cream/40", children: [
        '"El segundo capítulo está en construcción.',
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        'Suscríbete y sé el primero en verlo."'
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 200, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "flex max-w-lg items-center gap-0 border-b border-cream/20 pb-2 focus-within:border-cream/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "tu@correo.com", "aria-label": "Correo electrónico", className: "w-full bg-transparent py-3 text-sm text-cream placeholder:text-cream/25 focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "shrink-0 flex items-center gap-2 px-2 text-[10px] uppercase tracking-[0.3em] text-cream/50 hover:text-acid transition-colors", children: [
            "Avisar ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, strokeWidth: 1.5 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[10px] uppercase tracking-[0.22em] text-cream/25", children: "Solo te escribimos cuando hay algo nuevo. Cero spam." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden border-y border-border bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap animate-marquee", children: Array.from({
      length: 2
    }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0", children: Array.from({
      length: 6
    }).map((_2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-none mx-8 text-cream/10", children: "Drop 01 disponible" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid/30 mx-4", children: "✦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it text-[clamp(1.5rem,4vw,3rem)] leading-none mx-8 text-cream/10", children: "Drop 02 en camino" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid/30 mx-4", children: "✦" })
    ] }, i)) }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  DropsPage as component
};
