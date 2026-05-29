import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Package, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { fmtCOP } from "@/lib/products";
import { getPackById, PACKS } from "@/lib/packs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packs/$id")({
  head: ({ params }) => {
    const pack = getPackById(params.id);
    return {
      meta: [
        { title: pack ? `${pack.name} — AIAHN STORE` : "Pack — AIAHN STORE" },
      ],
    };
  },
  component: PackDetailPage,
});

function PackDetailPage() {
  const { id } = Route.useParams();
  const pack = getPackById(id);
  if (!pack) throw notFound();

  const { add, setOpen } = useCart();
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const originalTotal = pack.items.reduce((s, i) => s + i.product.price, 0);
  const discountedTotal = Math.round(originalTotal * (1 - pack.discount / 100));
  const savings = originalTotal - discountedTotal;

  const allImages = pack.items.flatMap((i) => i.product.images.slice(0, 2));
  const allSelected = pack.items.every(({ product }) =>
    product.sizes.length <= 1 || sizes[product.slug]
  );

  function handleAdd() {
    if (!allSelected) return;
    add({
      slug: `pack-${pack.id}`,
      name: pack.name,
      price: discountedTotal,
      image: pack.items[0].product.front,
      pieces: pack.items.map(({ product }) => ({
        name: product.name,
        size: sizes[product.slug] ?? product.sizes[0] ?? "Única",
      })),
    });
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      <div className="mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-36">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40 mb-8">
          <Link to="/" className="hover:text-cream transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/packs" className="hover:text-cream transition-colors">Packs</Link>
          <span>/</span>
          <span className="text-cream/80">{pack.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Galería */}
          <div className="flex flex-col gap-3">
            <div className="aspect-[4/5] overflow-hidden bg-bone">
              <img src={allImages[activeImg] ?? pack.items[0].product.front}
                alt={pack.name}
                className="h-full w-full object-cover object-top transition-opacity duration-300" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {allImages.slice(0, 8).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-bone border-b-2 transition-colors ${activeImg === i ? "border-cream" : "border-transparent"}`}>
                  <img src={img} alt="" className="h-full w-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] text-acid mb-3">{pack.tag}</p>
              <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-4">
                {pack.name}
              </h1>

              {/* Precio */}
              <div className="flex items-baseline gap-4 mb-2">
                <p className="font-display text-3xl text-cream">{fmtCOP(discountedTotal)}</p>
                <p className="text-base text-cream/35 line-through">{fmtCOP(originalTotal)}</p>
                <span className="bg-acid text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium">
                  -{pack.discount}%
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-acid mb-6">
                Ahorras {fmtCOP(savings)}
              </p>

              <p className="text-sm leading-relaxed text-cream/60 mb-8">{pack.description}</p>
            </Reveal>

            {/* Selector de tallas por producto */}
            <div className="space-y-6 mb-8">
              {pack.items.map(({ product }) => (
                <Reveal key={product.slug}>
                  <div className="border border-border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={product.front} alt={product.name}
                        className="w-12 h-14 object-cover object-top bg-bone shrink-0" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-cream/40">{product.category}</p>
                        <p className="text-sm text-cream font-medium">{product.name}</p>
                        <p className="text-[10px] text-cream/35 line-through">{fmtCOP(product.price)}</p>
                      </div>
                    </div>

                    {product.sizes.length > 1 ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-cream/40">Talla</p>
                          <Link to="/guia-de-tallas"
                            className="text-[9px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1">
                            Guía de tallas <ArrowRight size={9} strokeWidth={1.5} />
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button key={size}
                              onClick={() => setSizes((prev) => ({ ...prev, [product.slug]: size }))}
                              className={cn(
                                "px-3 py-2 text-[11px] uppercase tracking-[0.15em] border transition-colors",
                                sizes[product.slug] === size
                                  ? "bg-acid text-ink border-acid"
                                  : "border-border text-cream/70 hover:border-cream/40 hover:text-cream"
                              )}>
                              {size}
                            </button>
                          ))}
                        </div>
                        {sizes[product.slug] && (
                          <p className="mt-2 text-[9px] text-acid uppercase tracking-[0.2em] flex items-center gap-1">
                            <Check size={10} strokeWidth={2} /> Talla {sizes[product.slug]}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Talla única</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal>
              <button
                onClick={handleAdd}
                disabled={!allSelected}
                className={cn(
                  "w-full flex items-center justify-center gap-3 py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all",
                  allSelected
                    ? "bg-acid text-ink hover:opacity-90"
                    : "bg-border text-cream/30 cursor-not-allowed"
                )}
              >
                {added ? (
                  <><Check size={14} strokeWidth={2} /> ¡Pack agregado!</>
                ) : (
                  <><Package size={14} strokeWidth={1.5} />
                    {allSelected ? "Agregar pack al carrito" : "Selecciona todas las tallas"}</>
                )}
              </button>
            </Reveal>

            {/* Desglose */}
            <Reveal delay={60}>
              <div className="mt-6 border-t border-border pt-5 space-y-2">
                <p className="text-[9px] uppercase tracking-[0.3em] text-cream/35 mb-3">Incluye</p>
                {pack.items.map(({ product }) => (
                  <div key={product.slug} className="flex justify-between text-[11px]">
                    <span className="text-cream/55">{product.name}</span>
                    <span className="text-cream/35 line-through">{fmtCOP(product.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[11px] border-t border-border pt-2 mt-2">
                  <span className="text-acid uppercase tracking-[0.15em]">Total pack ({pack.discount}% off)</span>
                  <span className="text-cream font-medium">{fmtCOP(discountedTotal)}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Otros packs */}
        {PACKS.filter((p) => p.id !== pack.id).length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-8">— Otros packs</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {PACKS.filter((p) => p.id !== pack.id).map((p) => {
                const orig = p.items.reduce((s, i) => s + i.product.price, 0);
                const final = Math.round(orig * (1 - p.discount / 100));
                return (
                  <Link key={p.id} to="/packs/$id" params={{ id: p.id }}
                    className="group border border-border hover:border-cream/30 transition-colors">
                    <div className="relative h-40 flex gap-px bg-border overflow-hidden">
                      <span className="absolute top-2 right-2 z-10 bg-acid text-ink text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 font-medium">
                        -{p.discount}%
                      </span>
                      {p.items.map(({ product }) => (
                        <div key={product.slug} className="flex-1 overflow-hidden bg-bone">
                          <img src={product.front} alt=""
                            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                    <div className="p-3">
                      <p className="font-display text-sm uppercase text-cream mb-1">{p.name}</p>
                      <p className="text-[11px] text-cream/50">{fmtCOP(final)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
