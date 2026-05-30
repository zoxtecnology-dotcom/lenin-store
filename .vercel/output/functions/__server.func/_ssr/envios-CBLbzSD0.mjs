import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DHlaPfKw.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { B as BRAND, E as EMAIL, S as SOCIAL } from "./router-BAT9GkoO.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
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
const SECTIONS = [{
  num: "01",
  title: "Cobertura",
  body: `Enviamos a toda ${BRAND.country}. Trabajamos con las principales empresas de mensajería para que tu pedido llegue en perfectas condiciones, sin importar el municipio.`
}, {
  num: "02",
  title: "Tiempos de entrega",
  body: `Ciudades principales (${BRAND.city}, Bogotá, Cali, Barranquilla, Cartagena): 2 a 4 días hábiles. Resto del país: 4 a 7 días hábiles. Los pedidos se procesan dentro de las 48 horas siguientes a la confirmación del pago.`
}, {
  num: "03",
  title: "Costos de envío",
  body: "Envío estándar a cualquier ciudad: $12.000 COP. Envío gratis en compras superiores a $150.000 COP. El costo se calcula automáticamente al finalizar la compra."
}, {
  num: "04",
  title: "Seguimiento",
  body: `Una vez despachado tu pedido recibirás un correo con el número de guía y el enlace directo para rastrear en tiempo real. También puedes escribirnos a ${EMAIL.general} con tu número de pedido.`
}, {
  num: "05",
  title: "Envíos internacionales",
  body: "Por ahora solo enviamos dentro de Colombia. Estamos trabajando para habilitar envíos internacionales próximamente — síguenos en Instagram para ser los primeros en saberlo."
}, {
  num: "06",
  title: "Pedido dañado o incorrecto",
  body: `Si tu pedido llega en mal estado o recibiste un artículo diferente al que compraste, escríbenos a ${EMAIL.general} dentro de las 48 horas siguientes a la recepción con fotos del paquete y la prenda. Lo solucionamos.`
}];
function EnviosPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Ayuda" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream", children: "Envíos" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-lg text-base leading-relaxed text-cream/55", children: "Enviamos a toda Colombia. Rápido, con seguimiento y sin letra pequeña." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-px", children: SECTIONS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-6 py-10 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-1 font-display text-sm text-acid/60", children: item.num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "md:col-span-3 font-display text-lg uppercase tracking-tight text-cream", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/60", children: item.body })
      ] }) }, item.num)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 bg-bone/5 border border-border p-8 md:p-10 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-3", children: "¿Tienes alguna duda?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cream/60 leading-relaxed", children: [
          "Escríbenos a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${EMAIL.general}`, className: "text-cream underline underline-offset-4 hover:text-acid transition-colors", children: EMAIL.general }),
          " ",
          "o por DM en",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SOCIAL.instagram.url, target: "_blank", rel: "noreferrer", className: "text-cream underline underline-offset-4 hover:text-acid transition-colors", children: SOCIAL.instagram.handle }),
          ". Respondemos en menos de 24 horas."
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  EnviosPage as component
};
