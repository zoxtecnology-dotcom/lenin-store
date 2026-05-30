import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Heart, Plus, X, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { fmtCOP, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface Props {
  product: Product;
  delay?: number;
  /** Desactiva el swipe de imágenes (para carruseles horizontales donde pelea con el scroll) */
  noTouchSwipe?: boolean;
}

export function ProductCard({ product: p, delay = 0, noTouchSwipe = false }: Props) {
  const { add, setOpen } = useCart();
  const { toggle, has } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(p.colors[0]?.name ?? "");

  // Bottom sheet móvil
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSize, setSheetSize] = useState<string | null>(null);

  const isConjunto = p.type === "conjunto";
  const wishlisted = has(p.slug);
  const totalStock = p.stock ?? 0;
  const isAgotado = totalStock === 0;

  const allImages = [p.front, p.back, ...p.images.slice(2)].filter(Boolean).slice(0, 3);
  const [hoverImg, setHoverImg] = useState(0);

  // Touch: detecta dirección del gesto para no pelear con el scroll
  const touchRef = useRef<{ x: number; y: number; lock: "h" | "v" | null }>({ x: 0, y: 0, lock: null });

  function imgFromX(clientX: number, rect: DOMRect) {
    if (allImages.length <= 1) return 0;
    const x = (clientX - rect.left) / rect.width;
    return Math.min(Math.max(Math.floor(x * allImages.length), 0), allImages.length - 1);
  }
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, lock: null };
  }
  function onTouchMove(e: React.TouchEvent) {
    if (allImages.length <= 1) return;
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (!touchRef.current.lock && Math.abs(dx) + Math.abs(dy) > 8) {
      touchRef.current.lock = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
    }
    if (touchRef.current.lock === "h") {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverImg(imgFromX(t.clientX, rect));
    }
  }
  function onTouchEnd() {
    touchRef.current.lock = null;
    setHoverImg(0);
  }

  const discountPct = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : null;

  function stockForVariant(color: string, size: string) {
    if (!p.variants || p.variants.length === 0) return 99;
    return p.variants
      .filter((v) => v.color_name === color && v.size === size && v.piece === null)
      .reduce((sum, v) => sum + v.stock, 0);
  }

  // Desktop hover: añadir directo al clic en la talla
  function handleSize(size: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (stockForVariant(selectedColor, size) === 0) return;
    add({ slug: p.slug, name: p.name, price: p.price, image: p.front, size, color: selectedColor });
    setJustAdded(true);
    setOpen(true);
    setTimeout(() => setJustAdded(false), 1000);
  }

  // Móvil: agregar desde el bottom sheet
  function addFromSheet() {
    if (!sheetSize) return;
    add({ slug: p.slug, name: p.name, price: p.price, image: p.front, size: sheetSize, color: selectedColor });
    setSheetOpen(false);
    setSheetSize(null);
    setOpen(true); // abre el carrito
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.slug);
  }

  function openSheet(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSheetOpen(true);
  }

  return (
    <Reveal delay={delay}>
      <div className="group relative">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">

          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {discountPct && (
              <span className="bg-acid text-ink px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em]">
                -{discountPct}%
              </span>
            )}
            {isAgotado && (
              <span className="bg-background/90 border border-border text-cream/60 px-2 py-1 text-[9px] uppercase tracking-[0.2em]">
                Agotado
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Quitar de guardados" : "Guardar"}
            className={cn(
              "absolute right-3 top-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200",
              wishlisted
                ? "text-acid bg-background/80"
                : "text-cream/60 bg-background/60 md:text-cream/0 md:bg-background/0 md:group-hover:text-cream/70 md:group-hover:bg-background/60"
            )}
          >
            <Heart size={15} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
          </button>

          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="block h-full"
            onMouseMove={(e) => {
              if (allImages.length <= 1) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              setHoverImg(Math.min(Math.floor(x * allImages.length), allImages.length - 1));
            }}
            onMouseLeave={() => setHoverImg(0)}
            onTouchStart={noTouchSwipe ? undefined : onTouchStart}
            onTouchMove={noTouchSwipe ? undefined : onTouchMove}
            onTouchEnd={noTouchSwipe ? undefined : onTouchEnd}
          >
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={i === 0 ? p.name : ""}
                aria-hidden={i > 0}
                loading="lazy"
                width={1024}
                height={1280}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  isAgotado && i === 0 && "opacity-50",
                  hoverImg === i ? "opacity-100" : i === 0 && hoverImg === 0 ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </Link>

          {/* Quick-add panel — solo desktop (hover) */}
          {!isConjunto && !isAgotado && (
            <div className="hidden md:block absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-3 py-3 transition-transform duration-200 translate-y-full group-hover:translate-y-0">
              {p.colors.length > 1 && (
                <div className="flex gap-1.5 mb-2">
                  {p.colors.map((c) => {
                    const colorStock = p.sizes.reduce((sum, s) => sum + stockForVariant(c.name, s), 0);
                    return (
                      <button
                        key={c.name}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(c.name); }}
                        disabled={colorStock === 0}
                        title={colorStock === 0 ? `${c.name} — agotado` : c.name}
                        className={cn(
                          "w-5 h-5 border-2 rounded-full transition-all",
                          selectedColor === c.name ? "border-cream scale-110" : "border-transparent",
                          colorStock === 0 && "opacity-30 cursor-not-allowed"
                        )}
                        style={{ backgroundColor: c.swatch }}
                      />
                    );
                  })}
                </div>
              )}
              <p className="text-[9px] uppercase tracking-[0.25em] text-cream/40 mb-2">
                {justAdded ? "¡Agregado!" : "Selecciona talla"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.sizes.map((size) => {
                  const stock = stockForVariant(selectedColor, size);
                  const outOfStock = stock === 0;
                  return (
                    <button
                      key={size}
                      onClick={(e) => handleSize(size, e)}
                      disabled={outOfStock}
                      className={cn(
                        "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors border relative",
                        justAdded && !outOfStock
                          ? "border-acid bg-acid text-ink"
                          : outOfStock
                          ? "border-border/30 text-cream/20 cursor-not-allowed line-through"
                          : "border-border text-cream hover:bg-acid hover:text-ink hover:border-acid"
                      )}
                    >
                      {justAdded && !outOfStock ? <Check size={10} strokeWidth={2.5} /> : size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botón + (solo móvil) */}
          {!isConjunto && !isAgotado && (
            <button
              onClick={openSheet}
              aria-label="Compra rápida"
              className="md:hidden absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-cream text-ink rounded-full shadow-lg active:scale-90 transition-transform"
            >
              <Plus size={18} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Name & price */}
        <Link to="/products/$slug" params={{ slug: p.slug }}>
          <div className="mt-4 flex items-start justify-between gap-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-cream">{p.name}</h3>
            <div className="shrink-0 text-right">
              <span className="text-xs tabular-nums text-cream/70">{fmtCOP(p.price)}</span>
              {p.compareAtPrice && (
                <span className="block text-[10px] tabular-nums text-cream/30 line-through">
                  {fmtCOP(p.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom sheet móvil */}
      {sheetOpen && (
        <div className="md:hidden fixed inset-0 z-[100]" onClick={() => setSheetOpen(false)}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 inset-x-0 bg-background border-t border-border p-5 pb-8 animate-in slide-in-from-bottom duration-300"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-5">
              <img src={p.front} alt={p.name} className="w-16 h-20 object-cover bg-bone shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs uppercase tracking-[0.18em] text-cream">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-cream">{fmtCOP(p.price)}</span>
                  {p.compareAtPrice && (
                    <span className="text-[11px] text-cream/30 line-through">{fmtCOP(p.compareAtPrice)}</span>
                  )}
                </div>
              </div>
              <button onClick={() => setSheetOpen(false)} className="text-cream/40 hover:text-cream">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Color */}
            {p.colors.length > 1 && (
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2">Color — {selectedColor}</p>
                <div className="flex gap-2">
                  {p.colors.map((c) => {
                    const colorStock = p.sizes.reduce((sum, s) => sum + stockForVariant(c.name, s), 0);
                    return (
                      <button
                        key={c.name}
                        onClick={() => { setSelectedColor(c.name); setSheetSize(null); }}
                        disabled={colorStock === 0}
                        className={cn(
                          "w-8 h-8 border-2 rounded-full transition-all",
                          selectedColor === c.name ? "border-cream scale-110" : "border-transparent",
                          colorStock === 0 && "opacity-30 cursor-not-allowed"
                        )}
                        style={{ backgroundColor: c.swatch }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tallas */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2">Talla</p>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((size) => {
                  const stock = stockForVariant(selectedColor, size);
                  const out = stock === 0;
                  return (
                    <button
                      key={size}
                      onClick={() => !out && setSheetSize(size)}
                      disabled={out}
                      className={cn(
                        "min-w-[48px] px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] border transition-colors",
                        sheetSize === size ? "bg-cream text-ink border-cream"
                          : out ? "border-border/30 text-cream/20 line-through cursor-not-allowed"
                          : "border-border text-cream"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={addFromSheet}
                disabled={!sheetSize}
                className="w-full flex items-center justify-center gap-2 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium disabled:opacity-40 transition-opacity"
              >
                <Zap size={14} strokeWidth={2} /> Comprar ahora
              </button>
              <button
                onClick={addFromSheet}
                disabled={!sheetSize}
                className="w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium disabled:opacity-40 transition-opacity"
              >
                <ShoppingBag size={14} strokeWidth={1.5} /> Agregar al carrito
              </button>
              {!sheetSize && (
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-cream/30 mt-1">Selecciona una talla</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}
