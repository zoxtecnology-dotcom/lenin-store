import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { fetchDrops, fetchProductsByDrop, fetchUpcomingDrop } from "@/lib/catalog";

export const Route = createFileRoute("/drops/")({
  head: () => ({
    meta: [
      { title: "Drops — AIAHN STORE" },
      { name: "description", content: "Todos los lanzamientos de AIAHN. Ediciones limitadas, streetwear masculino hecho en Medellín." },
    ],
  }),
  loader: async () => {
    const [drops, upcoming] = await Promise.all([fetchDrops(), fetchUpcomingDrop()]);
    const drop01 = drops[0] ?? null;
    const drop01Products = drop01 ? (await fetchProductsByDrop(drop01.id)).slice(0, 3) : [];
    return { drops, drop01, drop01Products, upcoming };
  },
  component: DropsPage,
});


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
  const { drops, drop01, drop01Products, upcoming } = Route.useLoaderData();
  const upcomingDate = upcoming?.releaseDate ? new Date(upcoming.releaseDate) : new Date("2099-01-01");
  const countdown = useCountdown(upcomingDate);

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

      {/* Próximo drop — solo si existe uno sin publicar */}
      {upcoming && (
        <>
          <div className="border-t border-border" />
          <section className="bg-background py-24 md:py-36">
            <div className="mx-auto max-w-[1500px] px-5 md:px-10">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.4em] text-cream/30 mb-6">— Próximamente</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
                  <div>
                    <h2 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85] text-cream/20">
                      {upcoming.name}
                    </h2>
                    <p className="font-serif-i text-xl text-cream/30 mt-2">
                      {upcoming.label}{upcoming.season ? ` · ${upcoming.season}` : ""}
                    </p>
                  </div>
                  {upcoming.releaseDate && (
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cream/30">
                      {new Date(upcoming.releaseDate).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </Reveal>

              {upcoming.releaseDate && (
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
              )}

              {/* Newsletter — estilo home */}
              <Reveal delay={160}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-acid mb-6">— Newsletter</p>
                <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-cream mb-14">
                  Sé el primero<br />
                  <span className="font-serif-it normal-case text-cream/80">en los drops.</span>
                </h2>
                <form onSubmit={(e) => e.preventDefault()}
                  className="flex max-w-2xl items-center gap-0 border-b border-cream/30 pb-2 focus-within:border-cream">
                  <input type="email" required placeholder="tu@correo.com" aria-label="Correo electrónico"
                    className="w-full bg-transparent py-3 text-base text-cream placeholder:text-cream/40 focus:outline-none md:text-lg" />
                  <button type="submit" className="group shrink-0 flex items-center gap-3 px-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:text-acid transition-colors">
                    Suscribirme
                    <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-2" />
                  </button>
                </form>
                <p className="mt-6 max-w-md text-[11px] uppercase tracking-[0.22em] text-cream/40">
                  Al suscribirte aceptas recibir comunicaciones. Cero spam, solo drops.
                </p>
              </Reveal>
            </div>
          </section>
        </>
      )}

      <section className="relative overflow-hidden border-y border-border bg-background py-8">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, k) => (
                <span key={k} className="flex items-center">
                  {drops.map((d) => (
                    <span key={d.id} className="flex items-center">
                      <span className="font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-none mx-8 text-cream/10">{d.name} disponible</span>
                      <span className="text-acid/30 mx-4">✦</span>
                    </span>
                  ))}
                  {upcoming && (
                    <span className="flex items-center">
                      <span className="font-serif-it text-[clamp(1.5rem,4vw,3rem)] leading-none mx-8 text-cream/10">{upcoming.name} en camino</span>
                      <span className="text-acid/30 mx-4">✦</span>
                    </span>
                  )}
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
