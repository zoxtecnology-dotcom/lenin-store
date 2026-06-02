import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, L as Link } from "./router-Cd0oBxWL.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
const STATUS_LABELS = {
  pending: "Pendiente",
  paid: "Pagado",
  preparing: "Preparando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reembolsado"
};
const STATUS_COLORS = {
  pending: "text-yellow-400 bg-yellow-400/10",
  paid: "text-green-400 bg-green-400/10",
  preparing: "text-blue-400 bg-blue-400/10",
  shipped: "text-purple-400 bg-purple-400/10",
  delivered: "text-acid bg-acid/10",
  cancelled: "text-red-400 bg-red-400/10",
  refunded: "text-cream/40 bg-cream/5"
};
const fmt = (n) => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
}).format(n);
const fmtDate = (d) => new Date(d).toLocaleDateString("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});
function AdminPedidos() {
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    supabase.from("orders").select("id, email, status, total, payment_method, created_at").order("created_at", {
      ascending: false
    }).then(({
      data
    }) => {
      setOrders(data ?? []);
      setLoading(false);
    });
  }, []);
  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search && !o.email.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const counts = Object.keys(STATUS_LABELS).reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Ventas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Pedidos" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Buscar por email o ID...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none" }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearch(""), className: "absolute right-2 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-lg", children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "all", children: [
          "Todos (",
          orders.length,
          ")"
        ] }),
        Object.entries(STATUS_LABELS).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: key, children: [
          key === "pending" ? "⏳" : key === "paid" ? "💳" : key === "preparing" ? "📦" : key === "shipped" ? "🚚" : key === "delivered" ? "✓" : key === "cancelled" ? "✕" : "↺",
          " ",
          label,
          " (",
          counts[key] || 0,
          ")"
        ] }, key))
      ] }),
      (filter !== "all" || search) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setFilter("all");
        setSearch("");
      }, className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors", children: "Limpiar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/30 ml-auto", children: [
        filtered.length,
        " de ",
        orders.length
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-cream/5 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-sm", children: orders.length === 0 ? "No hay pedidos todavía." : search ? "No hay pedidos que coincidan con la búsqueda." : `No hay pedidos con estado "${STATUS_LABELS[filter]}".` }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: filtered.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/pedidos/$id", params: {
      id: order.id
    }, className: "flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream truncate", children: order.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/40 font-mono", children: [
            order.id.slice(0, 8),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40", children: fmtDate(order.created_at) }),
          order.payment_method && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/30 uppercase", children: order.payment_method })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream shrink-0", children: fmt(order.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] uppercase tracking-[0.2em] px-2 py-1 shrink-0 ${STATUS_COLORS[order.status] ?? "text-cream/40 bg-cream/5"}`, children: STATUS_LABELS[order.status] ?? order.status })
    ] }, order.id)) })
  ] });
}
export {
  AdminPedidos as component
};
