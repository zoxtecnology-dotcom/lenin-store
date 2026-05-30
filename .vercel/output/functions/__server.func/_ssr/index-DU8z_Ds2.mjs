import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as supabase } from "./router-BAT9GkoO.mjs";
import { P as Package, v as ShoppingBag, F as Users, y as TrendingUp, a as ArrowRight, q as Plus } from "../_libs/lucide-react.mjs";
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
