import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { L as Link, P as Plus, Q as supabase, y as createLucideIcon } from "./router-BWVHQLZp.mjs";
import { P as Package } from "./package-g1oPrVnX.mjs";
import { S as ShoppingBag } from "./shopping-bag-Ce0JJ2U8.mjs";
import { U as Users } from "./users-CUS_J4_W.mjs";
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
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function AdminDashboard() {
  const [stats, setStats] = reactExports.useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function load() {
      const [products, orders, users] = await Promise.all([supabase.from("products").select("id", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("id, total, status", {
        count: "exact"
      }), supabase.from("profiles").select("id", {
        count: "exact",
        head: true
      })]);
      const allOrders = orders.data ?? [];
      const revenue = allOrders.filter((o) => o.status === "paid" || o.status === "shipped" || o.status === "delivered").reduce((sum, o) => sum + o.total, 0);
      const pendingOrders = allOrders.filter((o) => o.status === "pending").length;
      setStats({
        products: products.count ?? 0,
        orders: orders.count ?? 0,
        users: users.count ?? 0,
        revenue,
        pendingOrders
      });
      setLoading(false);
    }
    load();
  }, []);
  const cards = [{
    label: "Productos",
    value: stats.products,
    icon: Package,
    to: "/admin/productos",
    color: "text-acid"
  }, {
    label: "Pedidos",
    value: stats.orders,
    icon: ShoppingBag,
    to: "/admin/pedidos",
    color: "text-blue-400",
    badge: stats.pendingOrders > 0 ? `${stats.pendingOrders} pendientes` : null
  }, {
    label: "Usuarios",
    value: stats.users,
    icon: Users,
    to: "/admin/configuracion",
    color: "text-purple-400"
  }, {
    label: "Ingresos",
    value: `$${(stats.revenue / 1e3).toFixed(0)}k`,
    icon: TrendingUp,
    to: "/admin/pedidos",
    color: "text-green-400"
  }];
  const quickLinks = [{
    label: "Nuevo producto",
    to: "/admin/productos/nuevo",
    icon: Plus
  }, {
    label: "Nuevo drop",
    to: "/admin/drops/nuevo",
    icon: Plus
  }, {
    label: "Nuevo pack",
    to: "/admin/packs/nuevo",
    icon: Plus
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-2", children: "Panel de control" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.88] text-cream", children: "Dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4", children: cards.map(({
      label,
      value,
      icon: Icon,
      to,
      color,
      badge
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "border border-border p-6 hover:border-cream/30 transition-colors group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, strokeWidth: 1.5, className: color }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12, strokeWidth: 1.5, className: "text-cream/20 group-hover:text-cream/50 transition-colors" })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-16 bg-cream/5 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-cream uppercase", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-1", children: label }),
      badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-block text-[9px] uppercase tracking-[0.2em] bg-acid/10 text-acid px-2 py-0.5", children: badge })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-4", children: "Acciones rápidas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: quickLinks.map(({
        label,
        to,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex items-center gap-2 border border-border px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-cream/60 hover:text-cream hover:border-cream/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, strokeWidth: 1.5 }),
        label
      ] }, to)) })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
