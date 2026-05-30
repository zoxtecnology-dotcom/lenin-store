import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as supabase } from "./router-BAT9GkoO.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
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
  reactExports.useEffect(() => {
    supabase.from("orders").select("id, email, status, total, payment_method, created_at, profiles(full_name)").order("created_at", {
      ascending: false
    }).then(({
      data
    }) => {
      setOrders(data ?? []);
      setLoading(false);
    });
  }, []);
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const counts = Object.keys(STATUS_LABELS).reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Ventas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Pedidos" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter("all"), className: `px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${filter === "all" ? "border-cream text-cream" : "border-border text-cream/40 hover:border-cream/30"}`, children: [
        "Todos (",
        orders.length,
        ")"
      ] }),
      Object.entries(STATUS_LABELS).map(([key, label]) => counts[key] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(key), className: `px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${filter === key ? "border-cream text-cream" : "border-border text-cream/40 hover:border-cream/30"}`, children: [
        label,
        " (",
        counts[key],
        ")"
      ] }, key))
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-cream/5 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/40 text-sm", children: [
      "No hay pedidos ",
      filter !== "all" ? `con estado "${STATUS_LABELS[filter]}"` : "todavía",
      "."
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border", children: filtered.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/pedidos/$id", params: {
      id: order.id
    }, className: "flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream truncate", children: order.profiles?.full_name ?? order.email }),
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
