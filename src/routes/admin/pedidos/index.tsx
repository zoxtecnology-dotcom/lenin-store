import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/pedidos/")({
  component: AdminPedidos,
});

interface Order {
  id: string;
  email: string;
  status: string;
  total: number;
  payment_method: string;
  created_at: string;
  profiles: { full_name: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente", paid: "Pagado", preparing: "Preparando",
  shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado", refunded: "Reembolsado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  paid: "text-green-400 bg-green-400/10",
  preparing: "text-blue-400 bg-blue-400/10",
  shipped: "text-purple-400 bg-purple-400/10",
  delivered: "text-acid bg-acid/10",
  cancelled: "text-red-400 bg-red-400/10",
  refunded: "text-cream/40 bg-cream/5",
};

const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

function AdminPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    supabase.from("orders")
      .select("id, email, status, total, payment_method, created_at, profiles(full_name)")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data ?? []); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const counts = Object.keys(STATUS_LABELS).reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Ventas</p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Pedidos</h1>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${filter === "all" ? "border-cream text-cream" : "border-border text-cream/40 hover:border-cream/30"}`}>
          Todos ({orders.length})
        </button>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          counts[key] > 0 && (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${filter === key ? "border-cream text-cream" : "border-border text-cream/40 hover:border-cream/30"}`}>
              {label} ({counts[key]})
            </button>
          )
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-cream/5 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-cream/40 text-sm">No hay pedidos {filter !== "all" ? `con estado "${STATUS_LABELS[filter]}"` : "todavía"}.</p>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {filtered.map((order) => (
            <Link key={order.id} to="/admin/pedidos/$id" params={{ id: order.id }}
              className="flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-cream truncate">
                  {order.profiles?.full_name ?? order.email}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-cream/40 font-mono">{order.id.slice(0, 8)}...</span>
                  <span className="text-[10px] text-cream/40">{fmtDate(order.created_at)}</span>
                  {order.payment_method && (
                    <span className="text-[10px] text-cream/30 uppercase">{order.payment_method}</span>
                  )}
                </div>
              </div>
              <span className="text-sm text-cream shrink-0">{fmt(order.total)}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 shrink-0 ${STATUS_COLORS[order.status] ?? "text-cream/40 bg-cream/5"}`}>
                {STATUS_LABELS[order.status] ?? order.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
