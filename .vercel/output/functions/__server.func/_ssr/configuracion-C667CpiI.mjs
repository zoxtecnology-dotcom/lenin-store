import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, x as createLucideIcon } from "./router-Cd0oBxWL.mjs";
import { L as Loader } from "./loader-bWMdxCq7.mjs";
import { S as Save } from "./save-CVIDclM7.mjs";
import { T as Truck } from "./truck-Bx4z_bJE.mjs";
import { M as MessageCircle } from "./message-circle-B8Yn9j7g.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
const __iconNode$4 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      key: "q8bfy3"
    }
  ],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
  ["path", { d: "M8 6v8", key: "15ugcq" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
const __iconNode = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
];
const Store = createLucideIcon("store", __iconNode);
const SECTIONS = [{
  title: "Tienda",
  icon: Store,
  keys: ["store_address", "store_hours"],
  description: "Información de la tienda"
}, {
  title: "Banner de anuncios",
  icon: Megaphone,
  keys: ["announcement_bar"],
  description: "Mensajes que rotan en la parte superior (dejar vacío para ocultar)"
}, {
  title: "Envíos",
  icon: Truck,
  keys: ["free_shipping_threshold", "shipping_cost", "shipping_time"],
  description: "Configuración de envíos y costos"
}, {
  title: "Contraentrega",
  icon: CreditCard,
  keys: ["cod_enabled", "cod_cities", "cod_extra_fee"],
  description: "Pago contra entrega en ciudades específicas"
}, {
  title: "Pedidos",
  icon: ShoppingCart,
  keys: ["min_order_amount"],
  description: "Configuración de pedidos"
}, {
  title: "Devoluciones",
  icon: RotateCcw,
  keys: ["returns_days"],
  description: "Política de devoluciones"
}, {
  title: "Contacto y redes",
  icon: MessageCircle,
  keys: ["whatsapp_number", "email_contacto", "instagram_url", "tiktok_url", "facebook_url", "youtube_url"],
  description: "Información de contacto y redes sociales"
}];
const boolKeys = ["cod_enabled"];
const numberKeys = ["free_shipping_threshold", "shipping_cost", "cod_extra_fee", "min_order_amount", "returns_days"];
const multilineKeys = ["announcement_bar", "cod_cities"];
function AdminConfiguracion() {
  const [settings, setSettings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.from("site_settings").select("*").order("key").then(({
      data
    }) => {
      setSettings(data ?? []);
      setLoading(false);
    });
  }, []);
  function getSetting(key) {
    return settings.find((s) => s.key === key);
  }
  function updateValue(key, value) {
    setSettings((prev) => prev.map((s) => s.key === key ? {
      ...s,
      value
    } : s));
  }
  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all(settings.map((s) => supabase.from("site_settings").update({
        value: s.value
      }).eq("key", s.key)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2e3);
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }
  function renderField(s) {
    if (boolKeys.includes(s.key)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: s.value === "true", onChange: (e) => updateValue(s.key, String(e.target.checked)), className: "accent-[#d4f542] w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream", children: s.value === "true" ? "Activado" : "Desactivado" })
      ] });
    }
    if (s.key === "whatsapp_number") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-cream/10 border border-border border-r-0 text-cream/50 text-sm px-3 py-2", children: "+57" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: s.value, onChange: (e) => updateValue(s.key, e.target.value.replace(/\D/g, "").slice(0, 10)), placeholder: "3XX XXX XXXX", className: "w-40 bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40" })
      ] });
    }
    if (numberKeys.includes(s.key)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: s.value, onChange: (e) => updateValue(s.key, e.target.value), className: "w-32 bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/30", children: "COP" })
      ] });
    }
    if (multilineKeys.includes(s.key)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: s.value, onChange: (e) => updateValue(s.key, e.target.value), placeholder: "Valor 1|Valor 2|Valor 3", className: "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30", children: "Separa los valores con |" })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: s.value, onChange: (e) => updateValue(s.key, e.target.value), className: "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Ajustes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Configuración" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saved ? "¡Guardado!" : saving ? "Guardando..." : "Guardar todo"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-cream/5 animate-pulse" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: SECTIONS.map((section) => {
      const sectionSettings = section.keys.map(getSetting).filter(Boolean);
      if (sectionSettings.length === 0) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border bg-cream/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(section.icon, { size: 16, className: "text-acid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm text-cream font-medium", children: section.title }),
            section.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: section.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-4", children: sectionSettings.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40", children: s.label }),
          renderField(s)
        ] }, s.key)) })
      ] }, section.title);
    }) })
  ] });
}
export {
  AdminConfiguracion as component
};
