import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Phone, ShoppingBag, Calendar, Search } from "lucide-react";
import { fmtCOP } from "@/lib/products";

export const Route = createFileRoute("/admin/clientes")({
  component: AdminClientes,
});

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  orders_count?: number;
  orders_total?: number;
}

function AdminClientes() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    // Cargar perfiles
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone, role, created_at")
      .order("created_at", { ascending: false });

    // Cargar estadísticas de órdenes por usuario
    const { data: ordersData } = await supabase
      .from("orders")
      .select("user_id, total");

    // Combinar datos
    const ordersByUser = (ordersData ?? []).reduce((acc, o) => {
      if (!acc[o.user_id]) acc[o.user_id] = { count: 0, total: 0 };
      acc[o.user_id].count++;
      acc[o.user_id].total += o.total || 0;
      return acc;
    }, {} as Record<string, { count: number; total: number }>);

    const enriched = (profilesData ?? []).map((p) => ({
      ...p,
      orders_count: ordersByUser[p.id]?.count ?? 0,
      orders_total: ordersByUser[p.id]?.total ?? 0,
    }));

    setProfiles(enriched);
    setLoading(false);
  }

  const filtered = profiles.filter((p) => {
    if (filter === "customers" && p.role !== "customer") return false;
    if (filter === "admins" && p.role !== "admin") return false;
    if (filter === "buyers" && (p.orders_count ?? 0) === 0) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.email.toLowerCase().includes(q) ||
        (p.full_name?.toLowerCase().includes(q) ?? false) ||
        (p.phone?.includes(q) ?? false)
      );
    }
    return true;
  });

  const counts = {
    all: profiles.length,
    customers: profiles.filter((p) => p.role === "customer").length,
    admins: profiles.filter((p) => p.role === "admin").length,
    buyers: profiles.filter((p) => (p.orders_count ?? 0) > 0).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Usuarios</p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">
          Clientes
        </h1>
        <p className="text-sm text-cream/40 mt-2">
          Lista de usuarios registrados (solo lectura).
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por email, nombre o teléfono..."
            className="w-full bg-transparent border border-border pl-9 pr-3 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "customers", "admins", "buyers"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                filter === f
                  ? "border-acid text-acid"
                  : "border-border text-cream/50 hover:border-cream/30"
              }`}
            >
              {f === "all" && `Todos (${counts.all})`}
              {f === "customers" && `Clientes (${counts.customers})`}
              {f === "admins" && `Admins (${counts.admins})`}
              {f === "buyers" && `Con compras (${counts.buyers})`}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-20 bg-cream/5 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <p className="text-cream/40 text-sm">No hay usuarios que coincidan.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((profile) => (
            <div key={profile.id} className="border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-cream/10 flex items-center justify-center shrink-0">
                  <User size={16} className="text-cream/40" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-cream font-medium truncate">
                    {profile.full_name || "Sin nombre"}
                    {profile.role === "admin" && (
                      <span className="ml-2 text-[9px] bg-acid text-ink px-1.5 py-0.5 uppercase">Admin</span>
                    )}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-cream/40 mt-0.5">
                    <span className="flex items-center gap-1 truncate">
                      <Mail size={10} /> {profile.email}
                    </span>
                    {profile.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={10} /> {profile.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[11px] text-cream/50">
                <div className="flex items-center gap-1">
                  <ShoppingBag size={12} />
                  <span>{profile.orders_count ?? 0} pedidos</span>
                </div>
                {(profile.orders_total ?? 0) > 0 && (
                  <span className="text-acid font-medium">{fmtCOP(profile.orders_total ?? 0)}</span>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{new Date(profile.created_at).toLocaleDateString("es-CO")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-cream/20">
        {filtered.length} de {profiles.length} usuarios
      </p>
    </div>
  );
}
