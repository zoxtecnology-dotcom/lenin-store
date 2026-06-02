import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { pageTitle } from "@/lib/brand";
import { supabase } from "@/lib/supabase";
import { fmtCOP } from "@/lib/products";
import {
  CheckCircle,
  Clock,
  XCircle,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/pedido-confirmado")({
  head: () => ({
    meta: [{ title: pageTitle("Confirmación de pedido") }],
  }),
  component: CheckoutResultPage,
});

type Order = {
  id: string;
  user_id?: string;
  status: string;
  total: number;
  email: string;
  address: string;
  city: string;
  phone: string;
  items: Array<{
    slug?: string;
    name: string;
    size: string;
    color: string;
    qty: number;
    price: number;
    image?: string;
  }>;
  created_at: string;
};

function CheckoutResultPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "failed" | "pending">(
    "pending"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const orderId =
      urlParams.get("order") || urlParams.get("external_reference");

    // Determine status from URL
    const collectionStatus = urlParams.get("collection_status");
    const urlStatus = urlParams.get("status");
    
    const isSuccess = collectionStatus === "approved" || urlStatus === "success";

    if (isSuccess) {
      setStatus("success");
      // Clear cart only - wishlist will be cleared after we know the items
      localStorage.removeItem("aiahn-cart");
      window.dispatchEvent(new Event("storage"));
    } else if (collectionStatus === "rejected") {
      setStatus("failed");
    }

    // Fetch order and clear purchased items from wishlist
    if (orderId) {
      supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single()
        .then(async ({ data, error }) => {
          if (!error && data) {
            console.log("Order data:", data);
            console.log("Order items:", data.items);
            setOrder(data as Order);
            if (data.status === "paid") setStatus("success");
            if (data.status === "failed" || data.status === "cancelled")
              setStatus("failed");
            
            // Remove only purchased items from wishlist
            const purchasedSlugs = (data.items || []).map((item: { slug?: string }) => item.slug).filter(Boolean);
            console.log("Purchased slugs:", purchasedSlugs);
            
            if (purchasedSlugs.length > 0 && isSuccess) {
              // Remove from localStorage wishlist
              try {
                const localWishlist = JSON.parse(localStorage.getItem("aiahn-wishlist") || "[]") as string[];
                console.log("Local wishlist before:", localWishlist);
                const filtered = localWishlist.filter(id => !purchasedSlugs.includes(id));
                console.log("Local wishlist after:", filtered);
                localStorage.setItem("aiahn-wishlist", JSON.stringify(filtered));
                window.dispatchEvent(new Event("storage"));
              } catch {}
              
              // Remove from DB wishlist for logged in user
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                console.log("Removing purchased items from wishlist:", purchasedSlugs);
                await supabase
                  .from("wishlist")
                  .delete()
                  .eq("user_id", user.id)
                  .in("product_id", purchasedSlugs);
              }
            }
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/10",
      title: "¡Compra exitosa!",
      description:
        "Tu pedido ha sido confirmado. Te enviaremos un correo con los detalles del envío.",
    },
    failed: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10",
      title: "Pago no procesado",
      description: "Hubo un problema con tu pago. Por favor, intenta nuevamente.",
    },
    pending: {
      icon: Clock,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10",
      title: "Pago en proceso",
      description:
        "Estamos verificando tu pago. Te notificaremos por correo cuando se confirme.",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-36 pb-20">
        <div className="max-w-2xl mx-auto px-5 md:px-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-cream/50" />
            </div>
          ) : (
            <>
              {/* Status header */}
              <div className="text-center mb-10">
                <div
                  className={
                    "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 " +
                    config.bgColor
                  }
                >
                  <Icon
                    className={"w-10 h-10 " + config.iconColor}
                    strokeWidth={1.5}
                  />
                </div>
                <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-cream mb-4">
                  {config.title}
                </h1>
                <p className="text-cream/60">{config.description}</p>
              </div>

              {/* Order details */}
              {order && (
                <div className="border border-border mb-8">
                  {/* Header */}
                  <div className="border-b border-border p-4 flex items-center gap-3">
                    <Package className="w-5 h-5 text-acid" />
                    <span className="text-[11px] uppercase tracking-[0.25em] text-cream">
                      Resumen del pedido
                    </span>
                  </div>

                  {/* Items */}
                  <div className="p-4 space-y-4">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover bg-zinc-900"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-cream text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-cream/50 text-xs mt-1">
                            Talla: {item.size} · Color: {item.color} · Cant:{" "}
                            {item.qty}
                          </p>
                          <p className="text-cream text-sm mt-2">
                            {fmtCOP(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping info */}
                  <div className="border-t border-border p-4">
                    <p className="text-[10px] uppercase tracking-wider text-cream/50 mb-2">
                      Enviar a:
                    </p>
                    <p className="text-cream text-sm">{order.address}</p>
                    <p className="text-cream/60 text-sm">{order.city}</p>
                    <p className="text-cream/60 text-sm">{order.phone}</p>
                  </div>

                  {/* Total */}
                  <div className="border-t border-border p-4 flex justify-between items-center">
                    <span className="text-cream/60">Total pagado</span>
                    <span className="text-cream text-lg font-medium">
                      {fmtCOP(order.total)}
                    </span>
                  </div>

                  {/* Order ID */}
                  <div className="border-t border-border p-4 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-cream/50">
                      Número de orden
                    </p>
                    <p className="text-cream font-mono text-xs mt-1">
                      {order.id}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cuenta/pedidos"
                  className="inline-flex items-center justify-center gap-2 border border-cream/20 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-cream hover:bg-cream/5 transition-colors"
                >
                  Ver mis pedidos
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-acid text-background px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-acid/90 transition-colors"
                >
                  Seguir comprando
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
