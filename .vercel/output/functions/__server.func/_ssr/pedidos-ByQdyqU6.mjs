import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, $ as useNavigate, Q as supabase, L as Link, y as fmtCOP, x as createLucideIcon } from "./router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-CbOX52zc.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { A as ArrowLeft } from "./arrow-left-COmzqrIF.mjs";
import { P as Package } from "./package-Dl87lcow.mjs";
import { T as Truck } from "./truck-Bx4z_bJE.mjs";
import { C as Clock } from "./clock-CeOllMGG.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./menu-BYb1-akj.mjs";
import "./user-vzxeEXK0.mjs";
import "./shopping-bag-6dSKfxZg.mjs";
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    color: "text-yellow-400"
  },
  confirmed: {
    label: "Confirmado",
    icon: CircleCheckBig,
    color: "text-blue-400"
  },
  shipped: {
    label: "Enviado",
    icon: Truck,
    color: "text-acid"
  },
  delivered: {
    label: "Entregado",
    icon: CircleCheckBig,
    color: "text-green-400"
  },
  cancelled: {
    label: "Cancelado",
    icon: CircleX,
    color: "text-red-400"
  }
};
function MisPedidosPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [authLoading, user, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);
  async function loadOrders() {
    const {
      data
    } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    });
    setOrders(data ?? []);
    setLoading(false);
  }
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-background min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cuenta", className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 12 }),
        "Volver a mi cuenta"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Historial" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream", children: "Mis pedidos" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 40, strokeWidth: 1, className: "mx-auto text-cream/20 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50 mb-6", children: "Aún no tienes pedidos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$handle", params: {
        handle: "nuevo"
      }, search: {
        sort: "reciente"
      }, className: "inline-block border border-cream/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-background transition-colors", children: "Explorar colección" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: orders.map((order, i) => {
      const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
      const StatusIcon = status.icon;
      const date = new Date(order.created_at).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1", children: [
              "Pedido #",
              order.id.slice(0, 8).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { size: 14, className: status.color }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-[0.25em] ${status.color}`, children: status.label })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          item.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 bg-cream/5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream truncate", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/40 mt-1", children: [
              item.size,
              " / ",
              item.color,
              " × ",
              item.quantity
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: fmtCOP(item.price * item.quantity) })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream/[0.02]", children: [
          order.shipping_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/40", children: [
            "Envío a: ",
            order.shipping_address.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cream", children: [
            "Total: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: fmtCOP(order.total) })
          ] })
        ] })
      ] }) }, order.id);
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  MisPedidosPage as component
};
