import { N as jsxRuntimeExports } from "./index.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { B as BRAND, E as EMAIL } from "./router-BWVHQLZp.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./menu-BkUjdS50.mjs";
import "./user-zcyQNMe0.mjs";
import "./arrow-right-BKj3kHQ9.mjs";
import "./shopping-bag-Ce0JJ2U8.mjs";
import "./index-0g9BxVXQ.mjs";
import "./types-D0vF8QzC.mjs";
const SECTIONS = [{
  num: "01",
  title: "¿Qué son las cookies?",
  body: "Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo al visitarlos. Permiten que el sitio recuerde tus preferencias y mejoran tu experiencia de navegación."
}, {
  num: "02",
  title: "Cookies que usamos",
  body: "Cookies técnicas necesarias: permiten la navegación y el uso del carrito de compras (no pueden desactivarse). Cookies analíticas: recopilan información anónima sobre cómo se usa el sitio, para mejorar la experiencia. Cookies de preferencias: guardan tu idioma y configuración de sesión."
}, {
  num: "03",
  title: "Cookies de terceros",
  body: "Podemos usar servicios de análisis como Google Analytics o herramientas de pasarelas de pago que instalan sus propias cookies. Estos terceros tienen sus propias políticas de privacidad que están fuera de nuestro control."
}, {
  num: "04",
  title: "Cómo gestionar las cookies",
  body: "Puedes configurar tu navegador para rechazar todas o algunas cookies, o para que te avise cuando un sitio intente instalarlas. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento del sitio, incluyendo la posibilidad de realizar compras."
}, {
  num: "05",
  title: "Más información",
  body: `Para cualquier duda sobre el uso de cookies escríbenos a ${EMAIL.data}. Esta política fue actualizada en enero de ${BRAND.year} y puede ser modificada en cualquier momento publicando la versión actualizada en este sitio.`
}];
function CookiesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Legal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream", children: "Cookies" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30", children: [
        "Actualizado: Enero ",
        BRAND.year
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-px", children: SECTIONS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-6 py-10 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-1 font-display text-sm text-acid/60", children: item.num }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "md:col-span-3 font-display text-lg uppercase tracking-tight text-cream", children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/60", children: item.body })
    ] }) }, item.num)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CookiesPage as component
};
