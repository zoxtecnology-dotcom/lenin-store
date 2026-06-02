import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { getOrderStatus } from "@/lib/api/mercadopago.functions";
import { fmtCOP } from "@/lib/products";
import { CheckCircle, XCircle, Clock, Package, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  status: z.enum(["success", "failure", "pending"]).optional(),
  order: z.string().optional(),
  payment_id: z.string().optional(),
  collection_id: z.string().optional(),
  collection_status: z.string().optional(),
});

export const Route = createFileRoute("/checkout/resultado")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: pageTitle("Resultado del pago") }],
  }),
  component: CheckoutResultPage,
});

function CheckoutResultPage() {
  const search = useSearch({ from: "/checkout/resultado" });
  const [order, setOrder] = useState<{
    id: string;
    status: string;
    total: number;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!search.order) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderStatus({ data: { orderId: search.order } });
        setOrder(data);
      } catch (err) {
        console.error("Error obteniendo orden:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();

    // Poll cada 5 segundos si el estado es pending
    const interval = setInterval(async () => {
      if (search.order && (search.status === "pending" || order?.status === "pending")) {
        try {
          const data = await getOrderStatus({ data: { orderId: search.order } });
          setOrder(data);
          if (data.status === "paid" || data.status === "failed") {
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error polling orden:", err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [search.order, search.status]);

  const status = order?.status ?? search.status ?? "pending";

  const statusConfig = {
    success: {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/10",
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido confirmado y estamos preparándolo para enviártelo.",
    },
    paid: {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/10",
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido confirmado y estamos preparándolo para enviártelo.",
    },
    failure: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago no procesado",
      description: "Hubo un problema con tu pago. Por favor, intenta nuevamente.",
    },
    failed: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago rechazado",
      description: "El pago fue rechazado. Verifica tus datos e intenta con otro método.",
    },
    cancelled: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago cancelado",
      description: "El pago fue cancelado. Puedes intentar nuevamente cuando quieras.",
    },
    pending: {
      icon: Clock,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10",
      title: "Pago pendiente",
      description: "Estamos procesando tu pago. Te notificaremos por correo cuando se confirme.",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.pending;
  const Icon = config.icon;

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="pt-36 pb-20 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-cream/50" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-36 pb-20">
        <div className="max-w-xl mx-auto px-5 md:px-10 text-center">
          {/* Icon */}
          <Reveal>
            <div className={`w-20 h-20 mx-auto rounded-full ${config.bgColor} flex items-center justify-center mb-6`}>
              <Icon className={`w-10 h-10 ${config.iconColor}`} strokeWidth={1.5} />
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-cream mb-4">
              {config.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.15}>
            <p className="text-cream/60 mb-8">{config.description}</p>
          </Reveal>

          {/* Order details */}
          {order && (
            <Reveal delay={0.2}>
              <div className="border border-border p-6 mb-8 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-5 h-5 text-acid" />
                  <span className="text-[11px] uppercase tracking-[0.25em] text-cream">
                    Detalles del pedido
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cream/60">Número de orden</span>
                    <span className="text-cream font-mono text-xs">{order.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Total pagado</span>
                    <span className="text-cream">{fmtCOP(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Correo de confirmación</span>
                    <span className="text-cream">{order.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Estado</span>
                    <span className={`uppercase text-[10px] tracking-wider ${
                      order.status === "paid" ? "text-green-400" :
                      order.status === "pending" ? "text-amber-400" : "text-red-400"
                    }`}>
                      {order.status === "paid" ? "Pagado" :
                       order.status === "pending" ? "Pendiente" :
                       order.status === "failed" ? "Fallido" : order.status}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* Pending status extra info */}
          {(status === "pending") && (
            <Reveal delay={0.25}>
              <div className="bg-amber-400/5 border border-amber-400/20 p-4 mb-8 text-left">
                <p className="text-xs text-amber-400/80">
                  <strong>¿Pagaste con PSE, Efecty o en puntos de pago?</strong> El pago puede 
                  tardar hasta 2 días hábiles en confirmarse. Te enviaremos un correo cuando 
                  se acredite.
                </p>
              </div>
            </Reveal>
          )}

          {/* Actions */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {(status === "failure" || status === "failed" || status === "cancelled") ? (
                <Link
                  to="/checkout"
                  className="bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Reintentar pago
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  to="/"
                  className="bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Seguir comprando
                  <ArrowRight size={14} />
                </Link>
              )}

              {order && (
                <Link
                  to="/cuenta"
                  className="border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors"
                >
                  Ver mis pedidos
                </Link>
              )}
            </div>
          </Reveal>

          {/* Support */}
          <Reveal delay={0.35}>
            <p className="mt-10 text-[10px] text-cream/40">
              ¿Tienes problemas?{" "}
              <Link to="/contacto" className="text-acid hover:underline">
                Contáctanos
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
