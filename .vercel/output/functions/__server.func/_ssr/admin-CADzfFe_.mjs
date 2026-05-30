import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { F as useAuth, q as cn, D as supabase } from "./router-BAT9GkoO.mjs";
import { i as LayoutDashboard, P as Package, L as Layers, B as Box, v as ShoppingBag, t as Settings, E as ExternalLink, k as LogOut, X, m as Menu } from "../_libs/lucide-react.mjs";
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
const NAV = [{
  to: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/productos",
  label: "Productos",
  icon: Package
}, {
  to: "/admin/drops",
  label: "Drops",
  icon: Layers
}, {
  to: "/admin/packs",
  label: "Packs",
  icon: Box
}, {
  to: "/admin/pedidos",
  label: "Pedidos",
  icon: ShoppingBag
}, {
  to: "/admin/configuracion",
  label: "Configuración",
  icon: Settings
}];
function AdminLayout() {
  const {
    user,
    session,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const {
    location
  } = useRouterState();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user || !session) {
      navigate({
        to: "/login"
      });
      return;
    }
    async function checkAdmin() {
      const {
        data,
        error
      } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (error || data?.role !== "admin") {
        setIsAdmin(false);
        navigate({
          to: "/"
        });
      } else {
        setIsAdmin(true);
      }
    }
    checkAdmin();
  }, [user, loading, navigate]);
  if (loading || !user || isAdmin === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  }
  if (!isAdmin) return null;
  async function handleSignOut() {
    await signOut();
    navigate({
      to: "/"
    });
  }
  function isActive(to, exact = false) {
    return exact ? location.pathname === to : location.pathname.startsWith(to);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-56 flex-col fixed inset-y-0 left-0 bg-background border-r border-border z-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink", children: [
          "AI",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
          "HN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.3em] text-cream/30 group-hover:text-cream/60 transition-colors", children: "Admin" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-0.5 overflow-y-auto", children: NAV.map(({
        to,
        label,
        icon: Icon,
        exact
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: cn("flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors", isActive(to, exact) ? "bg-acid/10 text-acid" : "text-cream/50 hover:text-cream hover:bg-cream/5"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, strokeWidth: 1.5 }),
        label
      ] }, to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-4 border-t border-border space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", target: "_blank", className: "flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14, strokeWidth: 1.5 }),
          "Ver tienda"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "w-full flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-red-400 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14, strokeWidth: 1.5 }),
          "Cerrar sesión"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-2 text-[9px] text-cream/20 truncate", children: user.email })
      ] })
    ] }),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80", onClick: () => setSidebarOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "absolute left-0 top-0 bottom-0 w-56 bg-background border-r border-border flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink", children: [
            "AI",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
            "HN"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, strokeWidth: 1.5, className: "text-cream/50" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-0.5", children: NAV.map(({
          to,
          label,
          icon: Icon,
          exact
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, onClick: () => setSidebarOpen(false), className: cn("flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors", isActive(to, exact) ? "bg-acid/10 text-acid" : "text-cream/50 hover:text-cream hover:bg-cream/5"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, strokeWidth: 1.5 }),
          label
        ] }, to)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 md:ml-56 flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "md:hidden flex items-center justify-between px-5 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20, strokeWidth: 1.5, className: "text-cream" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink", children: [
          "AI",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif-it not-italic", children: "A" }),
          "HN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-5 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
