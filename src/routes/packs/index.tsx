import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { fmtCOP } from "@/lib/products";
import { PACKS, type Pack } from "@/lib/packs";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/packs/")({
  head: () => ({
    meta: [
      { title: pageTitle("Packs") },
      { name: "description", content: "Packs AIAHN — combina prendas y ahorra. Más look, mejor precio." },
    ],
  }),
  component: PacksPage,
});

function PackCard({ pack }: { pack: Pack }) {
  const original = pack.items.reduce((s, i) => s + i.product.price, 0);
  const final = Math.round(original * (1 - pack.discount / 100));

  return (
    <Link to="/packs/$id" params={{ id: pack.id }} className="group block border border-border hover:border-cream/30 transition-colors h-full flex flex-col">
      <div className="relative h-64 flex gap-px bg-border overflow-hidden">
        <span className="absolute top-3 right-3 z-10 bg-acid text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-1 font-medium">
          -{pack.discount}%
        </span>
        {pack.items.map(({ product }) => (
          <div key={product.slug} className="flex-1 overflow-hidden bg-bone">
            <img src={product.front} alt={product.name}
              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s]" />
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-[9px] uppercase tracking-[0.3em] text-acid mb-1">{pack.tag}</p>
        <h3 className="font-display text-xl uppercase text-cream mb-3">{pack.name}</h3>
        <p className="text-sm text-cream/50 leading-relaxed mb-4 line-clamp-2">{pack.description}</p>

        <ul className="space-y-1.5 mb-5 border-t border-border pt-4">
          {pack.items.map(({ product }) => (
            <li key={product.slug} className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.12em] text-cream/50 truncate">{product.name}</span>
              <span className="text-[10px] text-cream/30 line-through shrink-0">{fmtCOP(product.price)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto">
          <p className="font-display text-2xl text-cream">{fmtCOP(final)}</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-acid">-{fmtCOP(original - final)}</p>
        </div>
      </div>
    </Link>
  );
}

function PacksPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Mejor precio</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream">
              Packs
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Combina prendas y ahorra hasta un 15%. Elige tu pack, selecciona las tallas y listo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PACKS.map((pack, i) => (
              <Reveal key={pack.id} delay={i * 80}>
                <PackCard pack={pack} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
