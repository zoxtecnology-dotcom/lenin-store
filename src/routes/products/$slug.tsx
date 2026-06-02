import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart, Minus, Plus, ArrowRight,
  Package, RefreshCw, ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { fmtCOP, type Product } from "@/lib/products";
import { fetchProductBySlug, fetchProducts } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { supabase } from "@/lib/supabase";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

interface SiteSettings {
  free_shipping_threshold: string;
  returns_days: string;
  shipping_time: string;
}

export const Route = createFileRoute("/products/$slug")({
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.name} — AIAHN STORE` },
          { name: "description", content: loaderData.product.shortDescription },
        ]
      : [{ title: "Producto no encontrado — AIAHN STORE" }],
  }),
  loader: async ({ params }) => {
    const [product, allProducts, settingsRes] = await Promise.all([
      fetchProductBySlug(params.slug),
      fetchProducts(),
      supabase.from("site_settings").select("key, value").in("key", ["free_shipping_threshold", "returns_days", "shipping_time"]),
    ]);
    if (!product) throw notFound();
    const settings = (settingsRes.data ?? []).reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as SiteSettings);
    return { product, allProducts, settings };
  },
  component: ProductPage,
});

type ComboOption = "completo" | "top" | "bottom";

function ProductPage() {
  const { product, settings } = Route.useLoaderData() as { product: Product; allProducts: Product[]; settings: SiteSettings };
  const isConjunto = product.type === "conjunto" && !!product.conjunto;

  return isConjunto ? <ConjuntoProductPage product={product} settings={settings} /> : <StandardProductPage product={product} settings={settings} />;
}

/* ─── Standard Product ──────────────────────────────────────── */

function StandardProductPage({ product, settings }: { product: Product; settings: SiteSettings }) {
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);

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

  function handleBuyNow() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.front,
      size: selectedSize ?? undefined,
      color: product.colors[selectedColor]?.name,
    });
    navigate({ to: "/checkout" });
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32">
        <Breadcrumb category={product.category} name={product.name} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8">
          <Gallery images={product.images} active={activeImage} onSelect={setActiveImage} />
          <div className="flex flex-col">
            <DropWishlist drop={product.drop} wishlisted={wishlisted} onWishlist={() => toggle(product.id)} />
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6">
              {product.name}
            </h1>
            <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} />
            <p className="text-sm leading-relaxed text-cream/70 mb-8">{product.shortDescription}</p>

            {product.colors.length > 1 && (
              <ColorPicker
                colors={product.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
                variants={product.variants ?? []}
                sizes={product.sizes}
              />
            )}

            <SizePicker
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
              variants={product.variants ?? []}
              selectedColor={product.colors[selectedColor]?.name ?? ""}
              category={product.category}
            />

            <QtyPicker qty={qty} onChange={setQty} />

            <div className="flex flex-col gap-3 mb-8">
              <button onClick={handleAddToCart} className="w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300">
                Añadir al carrito
              </button>
              <button onClick={handleBuyNow} className="w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300">
                Comprar ya <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>

            <TrustBadges settings={settings} />
            <ProductAccordion product={product} settings={settings} />
          </div>
        </div>
      </div>
      <RelatedProducts currentSlug={product.slug} category={product.category} />
      <Footer />
    </main>
  );
}

/* ─── Conjunto Product ──────────────────────────────────────── */

function ConjuntoProductPage({ product, settings }: { product: Product; settings: SiteSettings }) {
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const c = product.conjunto!;
  const [combo, setCombo] = useState<ComboOption>("completo");
  const [topSize, setTopSize] = useState<string | null>(null);
  const [bottomSize, setBottomSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideCategory, setGuideCategory] = useState<string>("camiseta");

  // Completo: todas las fotos (look completo + arriba + abajo + galería)
  // Top/Bottom: solo las de esa pieza
  const completoImages = [
    ...c.fullImages,
    ...c.topImages,
    ...c.bottomImages,
    ...product.images.filter((img) => !c.fullImages.includes(img) && !c.topImages.includes(img) && !c.bottomImages.includes(img)),
  ].filter(Boolean);

  const activeImages =
    combo === "completo" ? completoImages :
    combo === "top" ? c.topImages : c.bottomImages;

  const [activeImage, setActiveImage] = useState(0);

  // Reset a foto 0 cuando cambia el combo
  useEffect(() => { setActiveImage(0); }, [combo]);

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

  function handleBuyNow() {
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
    navigate({ to: "/checkout" });
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32">
        <Breadcrumb category={product.category} name={product.name} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8">
          {/* Gallery updates with combo */}
          <Gallery images={activeImages} active={Math.min(activeImage, activeImages.length - 1)} onSelect={setActiveImage} />

          <div className="flex flex-col">
            <DropWishlist drop={product.drop} wishlisted={wishlisted} onWishlist={() => toggle(product.id)} />
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

            <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} category={guideCategory} />

            {(combo === "completo" || combo === "top") && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Talla — {c.topName}</p>
                  <button type="button" onClick={() => { setGuideCategory(c.topPieceType); setGuideOpen(true); }}
                    className="text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1">
                    Guía de tallas <ArrowRight size={10} strokeWidth={1.5} />
                  </button>
                </div>
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
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Talla — {c.bottomName}</p>
                  <button type="button" onClick={() => { setGuideCategory(c.bottomPieceType); setGuideOpen(true); }}
                    className="text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1">
                    Guía de tallas <ArrowRight size={10} strokeWidth={1.5} />
                  </button>
                </div>
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
              <button onClick={handleBuyNow} className="w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300">
                Comprar ya <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>

            <TrustBadges settings={settings} />
            <ProductAccordion product={product} settings={settings} />
          </div>
        </div>
      </div>
      <RelatedProducts currentSlug={product.slug} category={product.category} />
      <Footer />
    </main>
  );
}

/* ─── Shared sub-components ─────────────────────────────────── */

const CATEGORY_HANDLE: Record<string, string> = {
  Camisetas: "camisetas",
  Gorras: "gorras",
  Busos: "hombre",
  Conjuntos: "hombre",
  Pantalonetas: "hombre",
  Pantalones: "hombre",
};

function Breadcrumb({ category, name }: { category: string; name: string }) {
  const handle = CATEGORY_HANDLE[category] ?? "nuevo";
  return (
    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40">
      <Link to="/" className="hover:text-cream transition-colors">Inicio</Link>
      <span>/</span>
      <Link to="/collections/$handle" params={{ handle }} className="hover:text-cream transition-colors">
        {category}
      </Link>
      <span>/</span>
      <span className="text-cream/80 truncate max-w-[16rem]">{name}</span>
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

function PriceBlock({ price, compareAtPrice }: { price: number; compareAtPrice?: number }) {
  const discountPct = compareAtPrice && compareAtPrice > price
    ? Math.round((1 - price / compareAtPrice) * 100)
    : null;

  return (
    <>
      <div className="mb-2 flex items-baseline gap-3">
        <span className="font-display text-3xl text-cream">{fmtCOP(price)}</span>
        {compareAtPrice && (
          <span className="text-lg text-cream/30 line-through">{fmtCOP(compareAtPrice)}</span>
        )}
        {discountPct && (
          <span className="bg-acid text-ink text-[10px] px-2 py-0.5 uppercase tracking-[0.15em] font-medium">
            -{discountPct}%
          </span>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-5">
        6 cuotas de {fmtCOP(Math.round(price / 6))} con Addi / Sistecredito
      </p>
    </>
  );
}

function ColorPicker({ colors, selected, onSelect, variants, sizes }: {
  colors: { name: string; swatch: string }[];
  selected: number;
  onSelect: (i: number) => void;
  variants: import("@/lib/products").ProductVariant[];
  sizes: string[];
}) {
  function colorStock(colorName: string) {
    if (!variants.length) return 99;
    return sizes.reduce((sum, s) =>
      sum + variants.filter((v) => v.color_name === colorName && v.size === s && v.piece === null)
        .reduce((a, v) => a + v.stock, 0), 0);
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Color</p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-cream">{colors[selected].name}</p>
      </div>
      <div className="flex gap-2">
        {colors.map((color, i) => {
          const stock = colorStock(color.name);
          return (
            <button key={i} onClick={() => stock > 0 && onSelect(i)}
              aria-label={`${color.name}${stock === 0 ? " — agotado" : ""}`}
              disabled={stock === 0}
              className={`w-8 h-8 border-2 transition-all ${selected === i ? "border-cream scale-110" : "border-transparent"} ${stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: color.swatch }}
            />
          );
        })}
      </div>
    </div>
  );
}

function SizePicker({ sizes, selected, onSelect, variants, selectedColor, category }: {
  sizes: string[];
  selected: string | null;
  onSelect: (s: string) => void;
  variants: import("@/lib/products").ProductVariant[];
  selectedColor: string;
  category?: string;
}) {
  const [guideOpen, setGuideOpen] = useState(false);

  // Si es talla única, no mostrar selector ni guía
  const isTallaUnica = sizes.length === 1 && sizes[0] === "Única";
  
  // Auto-seleccionar talla única
  useEffect(() => {
    if (isTallaUnica && selected !== "Única") {
      onSelect("Única");
    }
  }, [isTallaUnica, selected, onSelect]);

  if (isTallaUnica) {
    return (
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">Talla</p>
        <div className="inline-block px-4 py-2 text-[11px] uppercase tracking-[0.2em] bg-cream/10 text-cream/70 border border-border">
          Talla Única
        </div>
      </div>
    );
  }

  function sizeStock(size: string) {
    if (!variants.length) return 99;
    return variants
      .filter((v) => v.color_name === selectedColor && v.size === size && v.piece === null)
      .reduce((sum, v) => sum + v.stock, 0);
  }

  return (
    <div className="mb-6">
      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} category={category} />
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Talla</p>
        <button type="button" onClick={() => setGuideOpen(true)} className="text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1">
          Guía de tallas <ArrowRight size={10} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const stock = sizeStock(size);
          const out = stock === 0;
          return (
            <button key={size} onClick={() => !out && onSelect(size)}
              disabled={out}
              className={`min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all relative ${
                selected === size ? "bg-cream text-ink border-cream"
                  : out ? "text-cream/20 border-border/30 cursor-not-allowed line-through"
                  : "text-cream/60 border-border hover:border-cream hover:text-cream"
              }`}
            >
              {size}
              {!out && stock <= 3 && (
                <span className="absolute -top-1.5 -right-1.5 bg-acid text-ink text-[8px] w-4 h-4 flex items-center justify-center font-bold">
                  {stock}
                </span>
              )}
            </button>
          );
        })}
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

function TrustBadges({ settings }: { settings: SiteSettings }) {
  const threshold = parseInt(settings.free_shipping_threshold ?? "200000");
  const fmtThreshold = threshold >= 1000000
    ? `$${(threshold / 1000000).toFixed(1)}M`
    : `$${Math.round(threshold / 1000)}k`;
  const days = settings.returns_days ?? "30";

  return (
    <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-border">
      {[
        { icon: Package, label: `Envío gratis +${fmtThreshold}` },
        { icon: RefreshCw, label: `Cambios ${days} días` },
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

function ProductAccordion({ product, settings }: { product: Product; settings: SiteSettings }) {
  const threshold = parseInt(settings.free_shipping_threshold ?? "200000");
  const fmtThreshold = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(threshold);
  const days = settings.returns_days ?? "30";
  const shippingTime = settings.shipping_time ?? "1–3 días hábiles";

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
          Envío gratis en pedidos mayores a {fmtThreshold}. Despacho en {shippingTime}. Cambios dentro de los {days} días siguientes a la compra.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function RelatedProducts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const { allProducts } = Route.useLoaderData() as { product: Product; allProducts: Product[] };
  const related = getRelated(currentSlug, category, allProducts);
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

function getRelated(currentSlug: string, category: string, allProducts: Product[], limit = 3) {
  const sameCategory = allProducts.filter((p) => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = allProducts.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
