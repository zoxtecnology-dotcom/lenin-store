import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { BRAND, SOCIAL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/tiendas")({
  head: () => ({
    meta: [
      { title: pageTitle("Tiendas") },
      { name: "description", content: `${BRAND.name} es una marca 100% online con pop-ups periódicos en ${BRAND.city}. Encuentra los próximos eventos aquí.` },
    ],
  }),
  component: TiendasPage,
});

function TiendasPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— AIAHN</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream">
              Tiendas
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Nacimos en internet. Pero también tocamos asfalto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Online store */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal className="md:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— Tienda online</p>
              <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.88] text-cream">
                {BRAND.domain}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cream/60">
                La tienda principal es esta. Aquí viven los drops, las previas y los archivos. Abierta 24/7,
                envíos a toda {BRAND.country}.
              </p>
            </Reveal>
            <Reveal delay={100} className="md:col-span-6 md:col-start-7">
              <div className="space-y-6">
                {[
                  { icon: Clock, label: "Horario", value: "24 horas, 7 días" },
                  { icon: MapPin, label: "Cobertura", value: `Todo ${BRAND.country}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-5 py-6 border-b border-border">
                    <Icon size={18} strokeWidth={1.5} className="text-acid mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1">{label}</p>
                      <p className="text-sm text-cream">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pop-ups */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— Presencia física</p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.88] text-cream">
                Pop-ups<br />{BRAND.city}
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-relaxed text-cream/60 mb-8">
                Periódicamente montamos puntos de venta temporales en {BRAND.city} donde puedes ver, tocar y
                llevarte las prendas del drop vigente. Cada pop-up se anuncia con anticipación en nuestro
                Instagram antes de cualquier otro canal.
              </p>
              <p className="text-base leading-relaxed text-cream/60 mb-10">
                Las fechas, ubicaciones y horarios varían — el único lugar donde los confirmamos con tiempo
                es la cuenta oficial. No te los pierdas.
              </p>
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-acid hover:text-acid transition-colors"
              >
                <Instagram size={14} strokeWidth={1.5} />
                Seguir {SOCIAL.instagram.handle}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Próximamente */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <div className="border border-border p-10 md:p-16 max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— En construcción</p>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.88] text-cream mb-6">
                Tienda física<br />{BRAND.city}, {BRAND.year}
              </h2>
              <p className="text-sm leading-relaxed text-cream/55">
                Estamos trabajando en abrir un espacio físico permanente en {BRAND.city}. Un lugar que no solo
                venda ropa sino que refleje lo que es {BRAND.name}: proceso, carácter y ciudad. Cuando esté listo,
                lo primero en saberlo es nuestra comunidad.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
