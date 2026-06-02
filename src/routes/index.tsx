import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { fmtCOP } from "@/lib/products";
import { fetchProductsNewest, fetchPacks, fetchDrops, fetchCollections } from "@/lib/catalog";
import { imgUrl } from "@/lib/cloudinary";
import { ProductCard } from "@/components/ProductCard";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIAHN STORE — Hecho por amor, vestido con actitud" },
      { name: "description", content: "Streetwear premium de Colombia. Drop 01 — AIAHN Essentials SS26. Ropa hecha por amor, vestida con actitud." },
      { property: "og:title", content: "AIAHN STORE — Drop 01" },
      { property: "og:description", content: "Ropa hecha por amor, vestida con actitud. Drop 01 disponible ahora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [products, packs, drops, collections] = await Promise.all([
      fetchProductsNewest(10), // carrusel: los 10 más nuevos
      fetchPacks(),
      fetchDrops(),
      fetchCollections(),
    ]);
    return { products, packs, drops, collections };
  },
  component: Index,
});

function Index() {
  const { products, packs, drops, collections } = Route.useLoaderData();
  const drop01 = drops[0];
  const heroImg = drop01?.editorialImages[0] ?? imgUrl("aiahn/seed/hero");
  const col = (handle: string) => collections.find((c) => c.handle === handle);

  return (
    <main className="bg-background text-foreground selection:bg-acid selection:text-ink">
      <SiteHeader transparentTop />


      {/* HERO */}
      <section className="relative grain min-h-[92vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Modelo con hoodie oversize negro en escena urbana oscura"
          fetchPriority="high"
          width={1536}
          height={1920}
          className="absolute inset-0 z-0 h-full w-full object-cover object-[60%_30%]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/55 via-background/20 to-background/90" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1500px] flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-36 md:pb-14">
          <div className="pointer-events-none">
            <p className="rise mb-6 text-[11px] uppercase tracking-[0.32em] text-cream/70" style={{ animationDelay: "0.1s" }}>
              {drop01 ? `${drop01.season} — ${drop01.name}` : ""}
            </p>
            <h1 className="font-display text-cream leading-[0.82] uppercase">
              <span className="rise block text-[clamp(3.6rem,12vw,11rem)]" style={{ animationDelay: "0.25s" }}>Hecho</span>
              <span className="rise block text-[clamp(3.6rem,12vw,11rem)] pl-[8vw]" style={{ animationDelay: "0.4s" }}>
                por <span className="font-serif-it lowercase text-acid">amor</span>
              </span>
              <span className="rise block text-[clamp(3.6rem,12vw,11rem)]" style={{ animationDelay: "0.55s" }}>Vestido</span>
              <span className="rise block text-[clamp(3.6rem,12vw,11rem)] pl-[14vw]" style={{ animationDelay: "0.7s" }}>
                con <span className="font-serif-it lowercase">actitud</span>
              </span>
            </h1>
          </div>

          <div className="relative z-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.95s forwards" }}>
            {drop01 && (
              <div className="max-w-xs text-[11px] uppercase tracking-[0.28em] text-cream/70">
                <p>{drop01.name}</p>
                <p className="mt-1">{drop01.label} — {drop01.season}</p>
              </div>
            )}
            <Link to="/drops" className="group flex items-center gap-3 text-cream">
              <span className="link-underline font-display text-xl uppercase tracking-wider md:text-2xl">
                Explorar colección
              </span>
              <ArrowRight size={22} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="relative overflow-hidden border-y border-border bg-background py-28 md:py-44">
        <div className="absolute inset-0 noise-bg opacity-[0.04]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-acid">— Manifiesto</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 font-serif-i text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] text-cream">
              Dos nombres.<br />
              Una sangre.<br />
              <span className="font-display not-italic tracking-tight">Una marca.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-14 grid gap-10 md:grid-cols-12">
              <p className="md:col-start-7 md:col-span-6 text-sm leading-relaxed text-cream/70 md:text-base">
                AIAHN nace de dos nombres: <span className="text-cream">Alahia</span> y <span className="text-cream">Iahn</span>.
                Una marca fundada por un padre, escrita sobre el pecho como una promesa.
                Cada prenda es un capítulo — cosido en Medellín, vestido en la calle,
                hecho para durar más que la temporada.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED DROP */}
      <FeaturedDrop products={products} />

      {/* CATEGORY SPLIT */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 px-5 md:grid-cols-2 md:gap-4 md:px-6">
          {[
            { label: "Hombre", handle: "hombre", img: col("hombre")?.image ?? imgUrl("aiahn/seed/cat-hombre"), cta: "Ver colección" },
            { label: "Gorras", handle: "gorras", img: col("gorras")?.image ?? imgUrl("aiahn/seed/cat-acc"), cta: "Ver colección" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 120}>
              <Link to="/collections/$handle" params={{ handle: c.handle }} className="group relative block aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                  <h3 className="font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-none text-cream">
                    {c.label}
                  </h3>
                  <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/80 transition-transform duration-500 group-hover:translate-x-2">
                    {c.cta} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PACKS */}
      <PacksStrip packs={packs} />

      {/* LOOKBOOK */}
      <section className="relative bg-background py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-acid">— Editorial</p>
              <h2 className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85]">
                Lookbook<br />
                <span className="font-serif-it normal-case text-cream/70">drop 01</span>
              </h2>
            </div>
            <p className="hidden max-w-[16rem] text-xs uppercase tracking-[0.25em] text-cream/60 md:block">
              Fotografía — Lucía Restrepo<br />
              Dirección — A. Henao<br />
              Medellín · 2026
            </p>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <Reveal className="col-span-12 md:col-span-5">
              <figure>
                <img src={drop01?.editorialImages[0] ?? ""} alt={drop01?.editorialCaptions[0] ?? ""} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                {drop01?.editorialCaptions[0] && (
                  <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50">
                    {drop01.editorialCaptions[0]}
                  </figcaption>
                )}
              </figure>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-7 md:pt-24" delay={100}>
              <figure>
                <img src={drop01?.editorialImages[1] ?? ""} alt={drop01?.editorialCaptions[1] ?? ""} loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
                {drop01?.editorialCaptions[1] && (
                  <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50">
                    {drop01.editorialCaptions[1]}
                  </figcaption>
                )}
              </figure>
            </Reveal>
            <Reveal className="col-span-8 md:col-span-4 md:col-start-3" delay={50}>
              <figure>
                <img src={drop01?.editorialImages[2] ?? ""} alt={drop01?.editorialCaptions[2] ?? ""} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                {drop01?.editorialCaptions[2] && (
                  <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-cream/50">
                    {drop01.editorialCaptions[2]}
                  </figcaption>
                )}
              </figure>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-6 md:col-start-7 md:self-end" delay={150}>
              <p className="font-serif-i text-2xl leading-snug text-cream/90 md:text-3xl">
                "La prenda no es disfraz. Es archivo. Es memoria.
                Cada hilo recuerda quién fuimos antes de salir a la calle."
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cream/50">— Diario de taller, 2026</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO STRIP */}
      <section className="relative overflow-hidden border-y border-border bg-acid py-12 text-ink md:py-16">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-none mx-8">
                    No es ropa.
                  </span>
                  <span className="font-serif-it text-[clamp(3rem,9vw,8rem)] leading-none mx-8">
                    Es un legado.
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative bg-background py-28 md:py-40">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-acid">— Newsletter</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9]">
              Sé el primero<br />
              <span className="font-serif-it normal-case text-cream/80">en los drops.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-14 flex max-w-2xl items-center gap-0 border-b border-cream/30 pb-2 focus-within:border-cream"
            >
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="w-full bg-transparent py-3 text-base text-cream placeholder:text-cream/40 focus:outline-none md:text-lg"
              />
              <button
                type="submit"
                aria-label="Suscribirme"
                className="group flex shrink-0 items-center gap-3 px-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:text-acid"
              >
                Suscribirme
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-2" />
              </button>
            </form>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 max-w-md text-[11px] uppercase tracking-[0.22em] text-cream/40">
              Al suscribirte aceptas recibir comunicaciones de AIAHN. Cero spam, sólo drops.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeaturedDrop({ products }: { products: import("@/lib/products").Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const CARD_W = 320;

  function scroll(dir: "left" | "right") {
    ref.current?.scrollBy({ left: dir === "right" ? CARD_W : -CARD_W, behavior: "smooth" });
  }

  return (
    <section id="drop" className="relative bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-acid">— Disponible ahora</p>
            <h2 className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.85]">
              Lo nuevo<br />
              <span className="font-serif-it normal-case text-cream/70">esta semana</span>
            </h2>
          </div>
          <Link to="/collections/$handle" params={{ handle: "nuevo" }}
            className="link-underline text-[11px] uppercase tracking-[0.28em] text-cream/80 hover:text-cream">
            Ver todo →
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="relative">
          <button onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <div ref={ref}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none">
            {products.slice(0, 6).map((p, i) => (
              <div key={p.slug} className="snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-[260px] lg:w-[280px]">
                <ProductCard product={p} delay={i * 60} noTouchSwipe />
              </div>
            ))}
          </div>

          <button onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}


function PacksStrip({ packs }: { packs: import("@/lib/catalog").PackData[] }) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    ref.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-4">— Packs</p>
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[0.88] text-cream">
              Más look,<br />mejor precio.
            </h2>
          </Reveal>
          <Link to="/packs"
            className="group inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity">
            Ver packs
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="relative">
          <button onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <div ref={ref} className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none">
            {packs.map((pack, i) => {
              const original = pack.items.reduce((sum, { product }) => sum + product.price, 0);
              const final = Math.round(original * (1 - pack.discount / 100));
              return (
                <Reveal key={pack.id} delay={i * 60}>
                  <div className="snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-[280px] lg:w-[300px]">
                    <Link to="/packs/$id" params={{ id: pack.slug }} className="group flex flex-col border border-border hover:border-cream/30 transition-colors" style={{ height: "340px" }}>
                      <div className="relative h-52 flex gap-px bg-border overflow-hidden shrink-0">
                        <span className="absolute top-2.5 right-2.5 z-10 bg-acid text-ink text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 font-medium">
                          -{pack.discount}%
                        </span>
                        {pack.items.map(({ product }) => (
                          <div key={product.slug} className="flex-1 overflow-hidden bg-bone">
                            <img src={product.front} alt={product.name}
                              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        ))}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        {pack.tag && <p className="text-[9px] uppercase tracking-[0.25em] text-acid mb-1">{pack.tag}</p>}
                        <p className="font-display text-base uppercase text-cream mb-3">{pack.name}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-sm text-cream">{fmtCOP(final)}</p>
                          <p className="text-[10px] text-acid">-{fmtCOP(original - final)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <button onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 bg-background border border-border items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
