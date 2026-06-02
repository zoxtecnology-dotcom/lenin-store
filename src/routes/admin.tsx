import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, Package, Layers, Box,
  ShoppingBag, Settings, LogOut, Menu, X, ExternalLink,
  Palette, Users, Ruler,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin",              label: "Dashboard",     icon: LayoutDashboard, exact: true },
  { to: "/admin/productos",    label: "Productos",     icon: Package },
  { to: "/admin/drops",        label: "Drops",         icon: Layers },
  { to: "/admin/packs",        label: "Packs",         icon: Box },
  { to: "/admin/pedidos",      label: "Pedidos",       icon: ShoppingBag },
  { to: "/admin/colores",      label: "Colores",       icon: Palette },
  { to: "/admin/tallas",       label: "Tallas",        icon: Ruler },
  { to: "/admin/clientes",     label: "Clientes",      icon: Users },
  { to: "/admin/configuracion",label: "Configuración", icon: Settings },
];

function AdminLayout() {
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);


  useEffect(() => {
    if (loading) return;
    if (!user || !session) { navigate({ to: "/login" }); return; }

    async function checkAdmin() {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user!.id)
        .single();


      if (error || data?.role !== "admin") {
        setIsAdmin(false);
        navigate({ to: "/" });
      } else {
        setIsAdmin(true);
      }
    }

    checkAdmin();
  }, [user, loading, navigate]);

  if (loading || !user || isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  function isActive(to: string, exact = false) {
    return exact
      ? location.pathname === to
      : location.pathname.startsWith(to);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 bg-background border-r border-border z-40" style={{ width: "var(--sidebar-w)" }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink">
              AI<span className="font-serif-it not-italic">A</span>HN
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-cream/30 group-hover:text-cream/60 transition-colors">
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors",
                isActive(to, exact)
                  ? "bg-acid/10 text-acid"
                  : "text-cream/50 hover:text-cream hover:bg-cream/5"
              )}
            >
              <Icon size={14} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-border space-y-0.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors"
          >
            <ExternalLink size={14} strokeWidth={1.5} />
            Ver tienda
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-red-400 transition-colors"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Cerrar sesión
          </button>
          <p className="px-3 pt-2 text-[9px] text-cream/20 truncate">{user.email}</p>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 bg-background border-r border-border flex flex-col" style={{ width: "min(var(--sidebar-w), 85vw)" }}>
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <span className="bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink">
                AI<span className="font-serif-it not-italic">A</span>HN
              </span>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={18} strokeWidth={1.5} className="text-cream/50" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {NAV.map(({ to, label, icon: Icon, exact }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors",
                    isActive(to, exact)
                      ? "bg-acid/10 text-acid"
                      : "text-cream/50 hover:text-cream hover:bg-cream/5"
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen admin-content">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={20} strokeWidth={1.5} className="text-cream" />
          </button>
          <span className="bg-acid px-1.5 py-0.5 font-display text-xl font-black uppercase leading-none text-ink">
            AI<span className="font-serif-it not-italic">A</span>HN
          </span>
          <div className="w-5" />
        </header>

        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
