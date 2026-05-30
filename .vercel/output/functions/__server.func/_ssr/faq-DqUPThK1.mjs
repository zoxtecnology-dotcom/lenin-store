import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DHlaPfKw.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { B as BRAND, E as EMAIL, S as SOCIAL } from "./router-BAT9GkoO.mjs";
import { o as Minus, q as Plus } from "../_libs/lucide-react.mjs";
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
const FAQS = [{
  cat: "Pedidos",
  items: [{
    q: "¿Cuándo llega mi pedido?",
    a: `Los pedidos se procesan dentro de las 48 horas siguientes a la confirmación del pago. Una vez despachado, el tiempo estimado es de 2 a 4 días hábiles en ciudades principales y 4 a 7 en el resto de ${BRAND.country}.`
  }, {
    q: "¿Cómo hago seguimiento de mi pedido?",
    a: "Al momento del despacho recibirás un correo con el número de guía y el enlace de rastreo. Si no lo ves en tu bandeja principal, revisa la carpeta de spam."
  }, {
    q: "¿Puedo cancelar o modificar un pedido?",
    a: `Si el pedido aún no ha sido despachado, escríbenos inmediatamente a ${EMAIL.general}. Una vez en tránsito no es posible modificar ni cancelar.`
  }]
}, {
  cat: "Envíos",
  items: [{
    q: "¿Hacen envíos internacionales?",
    a: `Por ahora solo enviamos dentro de ${BRAND.country}. Estamos trabajando para habilitar envíos internacionales próximamente. Síguenos en Instagram para ser el primero en saberlo.`
  }, {
    q: "¿Cuánto cuesta el envío?",
    a: "El envío estándar tiene un costo de $12.000 COP. Es gratis en compras superiores a $150.000 COP."
  }]
}, {
  cat: "Tallas y prendas",
  items: [{
    q: "¿Cómo sé qué talla elegir?",
    a: "Todas nuestras prendas tienen corte oversize. Revisa nuestra guía de tallas con medidas exactas. Si tienes dudas escríbenos con tus medidas y te ayudamos."
  }, {
    q: "¿Las prendas encogen con el lavado?",
    a: "Nuestras telas son tratadas para minimizar el encogimiento. Recomendamos lavado a mano o máquina en frío, vuelta al revés, sin centrifugado fuerte."
  }]
}, {
  cat: "Cambios y devoluciones",
  items: [{
    q: "¿Puedo devolver mi compra?",
    a: `No realizamos devoluciones en dinero dado nuestro modelo de drops limitados. Sí ofrecemos cambios de talla o referencia y notas crédito dentro de los 15 días siguientes a la recepción del pedido.`
  }, {
    q: "¿Cómo inicio un cambio?",
    a: `Escríbenos a ${EMAIL.returns} con tu número de pedido y el motivo del cambio. Te enviaremos las instrucciones de retorno.`
  }]
}, {
  cat: "La marca",
  items: [{
    q: "¿Hay reposición de los drops?",
    a: `No. Cuando un drop se agota, se agota. Actívate en ${SOCIAL.instagram.handle} para no perderte el siguiente lanzamiento.`
  }, {
    q: "¿Dónde están las tiendas físicas?",
    a: `${BRAND.name} es una marca 100% online. Realizamos pop-ups periódicos en ${BRAND.city} — las fechas y ubicaciones se anuncian exclusivamente en nuestro Instagram.`
  }, {
    q: `¿Qué significa ${BRAND.name}?`,
    a: `${BRAND.name} es la combinación de dos nombres: Alahia e Iahn. Los hijos de quien fundó la marca. Cada prenda lleva esos dos nombres. No es un proyecto de moda — es un documento de amor con forma de ropa.`
  }]
}];
function FaqItem({
  q,
  a
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen((v) => !v), className: "w-full flex items-start justify-between gap-6 py-6 text-left group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream/85 group-hover:text-cream transition-colors leading-snug", children: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5 text-acid", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 16, strokeWidth: 1.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, strokeWidth: 1.5 }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/55 pb-6 max-w-2xl", children: a })
  ] });
}
function FaqPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Ayuda" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream", children: [
        "Preguntas",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Frecuentes"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-12 gap-10 md:gap-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-8 md:col-start-3", children: [
      FAQS.map((cat, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: ci * 40, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-4", children: cat.cat }),
        cat.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: item.q, a: item.a }, item.q))
      ] }) }, cat.cat)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 p-8 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-3", children: "¿No encontraste tu respuesta?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60 leading-relaxed mb-5", children: "Escríbenos directamente — respondemos en menos de 24 horas." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contacto", className: "inline-flex items-center gap-3 bg-acid text-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity", children: "Contactar" })
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  FaqPage as component
};
