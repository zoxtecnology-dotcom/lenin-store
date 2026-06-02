import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCart, type CartItem } from "@/lib/cart";
import { fmtCOP } from "@/lib/products";
import { Minus, Plus, Trash2, X, ArrowRight, ChevronDown, MessageCircle, CreditCard } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/lib/settings";
import { Link } from "@tanstack/react-router";

function buildWhatsAppLink(items: CartItem[], total: number, whatsappUrl: string) {
  const lines = items.map((item) => {
    const base = `• ${item.name}${item.size ? ` — Talla ${item.size}` : ""}${item.color ? ` / ${item.color}` : ""} x${item.qty} = ${fmtCOP(item.price * item.qty)}`;
    if (item.pieces?.length) {
      const pieces = item.pieces.map((p) => `   ↳ ${p.name} — Talla ${p.size}`).join("\n");
      return `${base}\n${pieces}`;
    }
    return base;
  });

  const message = [
    "¡Hola AIAHN! 👋 Quiero hacer el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total: ${fmtCOP(total)}`,
    "",
    "¿Pueden confirmarme disponibilidad y método de pago? Gracias 🙏",
  ].join("\n");

  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function CartDrawer() {
  const { items, remove, updateQty, total, count, open, setOpen, freeShippingThreshold, amountToFreeShipping } = useCart();
  const { whatsappUrl } = useSettings();
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  const shippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="bg-background text-foreground flex flex-col p-0 w-full max-w-[420px] border-l border-border"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border shrink-0">
          <SheetTitle className="font-display text-lg uppercase tracking-[0.15em] text-cream">
            Tu carrito <span className="text-acid">({count})</span>
          </SheetTitle>
          <SheetClose className="text-cream/50 hover:text-cream transition-colors">
            <X size={18} strokeWidth={1.5} />
          </SheetClose>
        </SheetHeader>

        {/* Free shipping progress */}
        <div className="px-6 py-4 border-b border-border shrink-0">
          {amountToFreeShipping === 0 ? (
            <p className="text-[11px] uppercase tracking-[0.25em] text-acid">¡Tienes envío gratis!</p>
          ) : (
            <p className="text-[11px] uppercase tracking-[0.22em] text-cream/70">
              Te faltan <span className="text-cream font-medium">{fmtCOP(amountToFreeShipping)}</span> para envío gratis
            </p>
          )}
          <div className="mt-3 h-px bg-border">
            <div className="h-px bg-acid transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <p className="text-sm text-cream/40 uppercase tracking-widest pt-8 text-center">Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.slug} className="flex gap-4">
                {/* Image */}
                <div className="shrink-0 w-20 h-24 bg-bone overflow-hidden">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream leading-snug">
                          {item.name}
                        </p>
                        {item.conjuntoMode === "completo" && (
                          <span className="shrink-0 bg-acid text-ink text-[8px] px-1.5 py-0.5 uppercase tracking-[0.15em] font-medium">
                            Conjunto
                          </span>
                        )}
                      </div>
                      {(item.size || item.color) && (
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-cream/50">
                          {[item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {/* Conjunto pieces */}
                      {item.pieces && item.pieces.length > 0 && (
                        <div className="mt-1.5 space-y-0.5">
                          {item.pieces.map((piece, i) => (
                            <p key={i} className="text-[9px] uppercase tracking-[0.15em] text-cream/40">
                              ↳ {piece.name} — Talla {piece.size}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={() => remove(item.slug)} aria-label="Eliminar"
                      className="text-cream/30 hover:text-cream transition-colors shrink-0">
                      <Trash2 size={13} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 border border-border px-3 py-1">
                      <button onClick={() => updateQty(item.slug, item.qty - 1)} aria-label="Reducir cantidad"
                        className="text-cream/50 hover:text-cream transition-colors">
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="text-xs tabular-nums text-cream w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.slug, item.qty + 1)} aria-label="Aumentar cantidad"
                        className="text-cream/50 hover:text-cream transition-colors">
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="text-sm tabular-nums text-cream">{fmtCOP(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon */}
        <div className="px-6 py-3 border-t border-border shrink-0">
          <button
            onClick={() => setCouponOpen((v) => !v)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/60 hover:text-cream transition-colors"
          >
            ¿Tienes un código?
            <ChevronDown size={13} strokeWidth={1.5}
              className={`transition-transform duration-200 ${couponOpen ? "rotate-180" : ""}`} />
          </button>
          {couponOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="CÓDIGO"
                className="flex-1 bg-transparent border-b border-border text-xs uppercase tracking-widest text-cream placeholder:text-cream/30 py-1.5 focus:outline-none focus:border-cream"
              />
              <button className="text-[10px] uppercase tracking-widest text-acid hover:opacity-70 transition-opacity">
                Aplicar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 pt-4 pb-6 border-t border-border shrink-0 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Subtotal</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mt-0.5">
                  Envío e impuestos calculados al pagar
                </p>
              </div>
              <span className="font-display text-2xl text-acid tabular-nums">{fmtCOP(total)}</span>
            </div>

            {/* Botón principal - Checkout con MercadoPago */}
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-3 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
            >
              <CreditCard size={16} strokeWidth={1.5} />
              Pagar ahora
            </Link>

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
