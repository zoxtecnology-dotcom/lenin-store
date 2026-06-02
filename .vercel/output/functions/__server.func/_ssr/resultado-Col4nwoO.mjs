import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { a0 as useSearch, z as fmtCOP, L as Link } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { g as getOrderStatus, L as LoaderCircle } from "./mercadopago.functions-BlCC1ePY.mjs";
import { C as Clock } from "./clock-BGGGtcft.mjs";
import { a as CircleX, C as CircleCheckBig } from "./circle-x-oNe15pTC.mjs";
import { P as Package } from "./package-g1oPrVnX.mjs";
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
import "./createSsrRpc-OYTRBK8B.mjs";
function CheckoutResultPage() {
  const search = useSearch({
    from: "/checkout/resultado"
  });
  const [order, setOrder] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function fetchOrder() {
      if (!search.order) {
        setLoading(false);
        return;
      }
      try {
        const data = await getOrderStatus({
          data: {
            orderId: search.order
          }
        });
        setOrder(data);
      } catch (err) {
        console.error("Error obteniendo orden:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
    const interval = setInterval(async () => {
      if (search.order && (search.status === "pending" || order?.status === "pending")) {
        try {
          const data = await getOrderStatus({
            data: {
              orderId: search.order
            }
          });
          setOrder(data);
          if (data.status === "paid" || data.status === "failed") {
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error polling orden:", err);
        }
      }
    }, 5e3);
    return () => clearInterval(interval);
  }, [search.order, search.status]);
  const status = order?.status ?? search.status ?? "pending";
  const statusConfig = {
    success: {
      icon: CircleCheckBig,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/10",
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido confirmado y estamos preparándolo para enviártelo."
    },
    paid: {
      icon: CircleCheckBig,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/10",
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido confirmado y estamos preparándolo para enviártelo."
    },
    failure: {
      icon: CircleX,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago no procesado",
      description: "Hubo un problema con tu pago. Por favor, intenta nuevamente."
    },
    failed: {
      icon: CircleX,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago rechazado",
      description: "El pago fue rechazado. Verifica tus datos e intenta con otro método."
    },
    cancelled: {
      icon: CircleX,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago cancelado",
      description: "El pago fue cancelado. Puedes intentar nuevamente cuando quieras."
    },
    pending: {
      icon: Clock,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10",
      title: "Pago pendiente",
      description: "Estamos procesando tu pago. Te notificaremos por correo cuando se confirme."
    }
  };
  const config = statusConfig[status] ?? statusConfig.pending;
  const Icon = config.icon;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-36 pb-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-cream/50" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-5 md:px-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-20 h-20 mx-auto rounded-full ${config.bgColor} flex items-center justify-center mb-6`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-10 h-10 ${config.iconColor}`, strokeWidth: 1.5 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl uppercase tracking-wide text-cream mb-4", children: config.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 mb-8", children: config.description }) }),
      order && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6 mb-8 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-acid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-[0.25em] text-cream", children: "Detalles del pedido" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Número de orden" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream font-mono text-xs", children: [
              order.id.slice(0, 8),
              "..."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Total pagado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: fmtCOP(order.total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Correo de confirmación" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: order.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Estado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `uppercase text-[10px] tracking-wider ${order.status === "paid" ? "text-green-400" : order.status === "pending" ? "text-amber-400" : "text-red-400"}`, children: order.status === "paid" ? "Pagado" : order.status === "pending" ? "Pendiente" : order.status === "failed" ? "Fallido" : order.status })
          ] })
        ] })
      ] }) }),
      status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.25, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-400/5 border border-amber-400/20 p-4 mb-8 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "¿Pagaste con PSE, Efecty o en puntos de pago?" }),
        " El pago puede tardar hasta 2 días hábiles en confirmarse. Te enviaremos un correo cuando se acredite."
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        status === "failure" || status === "failed" || status === "cancelled" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", className: "bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2", children: [
          "Reintentar pago",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2", children: [
          "Seguir comprando",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] }),
        order && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cuenta", className: "border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors", children: "Ver mis pedidos" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.35, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 text-[10px] text-cream/40", children: [
        "¿Tienes problemas?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contacto", className: "text-acid hover:underline", children: "Contáctanos" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CheckoutResultPage as component
};
