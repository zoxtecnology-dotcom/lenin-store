import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DHlaPfKw.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { E as EMAIL, S as SOCIAL } from "./router-BAT9GkoO.mjs";
import { M as Mail, n as MessageCircle, I as Instagram } from "../_libs/lucide-react.mjs";
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
const CHANNELS = [{
  icon: Mail,
  label: "Email general",
  value: EMAIL.general,
  desc: "Pedidos, cambios, dudas generales.",
  href: `mailto:${EMAIL.general}`
}, {
  icon: MessageCircle,
  label: "WhatsApp",
  value: SOCIAL.whatsapp.display,
  desc: "Lunes a viernes, 9am – 6pm.",
  href: SOCIAL.whatsapp.url
}, {
  icon: Instagram,
  label: "Instagram",
  value: SOCIAL.instagram.handle,
  desc: "DMs abiertos. Drops, novedades y más.",
  href: SOCIAL.instagram.url
}];
const PQRS = [{
  code: "P",
  label: "Petición",
  desc: "Solicita información sobre productos, procesos o la marca."
}, {
  code: "Q",
  label: "Queja",
  desc: "Reporta inconformidades con tu pedido o el servicio recibido."
}, {
  code: "R",
  label: "Reclamo",
  desc: "Exige solución a un incumplimiento o falla en tu compra."
}, {
  code: "S",
  label: "Sugerencia",
  desc: "Comparte ideas para mejorar nuestros productos o procesos."
}];
function ContactoPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— AIAHN" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream", children: "Contacto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-lg text-base leading-relaxed text-cream/55", children: "Respondemos en menos de 24 horas. Si tu duda es urgente, escríbenos por WhatsApp o Instagram." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-12", children: "— Canales de atención" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-px bg-border", children: CHANNELS.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: ch.href, target: ch.href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: "group flex flex-col gap-4 bg-background p-10 md:p-12 hover:bg-bone/5 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ch.icon, { size: 20, strokeWidth: 1.5, className: "text-acid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1", children: ch.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg uppercase text-cream group-hover:text-acid transition-colors", children: ch.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-cream/50", children: ch.desc })
        ] })
      ] }) }, ch.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-10 md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-6", children: "— PQRS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.88] text-cream", children: [
          "Peticiones,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Quejas,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Reclamos",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "y Sugerencias"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-sm leading-relaxed text-cream/55", children: [
          "Para peticiones formales envía un correo a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${EMAIL.pqrs}`, className: "text-cream underline underline-offset-4 hover:text-acid transition-colors", children: EMAIL.pqrs }),
          " ",
          "indicando el tipo de solicitud, tu número de pedido (si aplica) y una descripción detallada. Respondemos en máximo 15 días hábiles."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-7 md:col-start-6 space-y-px", children: PQRS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 py-8 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-acid/50 w-8 shrink-0", children: item.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base uppercase tracking-tight text-cream mb-2", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/55 leading-relaxed", children: item.desc })
        ] })
      ] }) }, item.code)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-8", children: "— También puede servirte" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: [{
        label: "Política de envíos",
        to: "/envios"
      }, {
        label: "Cambios y devoluciones",
        to: "/cambios-devoluciones"
      }, {
        label: "Guía de tallas",
        to: "/guia-de-tallas"
      }, {
        label: "FAQ",
        to: "/faq"
      }].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "border border-border text-cream/70 hover:border-cream/40 hover:text-cream px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors", children: l.label }, l.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ContactoPage as component
};
