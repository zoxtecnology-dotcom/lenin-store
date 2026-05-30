import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, Users, TrendingUp, Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

interface Stats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
  pendingOrders: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, users: 0, revenue: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [products, orders, users] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id, total, status", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);

      const allOrders = orders.data ?? [];
      const revenue = allOrders
        .filter((o) => o.status === "paid" || o.status === "shipped" || o.status === "delivered")
        .reduce((sum, o) => sum + o.total, 0);
      const pendingOrders = allOrders.filter((o) => o.status === "pending").length;

      setStats({
        products: products.count ?? 0,
        orders: orders.count ?? 0,
        users: users.count ?? 0,
        revenue,
        pendingOrders,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Productos", value: stats.products, icon: Package, to: "/admin/productos", color: "text-acid" },
    { label: "Pedidos", value: stats.orders, icon: ShoppingBag, to: "/admin/pedidos", color: "text-blue-400", badge: stats.pendingOrders > 0 ? `${stats.pendingOrders} pendientes` : null },
    { label: "Usuarios", value: stats.users, icon: Users, to: "/admin/configuracion", color: "text-purple-400" },
    { label: "Ingresos", value: `$${(stats.revenue / 1000).toFixed(0)}k`, icon: TrendingUp, to: "/admin/pedidos", color: "text-green-400" },
  ];

  const quickLinks = [
    { label: "Nuevo producto", to: "/admin/productos/nuevo", icon: Plus },
    { label: "Nuevo drop", to: "/admin/drops/nuevo", icon: Plus },
    { label: "Nuevo pack", to: "/admin/packs/nuevo", icon: Plus },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-2">Panel de control</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.88] text-cream">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, to, color, badge }) => (
          <Link key={label} to={to} className="border border-border p-6 hover:border-cream/30 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <Icon size={18} strokeWidth={1.5} className={color} />
              <ArrowRight size={12} strokeWidth={1.5} className="text-cream/20 group-hover:text-cream/50 transition-colors" />
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-cream/5 animate-pulse" />
            ) : (
              <p className="font-display text-3xl text-cream uppercase">{value}</p>
            )}
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-1">{label}</p>
            {badge && (
              <span className="mt-2 inline-block text-[9px] uppercase tracking-[0.2em] bg-acid/10 text-acid px-2 py-0.5">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-4">Acciones rápidas</p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 border border-border px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-cream/60 hover:text-cream hover:border-cream/30 transition-colors"
            >
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
