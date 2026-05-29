import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { products, fmtCOP } from "@/lib/products";
import { pageTitle } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: pageTitle("Packs") },
      { name: "description", content: "Packs AIAHN — combina prendas y ahorra. Más look, mejor precio." },
    ],
  }),
  component: PacksPage,
});

const camisetaBox   = products.find((p) => p.slug === "camiseta-box-distressed")!;
const camisetaEss   = products.find((p) => p.slug === "camiseta-essentials")!;
const hoodie        = products.find((p) => p.slug === "buso-oversize-negro")!;
const hoodieAcid    = products.find((p) => p.slug === "buso-acid")!;
const pantaloneta   = products.find((p) => p.slug === "pantaloneta-cargo")!;
const pantalon      = products.find((p) => p.slug === "pantalon-wide")!;
const gorra         = products.find((p) => p.slug === "gorra-snapback")!;

interface PackItem { product: typeof camisetaBox; size?: string }

interface Pack {
  id: string;
  name: string;
  tag: string;
  discount: number;
  items: PackItem[];
  description: string;
}

const PACKS: Pack[] = [
  {
    id: "pack-esencial",
    name: "Pack Esencial",
    tag: "Más popular",
    discount: 10,
    items: [{ product: camisetaEss }, { product: gorra }],
    description: "El punto de partida. Camiseta oversize + gorra snapback. El look base de AIAHN.",
  },
  {
    id: "pack-callejero",
    name: "Pack Callejero",
    tag: "Ahorro real",
    discount: 12,
    items: [{ product: hoodie }, { product: pantaloneta }],
    description: "Hoodie oversize + pantaloneta cargo. Hecho para la calle, aguanta el día completo.",
  },
  {
    id: "pack-completo",
    name: "Pack Completo",
    tag: "Mejor precio",
    discount: 15,
    items: [{ product: hoodie }, { product: pantalon }, { product: gorra }],
    description: "El outfit completo. Hoodie + pantalón wide leg + gorra. Tres piezas, un solo look.",
  },
  {
    id: "pack-distressed",
    name: "Pack Distressed",
    tag: "Edición limitada",
    discount: 10,
    items: [{ product: camisetaBox }, { product: hoodieAcid }],
    description: "Las dos piezas con tratamiento especial. Box distressed + hoodie acid drop. No se repiten.",
  },
];

function PackCard({ pack }: { pack: Pack }) {
  const { add, setOpen } = useCart();
  const originalTotal = pack.items.reduce((s, i) => s + i.product.price, 0);
  const discountedTotal = Math.round(originalTotal * (1 - pack.discount / 100));
  const savings = originalTotal - discountedTotal;

  function addPack() {
    pack.items.forEach(({ product }) => {
      add({ slug: product.slug, name: product.name, price: Math.round(product.price * (1 - pack.discount / 100)), image: product.front });
    });
    setOpen(true);
  }

  return (
    <div className="border border-border flex flex-col">
      {/* Images grid */}
      <div className={cn(
        "grid gap-px bg-border",
        pack.items.length === 2 ? "grid-cols-2" : "grid-cols-3"
      )}>
        {pack.items.map(({ product }) => (
          <div key={product.slug} className="aspect-[4/5] overflow-hidden bg-bone">
            <img src={product.front} alt={product.name}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-acid mb-1">{pack.tag}</p>
            <h3 className="font-display text-xl uppercase text-cream">{pack.name}</h3>
          </div>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] bg-acid text-ink px-2 py-1 font-medium">
            -{pack.discount}%
          </span>
        </div>

        <p className="text-sm text-cream/55 leading-relaxed mb-4">{pack.description}</p>

        {/* Items list */}
        <ul className="space-y-1 mb-5 border-t border-border pt-4">
          {pack.items.map(({ product }) => (
            <li key={product.slug} className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em]">
              <span className="text-cream/50">{product.name}</span>
              <span className="text-cream/40 line-through">{fmtCOP(product.price)}</span>
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="flex items-end justify-between mb-6 mt-auto">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/35 mb-0.5">Precio pack</p>
            <p className="font-display text-2xl text-cream">{fmtCOP(discountedTotal)}</p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-acid">
            Ahorras {fmtCOP(savings)}
          </p>
        </div>

        <button
          onClick={addPack}
          className="w-full flex items-center justify-center gap-3 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
        >
          <Package size={14} strokeWidth={1.5} />
          Agregar pack al carrito
        </button>
      </div>
    </div>
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
              Combina prendas y ahorra hasta un 15%. Los packs incluyen tallas independientes — cada pieza se agrega por separado al carrito para que elijas la tuya.
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

          <Reveal delay={100}>
            <div className="mt-16 border-t border-border pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-sm text-cream/50 max-w-md">
                ¿Prefieres armar tu propio pack? Escríbenos y te hacemos un precio especial para combinaciones personalizadas.
              </p>
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-3 border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors shrink-0"
              >
                Contactar
                <ArrowRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
