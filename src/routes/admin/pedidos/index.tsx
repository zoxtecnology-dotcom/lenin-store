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
  address_snap: { full_name?: string } | null;
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.from("orders")
      .select("id, email, status, total, payment_method, created_at, address_snap")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders((data ?? []) as Order[]); setLoading(false); });
  }, []);

  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = (o.address_snap?.full_name ?? "").toLowerCase();
      if (!o.email.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q) && !name.includes(q)) return false;
    }
    return true;
  });
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
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Buscar por email o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-lg">×</button>
          )}
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-ink border border-border px-3 py-2 text-sm text-cream focus:border-acid focus:outline-none cursor-pointer"
        >
          <option value="all">Todos ({orders.length})</option>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {key === "pending" ? "⏳" : key === "paid" ? "💳" : key === "preparing" ? "📦" : key === "shipped" ? "🚚" : key === "delivered" ? "✓" : key === "cancelled" ? "✕" : "↺"} {label} ({counts[key] || 0})
            </option>
          ))}
        </select>

        {(filter !== "all" || search) && (
          <button
            onClick={() => { setFilter("all"); setSearch(""); }}
            className="text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors"
          >
            Limpiar
          </button>
        )}

        <span className="text-[10px] text-cream/30 ml-auto">
          {filtered.length} de {orders.length}
        </span>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-cream/5 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-cream/40 text-sm">
            {orders.length === 0 
              ? "No hay pedidos todavía." 
              : search 
                ? "No hay pedidos que coincidan con la búsqueda."
                : `No hay pedidos con estado "${STATUS_LABELS[filter]}".`}
          </p>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {filtered.map((order) => (
            <Link key={order.id} to="/admin/pedidos/$id" params={{ id: order.id }}
              className="flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-cream font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-[10px] text-cream/40">{fmtDate(order.created_at)}</span>
                  {order.payment_method && (
                    <span className="text-[10px] text-cream/30 uppercase">{order.payment_method}</span>
                  )}
                </div>
                <p className="text-[11px] text-cream/60 truncate mt-0.5">
                  {order.address_snap?.full_name ? `${order.address_snap.full_name} · ` : ""}{order.email}
                </p>
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
