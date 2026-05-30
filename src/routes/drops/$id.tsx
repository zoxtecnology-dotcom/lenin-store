import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Package } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { fmtCOP } from "@/lib/products";
import { fetchDropBySlug, fetchProductsByDrop } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
const DROP_DISCOUNT = 12;

export const Route = createFileRoute("/drops/$id")({
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.drop ? `${loaderData.drop.name} — ${loaderData.drop.label} — AIAHN STORE` : "Drop — AIAHN STORE" },
      { name: "description", content: loaderData?.drop?.editorialBody ?? "" },
    ],
  }),
  loader: async ({ params }) => {
    const drop = await fetchDropBySlug(params.id);
    if (!drop) throw notFound();
    const dropProducts = await fetchProductsByDrop(drop.id);
    return { drop, dropProducts };
  },
  component: DropDetailPage,
});

function DropDetailPage() {
  const { drop, dropProducts } = Route.useLoaderData();

  const [mode, setMode] = useState<"piezas" | "completo">("piezas");
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const originalTotal = dropProducts.reduce((s, p) => s + p.price, 0);
  const discountedTotal = Math.round(originalTotal * (1 - DROP_DISCOUNT / 100));
  const savings = originalTotal - discountedTotal;

  const allSelected = dropProducts.every(
    (p) => p.sizes.length <= 1 || sizes[p.slug]
  );

  function handleAddDrop() {
    if (!allSelected) return;
    add({
      slug: `drop-${drop.slug}`,
      name: `${drop.name} — ${drop.label}`,
      price: discountedTotal,
      image: dropProducts[0]?.front,
      pieces: dropProducts.map((p) => ({
        name: p.name,
        size: sizes[p.slug] ?? p.sizes[0] ?? "Única",
      })),
    });
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero split */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[70vh]">
          <div className="relative overflow-hidden order-2 md:order-1" style={{ minHeight: "400px" }}>
            <img
              src={drop.editorialImages[0]}
              alt={drop.name}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block" />
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-end pb-12 pt-28 md:pt-36 px-5 md:px-10 lg:px-16">
            <Reveal>
              <Link
                to="/drops"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/40 hover:text-acid transition-colors mb-8"
              >
                <ArrowLeft size={12} strokeWidth={1.5} />
                Todos los drops
              </Link>
            </Reveal>
            <Reveal delay={60}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-3">— Disponible ahora</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-[clamp(4rem,12vw,11rem)] uppercase leading-[0.85] text-cream">
                {drop.name}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="font-serif-i text-2xl text-cream/60 mt-3 mb-6">
                {drop.label} · {drop.season}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.3em] text-cream/35">
                <span>Medellín, Colombia</span>
                <span>{drop.releaseDate ? new Date(drop.releaseDate).toLocaleDateString("es-CO", { month: "long", year: "numeric" }) : ""}</span>
                <span>{dropProducts.length} piezas</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <p className="font-serif-i text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-cream/90">
                  "{drop.editorialQuote}"
                </p>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="text-sm leading-relaxed text-cream/60">{drop.editorialBody}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-14">
              <img src={drop.editorialImages[1]} alt="Editorial" className="w-full aspect-[3/4] object-cover" />
              <img src={drop.editorialImages[2]} alt="Editorial" className="w-full aspect-[3/4] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modo de compra */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">

          {/* Toggle */}
          <Reveal>
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— Cómo quieres llevártelo</p>
              <div className="flex gap-px w-fit">
                <button
                  onClick={() => setMode("piezas")}
                  className={cn(
                    "px-6 py-3 text-[11px] uppercase tracking-[0.25em] border transition-colors",
                    mode === "piezas"
                      ? "bg-cream text-ink border-cream"
                      : "border-border text-cream/50 hover:border-cream/40 hover:text-cream"
                  )}
                >
                  Por piezas
                </button>
                <button
                  onClick={() => setMode("completo")}
                  className={cn(
                    "px-6 py-3 text-[11px] uppercase tracking-[0.25em] border transition-colors flex items-center gap-2",
                    mode === "completo"
                      ? "bg-acid text-ink border-acid"
                      : "border-border text-cream/50 hover:border-cream/40 hover:text-cream"
                  )}
                >
                  Drop completo
                  <span className={cn(
                    "text-[9px] px-1.5 py-0.5 font-medium",
                    mode === "completo" ? "bg-ink/20 text-ink" : "bg-acid/20 text-acid"
                  )}>
                    -{DROP_DISCOUNT}%
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Por piezas: grid de ProductCards */}
          {mode === "piezas" && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {dropProducts.map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 60} />
              ))}
            </div>
          )}

          {/* Drop completo: size selectors + resumen */}
          {mode === "completo" && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

              {/* Selector de tallas */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-6">
                  Selecciona tu talla en cada prenda
                </p>
                {dropProducts.map((p) => (
                  <div key={p.slug} className="border border-border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={p.front} alt={p.name}
                        className="w-12 h-14 object-cover object-top bg-bone shrink-0" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-cream/40">{p.category}</p>
                        <p className="text-sm text-cream font-medium">{p.name}</p>
                        <p className="text-[10px] text-cream/35 line-through">{fmtCOP(p.price)}</p>
                      </div>
                    </div>

                    {p.sizes.length > 1 ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-cream/40">Talla</p>
                          <Link to="/guia-de-tallas"
                            className="text-[9px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1">
                            Guía <ArrowRight size={9} strokeWidth={1.5} />
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSizes((prev) => ({ ...prev, [p.slug]: size }))}
                              className={cn(
                                "px-3 py-2 text-[11px] uppercase tracking-[0.15em] border transition-colors",
                                sizes[p.slug] === size
                                  ? "bg-acid text-ink border-acid"
                                  : "border-border text-cream/70 hover:border-cream/40 hover:text-cream"
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        {sizes[p.slug] && (
                          <p className="mt-2 text-[9px] text-acid uppercase tracking-[0.2em] flex items-center gap-1">
                            <Check size={10} strokeWidth={2} /> Talla {sizes[p.slug]}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Talla única</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Resumen + CTA */}
              <div className="flex flex-col">
                <div className="border border-border p-6 mb-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-cream/35 mb-4">Resumen del drop</p>
                  <div className="space-y-2 mb-4">
                    {dropProducts.map((p) => (
                      <div key={p.slug} className="flex justify-between text-[11px]">
                        <span className="text-cream/55">{p.name}</span>
                        <span className="text-cream/35 line-through">{fmtCOP(p.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-cream/40 uppercase tracking-[0.15em]">Subtotal</span>
                      <span className="text-cream/40 line-through">{fmtCOP(originalTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-acid uppercase tracking-[0.15em]">Descuento -{DROP_DISCOUNT}%</span>
                      <span className="text-acid">-{fmtCOP(savings)}</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-border">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-cream">Total</span>
                      <span className="font-display text-2xl text-cream">{fmtCOP(discountedTotal)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddDrop}
                  disabled={!allSelected}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all",
                    allSelected
                      ? "bg-acid text-ink hover:opacity-90"
                      : "bg-border text-cream/30 cursor-not-allowed"
                  )}
                >
                  {added ? (
                    <><Check size={14} strokeWidth={2} /> ¡Drop agregado!</>
                  ) : (
                    <><Package size={14} strokeWidth={1.5} />
                      {allSelected ? `Agregar drop completo — ${fmtCOP(discountedTotal)}` : "Selecciona todas las tallas"}</>
                  )}
                </button>

                {!allSelected && (
                  <p className="mt-3 text-[10px] text-cream/35 text-center uppercase tracking-[0.2em]">
                    Falta seleccionar talla en {dropProducts.filter((p) => p.sizes.length > 1 && !sizes[p.slug]).length} prenda{dropProducts.filter((p) => p.sizes.length > 1 && !sizes[p.slug]).length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
