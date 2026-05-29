import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Minus, Plus, ArrowRight,
  Package, RefreshCw, ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { products, fmtCOP, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    return {
      meta: product
        ? [
            { title: `${product.name} — AIAHN STORE` },
            { name: "description", content: product.shortDescription },
          ]
        : [{ title: "Producto no encontrado — AIAHN STORE" }],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

type ComboOption = "completo" | "top" | "bottom";

function ProductPage() {
  const { product } = Route.useLoaderData();
  const isConjunto = product.type === "conjunto" && !!product.conjunto;

  return isConjunto ? <ConjuntoProductPage product={product} /> : <StandardProductPage product={product} />;
}

/* ─── Standard Product ──────────────────────────────────────── */

function StandardProductPage({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  function handleAddToCart() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.front,
      size: selectedSize ?? undefined,
      color: product.colors[selectedColor]?.name,
    });
    setOpen(true);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />
      <div className="mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32">
        <Breadcrumb category={product.category} name={product.name} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8">
          <Gallery images={product.images} active={activeImage} onSelect={setActiveImage} />
          <div className="flex flex-col">
            <DropWishlist drop={product.drop} wishlisted={wishlisted} onWishlist={() => setWishlisted((v) => !v)} />
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6">
              {product.name}
            </h1>
            <PriceBlock price={product.price} />
            <p className="text-sm leading-relaxed text-cream/70 mb-8">{product.shortDescription}</p>

            {product.colors.length > 1 && (
              <ColorPicker colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
            )}

            <SizePicker sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />

            <QtyPicker qty={qty} onChange={setQty} />

            <div className="flex flex-col gap-3 mb-8">
              <button onClick={handleAddToCart} className="w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300">
                Añadir al carrito
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300">
                Comprar ya <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>

            <TrustBadges />
            <ProductAccordion product={product} />
          </div>
        </div>
      </div>
      <RelatedProducts currentSlug={product.slug} category={product.category} />
      <Footer />
    </main>
  );
}

/* ─── Conjunto Product ──────────────────────────────────────── */

function ConjuntoProductPage({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const c = product.conjunto!;
  const [combo, setCombo] = useState<ComboOption>("completo");
  const [topSize, setTopSize] = useState<string | null>(null);
  const [bottomSize, setBottomSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const activeImages =
    combo === "completo" ? c.fullImages :
    combo === "top" ? c.topImages : c.bottomImages;

  const [activeImage, setActiveImage] = useState(0);

  const activePrice =
    combo === "completo" ? product.price :
    combo === "top" ? c.topPrice : c.bottomPrice;

  const activeName =
    combo === "completo" ? product.name :
    combo === "top" ? c.topName : c.bottomName;

  const savings = Math.round((1 - product.price / (c.topPrice + c.bottomPrice)) * 100);

  function handleAddToCart() {
    if (combo === "completo") {
      add({
        slug: product.slug + "-completo",
        name: product.name,
        price: product.price,
        image: c.fullImages[0],
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "completo",
        pieces: [
          { name: c.topName, size: topSize ?? "?" },
          { name: c.bottomName, size: bottomSize ?? "?" },
        ],
      });
    } else if (combo === "top") {
      add({
        slug: product.slug + "-top",
        name: c.topName,
        price: c.topPrice,
        image: c.topImages[0],
        size: topSize ?? undefined,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "top",
      });
    } else {
      add({
        slug: product.slug + "-bottom",
        name: c.bottomName,
        price: c.bottomPrice,
        image: c.bottomImages[0],
        size: bottomSize ?? undefined,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "bottom",
      });
    }
    setOpen(true);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />
      <div className="mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32">
        <Breadcrumb category={product.category} name={product.name} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8">
          {/* Gallery updates with combo */}
          <Gallery images={activeImages} active={Math.min(activeImage, activeImages.length - 1)} onSelect={setActiveImage} />

          <div className="flex flex-col">
            <DropWishlist drop={product.drop} wishlisted={wishlisted} onWishlist={() => setWishlisted((v) => !v)} />
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6">
              {activeName}
            </h1>

            <div className="mb-2">
              <span className="font-display text-3xl text-cream">{fmtCOP(activePrice)}</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-6">
              6 cuotas de {fmtCOP(Math.round(activePrice / 6))} con Addi / Sistecredito
            </p>

            <p className="text-sm leading-relaxed text-cream/70 mb-8">{product.shortDescription}</p>

            {/* ELIGE TU COMBO */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-4">Elige tu combo</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  {
                    key: "completo" as ComboOption,
                    label: "Conjunto Completo",
                    sub: `${c.topName.split("/")[0].trim()} + ${c.bottomName.split("/")[0].trim()}`,
                    price: product.price,
                    badge: `Ahorra ${savings}%`,
                    img: c.fullImages[0],
                  },
                  {
                    key: "top" as ComboOption,
                    label: c.topName.split("/")[0].trim(),
                    sub: "Solo buso",
                    price: c.topPrice,
                    img: c.topImages[0],
                  },
                  {
                    key: "bottom" as ComboOption,
                    label: c.bottomName.split("/")[0].trim(),
                    sub: "Solo pantalón",
                    price: c.bottomPrice,
                    img: c.bottomImages[0],
                  },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setCombo(opt.key); setActiveImage(0); }}
                    className={`relative flex flex-col border text-left transition-all duration-200 overflow-hidden ${
                      combo === opt.key ? "border-cream" : "border-border hover:border-cream/40"
                    }`}
                  >
                    {combo === opt.key && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-acid rounded-full z-10" />
                    )}
                    <div className="aspect-square bg-bone relative overflow-hidden">
                      <img src={opt.img} alt={opt.label} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-cream leading-tight">{opt.label}</p>
                      <p className="text-[9px] text-cream/40 uppercase tracking-[0.15em] mt-0.5">{fmtCOP(opt.price)}</p>
                      {"badge" in opt && opt.badge && (
                        <span className="mt-1.5 inline-block bg-acid text-ink text-[8px] px-1.5 py-0.5 uppercase tracking-[0.15em] font-medium">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {combo === "completo" && (
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-acid flex items-center gap-1">
                  ✓ Mejor precio
                </p>
              )}
            </div>

            {/* Size selectors */}
            {product.colors.length > 1 && (
              <ColorPicker colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
            )}

            {(combo === "completo" || combo === "top") && (
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">
                  Talla — {c.topName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setTopSize(size)}
                      className={`min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                        topSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"
                      }`}
                    >{size}</button>
                  ))}
                </div>
              </div>
            )}

            {(combo === "completo" || combo === "bottom") && (
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">
                  Talla — {c.bottomName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setBottomSize(size)}
                      className={`min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                        bottomSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"
                      }`}
                    >{size}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-8">
              <button onClick={handleAddToCart} className="w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300">
                {combo === "completo" ? "Añadir conjunto al carrito" :
                 combo === "top" ? `Añadir ${c.topName.split("/")[0].trim()} al carrito` :
                 `Añadir ${c.bottomName.split("/")[0].trim()} al carrito`}
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300">
                Comprar ya <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>

            <TrustBadges />
            <ProductAccordion product={product} />
          </div>
        </div>
      </div>
      <RelatedProducts currentSlug={product.slug} category={product.category} />
      <Footer />
    </main>
  );
}

/* ─── Shared sub-components ─────────────────────────────────── */

function Breadcrumb({ category, name }: { category: string; name: string }) {
  return (
    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40">
      <Link to="/" className="hover:text-cream transition-colors">Inicio</Link>
      <span>/</span>
      <span className="hover:text-cream transition-colors cursor-pointer">{category}</span>
      <span>/</span>
      <span className="text-cream">{name}</span>
    </nav>
  );
}

function Gallery({ images, active, onSelect }: { images: string[]; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[4/5] overflow-hidden bg-bone">
        <img src={images[active]} alt="" className="h-full w-full object-cover transition-opacity duration-300" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => onSelect(i)}
            className={`aspect-square overflow-hidden bg-bone border-b-2 transition-colors ${active === i ? "border-cream" : "border-transparent"}`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function DropWishlist({ drop, wishlisted, onWishlist }: { drop: string; wishlisted: boolean; onWishlist: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-acid">{drop}</p>
      <button onClick={onWishlist} aria-label="Guardar en wishlist"
        className={`transition-colors ${wishlisted ? "text-acid" : "text-cream/40 hover:text-cream"}`}
      >
        <Heart size={18} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
      </button>
    </div>
  );
}

function PriceBlock({ price }: { price: number }) {
  return (
    <>
      <div className="mb-2">
        <span className="font-display text-3xl text-cream">{fmtCOP(price)}</span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-5">
        6 cuotas de {fmtCOP(Math.round(price / 6))} con Addi / Sistecredito
      </p>
    </>
  );
}

function ColorPicker({ colors, selected, onSelect }: { colors: { name: string; swatch: string }[]; selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Color</p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-cream">{colors[selected].name}</p>
      </div>
      <div className="flex gap-2">
        {colors.map((color, i) => (
          <button key={i} onClick={() => onSelect(i)} aria-label={color.name}
            className={`w-8 h-8 border-2 transition-all ${selected === i ? "border-cream scale-110" : "border-transparent"}`}
            style={{ backgroundColor: color.swatch }}
          />
        ))}
      </div>
    </div>
  );
}

function SizePicker({ sizes, selected, onSelect }: { sizes: string[]; selected: string | null; onSelect: (s: string) => void }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Talla</p>
        <button className="text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1">
          Guía de tallas <ArrowRight size={10} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button key={size} onClick={() => onSelect(size)}
            className={`min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
              selected === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"
            }`}
          >{size}</button>
        ))}
      </div>
    </div>
  );
}

function QtyPicker({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">Cantidad</p>
      <div className="flex items-center gap-4 border border-border w-fit px-4 py-2">
        <button onClick={() => onChange(Math.max(1, qty - 1))} aria-label="Reducir" className="text-cream/50 hover:text-cream transition-colors">
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="text-sm tabular-nums text-cream w-6 text-center">{qty}</span>
        <button onClick={() => onChange(qty + 1)} aria-label="Aumentar" className="text-cream/50 hover:text-cream transition-colors">
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-border">
      {[
        { icon: Package, label: "Envío gratis +$200k" },
        { icon: RefreshCw, label: "Cambios 30 días" },
        { icon: ShieldCheck, label: "Pago seguro" },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/50">
          <Icon size={13} strokeWidth={1.5} />
          {label}
        </div>
      ))}
    </div>
  );
}

function ProductAccordion({ product }: { product: Product }) {
  return (
    <Accordion type="multiple" defaultValue={["descripcion"]}>
      <AccordionItem value="descripcion" className="border-b border-border">
        <AccordionTrigger className="text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4">Descripción</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-cream/70 pb-5">{product.description}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="detalles" className="border-b border-border">
        <AccordionTrigger className="text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4">Detalles &amp; Materiales</AccordionTrigger>
        <AccordionContent className="pb-5">
          <ul className="space-y-1">
            {product.details.split("\n").map((line, i) => (
              <li key={i} className="text-sm text-cream/70">{line}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="envio" className="border-b border-border">
        <AccordionTrigger className="text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4">Envío &amp; Devoluciones</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-cream/70 pb-5">
          Envío gratis en pedidos mayores a $200.000. Despacho en 1–3 días hábiles. Cambios dentro de los 30 días siguientes a la compra.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tallas" className="border-b border-border">
        <AccordionTrigger className="text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4">Guía de Tallas</AccordionTrigger>
        <AccordionContent className="pb-5">
          <table className="w-full text-[11px] uppercase tracking-[0.15em] text-cream/70">
            <thead>
              <tr className="border-b border-border">
                {["Talla", "Pecho", "Largo", "Hombro"].map((h) => (
                  <th key={h} className="text-left py-2 pr-4 text-cream/50 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[["XS","96cm","68cm","44cm"],["S","100cm","70cm","46cm"],["M","104cm","72cm","48cm"],["L","108cm","74cm","50cm"],["XL","112cm","76cm","52cm"],["XXL","116cm","78cm","54cm"]].map(([size, ...vals]) => (
                <tr key={size} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-cream">{size}</td>
                  {vals.map((v, i) => <td key={i} className="py-2 pr-4">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function RelatedProducts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = getRelated(currentSlug, category);
  if (!related.length) return null;
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-acid mb-3">Drop 01</p>
        <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.88] text-cream mb-10">
          También te puede gustar
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
          {related.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                {p.tag && (
                  <span className={`absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${p.tag.startsWith("-") ? "bg-acid text-ink" : "bg-ink text-cream"}`}>
                    {p.tag}
                  </span>
                )}
                <img src={p.front} alt={p.name} loading="lazy" className="card-img card-img-front absolute inset-0 h-full w-full object-cover" />
                <img src={p.back} alt="" aria-hidden loading="lazy" className="card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-xs uppercase tracking-[0.18em] text-cream">{p.name}</h3>
                <span className="shrink-0 text-xs tabular-nums text-cream/70">{fmtCOP(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getRelated(currentSlug: string, category: string, limit = 3) {
  const sameCategory = products.filter((p) => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = products.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
