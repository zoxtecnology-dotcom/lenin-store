import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { fetchDrops, fetchProductsByDrop } from "@/lib/catalog";

export const Route = createFileRoute("/drops/")({
  head: () => ({
    meta: [
      { title: "Drops — AIAHN STORE" },
      { name: "description", content: "Todos los lanzamientos de AIAHN. Ediciones limitadas, streetwear masculino hecho en Medellín." },
    ],
  }),
  loader: async () => {
    const drops = await fetchDrops();
    const drop01 = drops[0] ?? null;
    const drop01Products = drop01 ? (await fetchProductsByDrop(drop01.id)).slice(0, 3) : [];
    return { drops, drop01, drop01Products };
  },
  component: DropsPage,
});

const DROP_02_DATE = new Date("2026-10-01T00:00:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

function DropsPage() {
  const { drop01, drop01Products } = Route.useLoaderData();
  const countdown = useCountdown(DROP_02_DATE);

  const heroImg = drop01?.editorialImages[0] ?? "";
  const editImg1 = drop01?.editorialImages[0] ?? "";
  const editImg2 = drop01?.editorialImages[1] ?? "";
  const editImg3 = drop01?.editorialImages[2] ?? "";

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {heroImg && (
          <img src={heroImg} alt="AIAHN Drops" fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[60%_30%]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="relative h-full mx-auto max-w-[1500px] px-5 md:px-10 flex flex-col justify-end pb-12">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-4">Archivo de lanzamientos</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(5rem,18vw,16rem)] uppercase leading-[0.82] text-cream">Drops</h1>
          </Reveal>
        </div>
      </section>

      {/* DROP 01 */}
      {drop01 && (
        <section className="bg-background py-24 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-3">— Disponible ahora</p>
                  <h2 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream">
                    {drop01.name}
                  </h2>
                  <p className="font-serif-i text-xl text-cream/60 mt-2">{drop01.label} · {drop01.season}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Medellín, Colombia</p>
                  {drop01.releaseDate && (
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-1">
                      {new Date(drop01.releaseDate).toLocaleDateString("es-CO", { month: "long", year: "numeric" })}
                    </p>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-1">{drop01Products.length} piezas</p>
                </div>
              </div>
            </Reveal>

            {/* Editorial grid */}
            {editImg1 && (
              <Reveal delay={80}>
                <div className="grid grid-cols-12 gap-3 md:gap-4 mb-16">
                  <div className="col-span-12 md:col-span-7">
                    <img src={editImg1} alt="Drop 01 editorial" className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
                    {editImg2 && <img src={editImg2} alt="Drop 01 detalle" className="w-full flex-1 object-cover" style={{ minHeight: 0 }} />}
                    {editImg3 && <img src={editImg3} alt="Drop 01 look" className="w-full flex-1 object-cover" style={{ minHeight: 0 }} />}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Editorial text */}
            <Reveal delay={120}>
              <div className="grid md:grid-cols-12 gap-8 mb-20">
                <div className="md:col-span-5">
                  <p className="font-serif-i text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-cream/90">
                    "{drop01.editorialQuote}"
                  </p>
                </div>
                <div className="md:col-span-5 md:col-start-7">
                  <p className="text-sm leading-relaxed text-cream/60">{drop01.editorialBody}</p>
                </div>
              </div>
            </Reveal>

            {/* Product preview */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-12">
              {drop01Products.map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 80} />
              ))}
            </div>

            <Reveal>
              <Link to="/drops/$id" params={{ id: drop01.slug }}
                className="group inline-flex items-center gap-3 border border-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-ink transition-colors duration-300">
                Ver {drop01.name} completo
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <div className="border-t border-border" />

      {/* DROP 02 — próximamente */}
      <section className="bg-background py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-cream/30 mb-6">— Próximamente</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream/20">Drop 02</h2>
                <p className="font-serif-i text-xl text-cream/30 mt-2">Otoño · 26</p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/30">01 Oct 2026</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-4 gap-px border border-border/40 mb-20 max-w-2xl">
              {[
                { value: countdown.days, label: "Días" },
                { value: countdown.hours, label: "Horas" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Seg" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center py-8 border-r border-border/40 last:border-0">
                  <span className="font-display text-[clamp(2.5rem,6vw,5rem)] tabular-nums leading-none text-cream">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.35em] text-cream/30">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="max-w-xl mb-14">
              <p className="font-serif-i text-[clamp(1.2rem,2.5vw,1.8rem)] leading-snug text-cream/40">
                "El segundo capítulo está en construcción.<br />Suscríbete y sé el primero en verlo."
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <form onSubmit={(e) => e.preventDefault()}
              className="flex max-w-lg items-center gap-0 border-b border-cream/20 pb-2 focus-within:border-cream/50">
              <input type="email" required placeholder="tu@correo.com" aria-label="Correo electrónico"
                className="w-full bg-transparent py-3 text-sm text-cream placeholder:text-cream/25 focus:outline-none" />
              <button type="submit" className="shrink-0 flex items-center gap-2 px-2 text-[10px] uppercase tracking-[0.3em] text-cream/50 hover:text-acid transition-colors">
                Avisar <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </form>
            <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-cream/25">Solo te escribimos cuando hay algo nuevo. Cero spam.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-background py-8">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-none mx-8 text-cream/10">Drop 01 disponible</span>
                  <span className="text-acid/30 mx-4">✦</span>
                  <span className="font-serif-it text-[clamp(1.5rem,4vw,3rem)] leading-none mx-8 text-cream/10">Drop 02 en camino</span>
                  <span className="text-acid/30 mx-4">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
