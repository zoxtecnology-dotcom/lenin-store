import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useWishlist } from "@/lib/wishlist";
import { fetchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: pageTitle("Guardados") }],
  }),
  loader: async () => ({ products: await fetchProducts() }),
  component: WishlistPage,
});

function WishlistPage() {
  const { products } = Route.useLoaderData();
  const { items } = useWishlist();
  const saved = products.filter((p) => items.includes(p.slug));

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Tu lista</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream">
              Guardados
            </h1>
          </Reveal>
          {saved.length > 0 && (
            <Reveal delay={150}>
              <p className="mt-4 text-sm text-cream/40">{saved.length} {saved.length === 1 ? "producto" : "productos"}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {saved.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Heart size={40} strokeWidth={1} className="text-cream/20 mb-6" />
                <p className="font-display text-2xl uppercase text-cream/30 mb-4">Nada guardado aún</p>
                <p className="text-sm text-cream/40 mb-8 max-w-xs">
                  Guarda las prendas que te interesan para no perderlas cuando se acabe el drop.
                </p>
                <Link
                  to="/collections/$handle"
                  params={{ handle: "nuevo" }}
                  className="bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
                >
                  Ver colección
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
              {saved.map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
