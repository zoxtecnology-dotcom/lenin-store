import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { fmtCOP } from "@/lib/products";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

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
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  shipping_address: {
    name?: string;
    address?: string;
    city?: string;
  } | null;
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
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
                                {item.size} / {item.color} × {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm text-cream/60">{fmtCOP(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="p-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream/[0.02]">
                        {order.shipping_address && (
                          <p className="text-[10px] text-cream/40">
                            Envío a: {order.shipping_address.city}
                          </p>
                        )}
                        <p className="text-sm text-cream">
                          Total: <span className="font-medium">{fmtCOP(order.total)}</span>
                        </p>
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