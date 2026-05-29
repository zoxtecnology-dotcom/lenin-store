import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Check, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { fmtCOP, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface Props {
  product: Product;
  delay?: number;
}

export function ProductCard({ product: p, delay = 0 }: Props) {
  const { add, setOpen } = useCart();
  const { toggle, has } = useWishlist();
  const [panelOpen, setPanelOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isConjunto = p.type === "conjunto";
  const wishlisted = has(p.slug);
  const lowStock = p.stock !== undefined && p.stock <= 5;

  function handleSize(size: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ slug: p.slug, name: p.name, price: p.price, image: p.front, size });
    setJustAdded(true);
    setOpen(true);
    setTimeout(() => {
      setJustAdded(false);
      setPanelOpen(false);
    }, 1000);
  }

  function togglePanel(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPanelOpen((v) => !v);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.slug);
  }

  return (
    <Reveal delay={delay}>
      <div className="group relative">

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">

          {/* Tag badge */}
          {p.tag && (
            <span className={cn(
              "absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em]",
              p.tag.startsWith("-") ? "bg-acid text-ink" : "bg-ink text-cream"
            )}>
              {p.tag}
            </span>
          )}

          {/* Stock badge — se oculta cuando el panel de tallas está visible */}
          {lowStock && !panelOpen && (
            <span className="absolute left-3 bottom-3 z-10 bg-background/90 border border-border px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-cream/70 md:group-hover:opacity-0 transition-opacity">
              Solo {p.stock} {p.stock === 1 ? "disponible" : "disponibles"}
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Quitar de guardados" : "Guardar"}
            className={cn(
              "absolute right-3 top-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200",
              wishlisted
                ? "text-acid bg-background/80"
                : "text-cream/0 bg-background/0 group-hover:text-cream/70 group-hover:bg-background/60"
            )}
          >
            <Heart size={15} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
          </button>

          <Link to="/products/$slug" params={{ slug: p.slug }} className="block h-full">
            <img src={p.front} alt={p.name} loading="lazy" width={1024} height={1280}
              className="card-img card-img-front absolute inset-0 h-full w-full object-cover" />
            <img src={p.back} alt="" aria-hidden loading="lazy" width={1024} height={1280}
              className="card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0" />
          </Link>

          {/* Quick-add panel */}
          {!isConjunto && (
            <div className={cn(
              "absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-3 py-3 transition-transform duration-200",
              panelOpen ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
            )}>
              <p className="text-[9px] uppercase tracking-[0.25em] text-cream/40 mb-2">
                {justAdded ? "¡Agregado!" : "Selecciona talla"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSize(size, e)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors border",
                      justAdded
                        ? "border-acid bg-acid text-ink"
                        : "border-border text-cream hover:bg-acid hover:text-ink hover:border-acid"
                    )}
                  >
                    {justAdded ? <Check size={10} strokeWidth={2.5} /> : size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile toggle */}
          {!isConjunto && (
            <button
              onClick={togglePanel}
              aria-label="Compra rápida"
              className={cn(
                "absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200 md:hidden",
                panelOpen ? "bg-acid text-ink rotate-45" : "bg-background/80 text-cream border border-border/60"
              )}
            >
              <Plus size={15} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Name & price */}
        <Link to="/products/$slug" params={{ slug: p.slug }}>
          <div className="mt-4 flex items-start justify-between gap-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-cream">{p.name}</h3>
            <span className="shrink-0 text-xs tabular-nums text-cream/70">{fmtCOP(p.price)}</span>
          </div>
        </Link>
      </div>
    </Reveal>
  );
}
