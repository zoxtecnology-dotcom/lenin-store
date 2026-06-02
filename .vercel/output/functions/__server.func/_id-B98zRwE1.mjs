import { Y as reactExports, N as jsxRuntimeExports } from "./_ssr/index.mjs";
import { l as Route$4, $ as useNavigate, Q as supabase } from "./_ssr/router-BWVHQLZp.mjs";
import { A as ArrowLeft } from "./_ssr/arrow-left-jnwlvACu.mjs";
import { L as Loader } from "./_ssr/loader-C9Dviu41.mjs";
import { S as Save } from "./_ssr/save-D07xq8uH.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
import "./_ssr/types-D0vF8QzC.mjs";
const STATUS_OPTIONS = ["pending", "paid", "preparing", "shipped", "delivered", "cancelled", "refunded"];
const STATUS_LABELS = {
  pending: "Pendiente",
  paid: "Pagado",
  preparing: "Preparando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reembolsado"
};
const fmt = (n) => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
}).format(n);
function DetallePedido() {
  const {
    id
  } = Route$4.useParams();
  const navigate = useNavigate();
  const [order, setOrder] = reactExports.useState(null);
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState("");
  const [trackingCode, setTrackingCode] = reactExports.useState("");
  reactExports.useEffect(() => {
    Promise.all([supabase.from("orders").select("*, profiles(full_name, phone)").eq("id", id).single(), supabase.from("order_items").select("*").eq("order_id", id)]).then(([{
      data: ord
    }, {
      data: its
    }]) => {
      if (!ord) {
        navigate({
          to: "/admin/pedidos"
        });
        return;
      }
      setOrder(ord);
      setStatus(ord.status);
      setTrackingCode(ord.tracking_code ?? "");
      setItems(its ?? []);
      setLoading(false);
    });
  }, [id, navigate]);
  async function handleSave() {
    setSaving(true);
    await supabase.from("orders").update({
      status,
      tracking_code: trackingCode || null
    }).eq("id", id);
    setSaving(false);
    navigate({
      to: "/admin/pedidos"
    });
  }
  if (loading || !order) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  const address = order.address_snap;
  const profile = order.profiles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/admin/pedidos"
        }), className: "text-cream/40 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18, strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Pedidos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[0.88] text-cream", children: [
            "#",
            order.id.slice(0, 8)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saving ? "Guardando..." : "Guardar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Estado del pedido" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "w-full bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40", children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: lbl, children: "Código de rastreo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: trackingCode, onChange: (e) => setTrackingCode(e.target.value), placeholder: "Ej: 123456789CO", className: "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-3", children: "Cliente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: profile?.full_name ?? order.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/50", children: order.email }),
      profile?.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/50", children: profile.phone }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-1", children: "Dirección de envío" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/70", children: address.address }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-cream/50", children: [
          address.city,
          ", ",
          address.department
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: "Productos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: item.product_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
            item.color_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40", children: item.color_name }),
            item.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/40", children: [
              "Talla ",
              item.size
            ] }),
            item.piece && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/30", children: item.piece }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/30", children: [
              "×",
              item.qty
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream", children: fmt(item.unit_price * item.qty) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-cream/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.2em]", children: "Subtotal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(order.subtotal) })
      ] }),
      order.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-acid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.2em]", children: "Descuento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "-",
          fmt(order.discount)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-cream/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.2em]", children: "Envío" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: order.shipping_cost > 0 ? fmt(order.shipping_cost) : "Gratis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-cream font-medium pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.2em]", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(order.total) })
      ] })
    ] })
  ] });
}
const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
export {
  DetallePedido as component
};
