import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, ArrowRight } from "lucide-react";
import { products, fmtCOP } from "@/lib/products";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 0
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.drop.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const popular = products.slice(0, 4);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-background border-b border-border w-full">
        {/* Input row */}
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="flex items-center gap-4 py-5 border-b border-border">
            <Search size={18} strokeWidth={1.5} className="text-cream/40 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent text-base text-cream placeholder:text-cream/30 focus:outline-none"
            />
            <button
              onClick={onClose}
              aria-label="Cerrar búsqueda"
              className="text-cream/40 hover:text-cream transition-colors shrink-0"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Results */}
          <div className="py-6 pb-8">
            {query.trim().length === 0 ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-5">
                  Productos populares
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {popular.map((p) => (
                    <ProductCard key={p.slug} product={p} onClose={onClose} />
                  ))}
                </div>
              </>
            ) : results.length > 0 ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-5">
                  {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {results.map((p) => (
                    <ProductCard key={p.slug} product={p} onClose={onClose} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-10 text-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-cream/30">
                  Sin resultados para "{query}"
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/20">
                  Intenta con otra palabra
                </p>
              </div>
            )}

            {/* Quick category links */}
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
              <p className="w-full text-[10px] uppercase tracking-[0.35em] text-cream/30 mb-2">
                Categorías
              </p>
              {["Camisetas", "Busos", "Conjuntos", "Pantalonetas", "Pantalones", "Gorras"].map((cat) => (
                <Link
                  key={cat}
                  to="/collections/$handle"
                  params={{ handle: cat.toLowerCase() }}
                  onClick={onClose}
                  className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-cream/50 hover:text-cream hover:border-cream transition-colors"
                >
                  {cat}
                  <ArrowRight size={9} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClose }: { product: typeof products[0]; onClose: () => void }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      onClick={onClose}
      className="group block"
    >
      <div className="aspect-[4/5] overflow-hidden bg-bone relative">
        <img
          src={product.front}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <p className="text-[10px] uppercase tracking-[0.18em] text-cream leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="mt-0.5 text-[10px] tabular-nums text-cream/50">
          {fmtCOP(product.price)}
        </p>
      </div>
    </Link>
  );
}
