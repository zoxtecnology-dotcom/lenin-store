import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DHlaPfKw.mjs";
import { R as Reveal } from "./Reveal-CFCeKteN.mjs";
import { E as EMAIL, q as cn } from "./router-BAT9GkoO.mjs";
import { p as Paperclip, s as Send } from "../_libs/lucide-react.mjs";
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
const SECTIONS = [{
  num: "01",
  title: "Nuestra política",
  body: "Dado que AIAHN opera bajo un modelo de drops limitados, no realizamos devoluciones en dinero. Sí ofrecemos cambios de talla o referencia y notas crédito dentro de los plazos establecidos."
}, {
  num: "02",
  title: "Condiciones",
  body: "La prenda debe estar sin uso, con todas sus etiquetas originales intactas y en su empaque original. No se aceptan cambios de prendas con señales de uso, lavado, alteración o daño causado por el cliente."
}, {
  num: "03",
  title: "Plazo",
  body: "Tienes 15 días calendario desde la fecha de recepción del pedido para solicitar un cambio o nota crédito. Pasado ese plazo no podemos procesar la solicitud."
}, {
  num: "04",
  title: "Proceso",
  body: `1. Escríbenos a ${EMAIL.returns} con tu número de pedido, el artículo a cambiar y el motivo. 2. Te enviamos las instrucciones de retorno. 3. Una vez recibida y revisada la prenda, procesamos el cambio o nota crédito en máximo 5 días hábiles.`
}, {
  num: "05",
  title: "Artículos en sale",
  body: "Los artículos de venta especial, outlet o liquidación no aplican para cambios ni notas crédito. Esto se indica claramente en la descripción de cada producto."
}, {
  num: "06",
  title: "Producto defectuoso",
  body: `Si la prenda tiene un defecto de fabricación, el proceso es diferente y completamente a nuestro cargo. Escríbenos a ${EMAIL.general} con fotos claras del defecto dentro de los 30 días siguientes a la recepción.`
}];
function CambiosPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Ayuda" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[clamp(2.8rem,9vw,8rem)] uppercase leading-[0.88] text-cream", children: [
        "Cambios y",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Devoluciones"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-lg text-base leading-relaxed text-cream/55", children: "Queremos que cada prenda te quede perfecta. Si algo no va bien, lo arreglamos." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-px", children: SECTIONS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-6 py-10 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-1 font-display text-sm text-acid/60", children: item.num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "md:col-span-3 font-display text-lg uppercase tracking-tight text-cream", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/60", children: item.body })
      ] }) }, item.num)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${EMAIL.returns}`, className: "inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity", children: "Iniciar cambio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guia-de-tallas", className: "inline-flex items-center gap-3 border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors", children: "Ver guía de tallas" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-10 md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Formulario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.88] text-cream mb-6", children: [
          "Iniciar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "reclamación"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/55", children: "Diligencia el formulario y te contactamos en máximo 2 días hábiles. Ten a la mano el número de pedido — está en el correo de confirmación." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, className: "md:col-span-7 md:col-start-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClaimForm, {}) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const MOTIVOS = ["Cambio de talla", "Producto defectuoso", "Pedido incorrecto", "Producto no llegó", "Otro"];
function ClaimForm() {
  const [form, setForm] = reactExports.useState({
    nombre: "",
    email: "",
    pedido: "",
    motivo: "",
    descripcion: ""
  });
  const [file, setFile] = reactExports.useState(null);
  const [sent, setSent] = reactExports.useState(false);
  function set(k, v) {
    setForm((prev) => ({
      ...prev,
      [k]: v
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const body = [`Nombre: ${form.nombre}`, `Email: ${form.email}`, `Pedido: ${form.pedido}`, `Motivo: ${form.motivo}`, `Descripción: ${form.descripcion}`, file ? `Adjunto: ${file.name}` : ""].filter(Boolean).join("\n");
    window.open(`mailto:${EMAIL.returns}?subject=Reclamación%20pedido%20${encodeURIComponent(form.pedido)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }
  const inputCls = "w-full bg-transparent border-b border-border text-sm text-cream placeholder:text-cream/30 outline-none py-3 focus:border-cream/60 transition-colors";
  const labelCls = "block text-[9px] uppercase tracking-[0.3em] text-cream/40 mb-1";
  if (sent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-4", children: "¡Listo!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl uppercase text-cream mb-3", children: "Reclamación enviada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/55", children: "Se abrió tu cliente de correo con la reclamación lista. Envíala y te respondemos en máximo 2 días hábiles." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSent(false), className: "mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors", children: "Enviar otra" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Nombre completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.nombre, onChange: (e) => set("nombre", e.target.value), placeholder: "Tu nombre", className: inputCls })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Correo electrónico" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => set("email", e.target.value), placeholder: "tu@email.com", className: inputCls })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Número de pedido" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.pedido, onChange: (e) => set("pedido", e.target.value), placeholder: "#AIAHN-0001", className: inputCls })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Motivo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: MOTIVOS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set("motivo", m), className: cn("px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-colors", form.motivo === m ? "bg-acid text-ink border-acid" : "border-border text-cream/60 hover:border-cream/40"), children: m }, m)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Descripción" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: form.descripcion, onChange: (e) => set("descripcion", e.target.value), placeholder: "Describe el problema con el mayor detalle posible...", rows: 4, className: "w-full bg-transparent border border-border text-sm text-cream placeholder:text-cream/30 outline-none p-3 focus:border-cream/60 transition-colors resize-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Foto del producto (opcional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 border border-dashed border-border px-4 py-3 cursor-pointer hover:border-cream/40 transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 14, strokeWidth: 1.5, className: "text-cream/40 group-hover:text-cream/70 transition-colors shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream/40 group-hover:text-cream/60 transition-colors truncate", children: file ? file.name : "Adjuntar foto..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => setFile(e.target.files?.[0] ?? null) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/25", children: "JPG, PNG o WEBP — máx. 10MB" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !form.nombre || !form.email || !form.pedido || !form.motivo || !form.descripcion, className: "flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity disabled:opacity-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13, strokeWidth: 1.5 }),
      "Enviar reclamación"
    ] })
  ] });
}
export {
  CambiosPage as component
};
