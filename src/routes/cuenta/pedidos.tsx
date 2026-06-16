import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { fmtCOP } from "@/lib/products";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle, MapPin, Pencil, Save, Loader2, X, ChevronDown } from "lucide-react";
import { updateOrderAddress, EDITABLE_ADDRESS_STATUSES } from "@/lib/api/orders.functions";

const DEPARTMENTS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar",
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó",
  "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
  "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío",
  "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima",
  "Valle del Cauca", "Vaupés", "Vichada",
];

interface ShippingAddress {
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  department?: string;
  postal_code?: string;
}

const inputCls = "w-full bg-background border border-border px-3 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none";

export const Route = createFileRoute("/cuenta/pedidos")({
  head: () => ({
    meta: [{ title: pageTitle("Mis pedidos") }],
  }),
  component: MisPedidosPage,
});

interface Order {
  id: string;
  status: string;
  total: number;
  items: Array<{
    slug?: string;
    name: string;
    size: string;
    color: string;
    qty: number;
    price: number;
    image?: string;
  }>;
  address_snap: ShippingAddress | null;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pendiente", icon: Clock, color: "text-yellow-400" },
  paid: { label: "Pagado", icon: CheckCircle, color: "text-green-400" },
  confirmed: { label: "Confirmado", icon: CheckCircle, color: "text-blue-400" },
  shipped: { label: "Enviado", icon: Truck, color: "text-acid" },
  delivered: { label: "Entregado", icon: CheckCircle, color: "text-green-400" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "text-red-400" },
  failed: { label: "Fallido", icon: XCircle, color: "text-red-400" },
  refunded: { label: "Reembolsado", icon: XCircle, color: "text-orange-400" },
};

function MisPedidosPage() {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Edición de dirección
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ShippingAddress>({});
  const [savingAddr, setSavingAddr] = useState(false);
  const [addrError, setAddrError] = useState<string | null>(null);

  function startEdit(order: Order) {
    setAddrError(null);
    setEditingId(order.id);
    setEditForm({ ...(order.address_snap ?? {}) });
  }

  async function saveAddress(orderId: string) {
    setAddrError(null);
    // Validaciones básicas
    if (!editForm.full_name || !editForm.phone || !editForm.address || !editForm.city || !editForm.department) {
      setAddrError("Completa todos los campos obligatorios");
      return;
    }
    if (!/^\d{7,10}$/.test((editForm.phone ?? "").trim())) {
      setAddrError("El teléfono debe tener entre 7 y 10 dígitos");
      return;
    }
    setSavingAddr(true);
    try {
      await updateOrderAddress({
        data: {
          orderId,
          address: {
            full_name: editForm.full_name!,
            phone: editForm.phone!,
            address: editForm.address!,
            city: editForm.city!,
            department: editForm.department!,
            postal_code: editForm.postal_code,
          },
          accessToken: session!.access_token,
        },
      });
      setEditingId(null);
      await loadOrders();
    } catch (err) {
      setAddrError(err instanceof Error ? err.message : "No se pudo actualizar la dirección");
    } finally {
      setSavingAddr(false);
    }
  }

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    setOrders(data ?? []);
    setLoading(false);
  }

  if (authLoading || !user) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <Link
              to="/cuenta"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Volver a mi cuenta
            </Link>
          </Reveal>
          <Reveal delay={50}>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Historial</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream">
              Mis pedidos
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <Reveal>
              <div className="text-center py-20 border border-border">
                <Package size={40} strokeWidth={1} className="mx-auto text-cream/20 mb-6" />
                <p className="text-sm text-cream/50 mb-6">Aún no tienes pedidos</p>
                <Link
                  to="/collections/$handle"
                  params={{ handle: "nuevo" }}
                  search={{ sort: "reciente" }}
                  className="inline-block border border-cream/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-background transition-colors"
                >
                  Explorar colección
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-6">
              {orders.map((order, i) => {
                const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                const StatusIcon = status.icon;
                const date = new Date(order.created_at).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <Reveal key={order.id} delay={i * 60}>
                    <div className="border border-border">
                      {/* Header */}
                      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1">
                            Pedido #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-sm text-cream/60">{date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon size={14} className={status.color} />
                          <span className={`text-[10px] uppercase tracking-[0.25em] ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-6 space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            {item.image && (
                              <div className="w-16 h-20 bg-cream/5 flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-cream truncate">{item.name}</p>
                              <p className="text-[10px] text-cream/40 mt-1">
                                {item.size} / {item.color} × {item.qty}
                              </p>
                            </div>
                            <p className="text-sm text-cream/60">{fmtCOP(item.price * item.qty)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="p-6 border-t border-border bg-cream/[0.02]">
                        {editingId === order.id ? (
                          /* ── Editar dirección ── */
                          <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-acid">Editar dirección de envío</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input type="text" placeholder="Nombre completo *" value={editForm.full_name ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value.replace(/[^a-zA-ZÀ-ÿñÑ\s'.]/g, "") })}
                                className={inputCls} />
                              <input type="tel" inputMode="numeric" maxLength={10} placeholder="Teléfono *" value={editForm.phone ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                                className={inputCls} />
                              <input type="text" placeholder="Dirección completa *" value={editForm.address ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                className={`${inputCls} sm:col-span-2`} />
                              <input type="text" placeholder="Ciudad *" value={editForm.city ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, city: e.target.value.replace(/[^a-zA-ZÀ-ÿñÑ\s'.-]/g, "") })}
                                className={inputCls} />
                              <div className="relative">
                                <select value={editForm.department ?? ""}
                                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                  className={`${inputCls} appearance-none cursor-pointer pr-9`}>
                                  <option value="" className="bg-background">Departamento *</option>
                                  {DEPARTMENTS.map((d) => <option key={d} value={d} className="bg-background">{d}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
                              </div>
                              <input type="text" inputMode="numeric" maxLength={6} placeholder="Código postal (opcional)" value={editForm.postal_code ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                                className={`${inputCls} sm:col-span-2`} />
                            </div>
                            {addrError && <p className="text-[11px] text-red-400">{addrError}</p>}
                            <div className="flex items-center gap-2">
                              <button onClick={() => saveAddress(order.id)} disabled={savingAddr}
                                className="flex items-center gap-2 bg-acid text-ink px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
                                {savingAddr ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} strokeWidth={2} />}
                                {savingAddr ? "Guardando..." : "Guardar dirección"}
                              </button>
                              <button onClick={() => setEditingId(null)} disabled={savingAddr}
                                className="flex items-center gap-2 border border-border text-cream/70 px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] hover:border-cream/40 transition-colors">
                                <X size={13} strokeWidth={2} /> Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* ── Vista normal ── */
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="min-w-0">
                              {order.address_snap ? (
                                <div className="flex items-start gap-2">
                                  <MapPin size={13} className="text-cream/30 mt-0.5 shrink-0" />
                                  <div className="text-[11px] text-cream/50 leading-relaxed">
                                    {order.address_snap.full_name && <span className="text-cream/70">{order.address_snap.full_name}<br /></span>}
                                    {order.address_snap.address}
                                    {(order.address_snap.city || order.address_snap.department) && (
                                      <><br />{[order.address_snap.city, order.address_snap.department].filter(Boolean).join(", ")}</>
                                    )}
                                    {order.address_snap.phone && <><br />Tel: {order.address_snap.phone}</>}
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[10px] text-cream/40">Sin dirección registrada</p>
                              )}
                              {EDITABLE_ADDRESS_STATUSES.includes(order.status) ? (
                                <button onClick={() => startEdit(order)}
                                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-acid hover:underline">
                                  <Pencil size={11} strokeWidth={2} /> Editar dirección
                                </button>
                              ) : (
                                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-cream/30">
                                  El pedido ya fue procesado — no se puede cambiar la dirección
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-cream shrink-0">
                              Total: <span className="font-medium">{fmtCOP(order.total)}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}