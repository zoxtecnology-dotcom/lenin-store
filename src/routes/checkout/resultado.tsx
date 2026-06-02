import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { pageTitle } from "@/lib/brand";
import { CheckCircle, Clock, ArrowRight, Loader2 } from "lucide-react";

export const Route = createFileRoute("/checkout/resultado")({
  head: () => ({
    meta: [{ title: pageTitle("Resultado del pago") }],
  }),
  component: CheckoutResultPage,
});

function CheckoutResultPage() {
  const [mounted, setMounted] = useState(false);
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const p: Record<string, string> = {};
      urlParams.forEach((value, key) => {
        p[key] = value;
      });
      setParams(p);

      // Limpiar carrito si es exitoso
      if (p.collection_status === "approved" || p.status === "success") {
        localStorage.removeItem("aiahn-cart");
      }
    }
  }, []);

  const isSuccess =
    params.collection_status === "approved" || params.status === "success";

  if (!mounted) {
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
          <div
            className={`w-20 h-20 mx-auto rounded-full ${isSuccess ? "bg-green-400/10" : "bg-amber-400/10"} flex items-center justify-center mb-6`}
          >
            {isSuccess ? (
              <CheckCircle
                className="w-10 h-10 text-green-400"
                strokeWidth={1.5}
              />
            ) : (
              <Clock className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-cream mb-4">
            {isSuccess ? "¡Pago exitoso!" : "Procesando pago"}
          </h1>

          {/* Description */}
          <p className="text-cream/60 mb-8">
            {isSuccess
              ? "Tu pedido ha sido confirmado y estamos preparándolo para enviártelo."
              : "Estamos procesando tu pago. Te notificaremos cuando se confirme."}
          </p>

          {/* Order ID */}
          {(params.order || params.external_reference) && (
            <div className="border border-border p-4 mb-8">
              <p className="text-sm text-cream/60">Número de orden:</p>
              <p className="text-cream font-mono text-xs">
                {params.order || params.external_reference}
              </p>
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
              Volver a la tienda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
