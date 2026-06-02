import { N as jsxRuntimeExports } from "./index.mjs";
import { B as BRAND, E as EMAIL, L as Link } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
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
import "./arrow-right-BKj3kHQ9.mjs";
import "./shopping-bag-Ce0JJ2U8.mjs";
const COMPANY = [{
  label: "Razón social",
  value: BRAND.legal
}, {
  label: "País",
  value: BRAND.country
}, {
  label: "Ciudad",
  value: BRAND.cityLegal
}, {
  label: "Actividad",
  value: "Comercio de prendas de vestir"
}, {
  label: "Sitio web",
  value: BRAND.domain
}, {
  label: "Correo",
  value: EMAIL.legal
}];
const SECTIONS = [{
  num: "01",
  title: "Objeto",
  body: `El presente aviso legal regula el acceso y el uso del sitio web ${BRAND.domain}, titularidad de ${BRAND.legal}. El acceso al sitio implica la aceptación plena y sin reservas de las condiciones aquí establecidas.`
}, {
  num: "02",
  title: "Propiedad intelectual",
  body: `Todos los contenidos del sitio web — incluyendo textos, fotografías, ilustraciones, logos, marcas, diseños, código fuente y cualquier otro elemento — son propiedad de ${BRAND.legal} o de sus licenciantes, y están protegidos por la legislación colombiana e internacional de propiedad intelectual.`
}, {
  num: "03",
  title: "Uso permitido",
  body: `El usuario puede consultar los contenidos del sitio para uso personal y no comercial. Queda prohibida cualquier reproducción, distribución, comunicación pública, transformación o explotación con fines comerciales sin autorización expresa y por escrito de ${BRAND.legal}.`
}, {
  num: "04",
  title: "Exención de responsabilidad",
  body: `${BRAND.legal} no garantiza la disponibilidad ininterrumpida del sitio ni la ausencia de errores en sus contenidos. No será responsable de los daños o perjuicios derivados del uso o la imposibilidad de uso del sitio por causas ajenas a su control.`
}, {
  num: "05",
  title: "Ley aplicable",
  body: `Este aviso legal se rige por las leyes de la República de ${BRAND.country}. Para la resolución de cualquier conflicto derivado del acceso o uso del sitio, las partes se someten expresamente a la jurisdicción de los juzgados y tribunales de ${BRAND.city}, ${BRAND.country}.`
}];
function AvisoPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Legal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream", children: "Aviso Legal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30", children: [
        "Versión 1.0 — Enero ",
        BRAND.year
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-8", children: "— Datos de la empresa" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 60, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-px bg-border max-w-3xl", children: COMPANY.map(({
        label,
        value
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/35 mb-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: value })
      ] }, label)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-px", children: SECTIONS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-6 py-10 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-1 font-display text-sm text-acid/60", children: item.num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "md:col-span-3 font-display text-lg uppercase tracking-tight text-cream", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/60", children: item.body })
      ] }) }, item.num)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex flex-wrap gap-3", children: [{
        label: "Privacidad",
        to: "/privacidad"
      }, {
        label: "Términos y condiciones",
        to: "/terminos"
      }, {
        label: "Cookies",
        to: "/cookies"
      }].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "border border-border text-cream/60 hover:border-cream/40 hover:text-cream px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors", children: l.label }, l.label)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AvisoPage as component
};
