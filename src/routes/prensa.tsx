import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/prensa")({
  head: () => ({
    meta: [
      { title: pageTitle("Prensa") },
      { name: "description", content: `Kit de prensa y contacto de medios para ${BRAND.store}. Fotos, logos y ficha de marca.` },
    ],
  }),
  component: PrensaPage,
});

const BRAND_FACTS = [
  { label: "Fundación", value: `${BRAND.year}, ${BRAND.city}` },
  { label: "Categoría", value: "Streetwear masculino" },
  { label: "Modelo", value: "Drops limitados" },
  { label: "Producción", value: `100% local, ${BRAND.country}` },
  { label: "Distribución", value: `Online — ${BRAND.domain}` },
  { label: "Fundador", value: "Privado" },
];

const ASSETS = [
  { label: "Logotipo (SVG + PNG)", desc: "Versiones en negro, blanco y acid. Fondos claro y oscuro." },
  { label: "Fotografías editoriales", desc: "Drop 001 — resolución alta, uso editorial libre con crédito." },
  { label: "Ficha de marca (PDF)", desc: "Historia, valores, paleta de colores, tipografía." },
  { label: "Video de marca (MP4)", desc: "30 seg. Formato vertical y horizontal. Para redes y web." },
];

function PrensaPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— AIAHN</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream">
              Prensa
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Para medios, fotógrafos, periodistas y creadores de contenido. Aquí está lo que necesitas para hablar de {BRAND.name}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ficha de marca */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— La marca</p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.88] text-cream">
                {BRAND.name}<br />en dos líneas
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-relaxed text-cream/60 mb-8">
                {BRAND.name} es una marca de streetwear masculino fundada en {BRAND.city} en {BRAND.year}. Su nombre viene de
                dos personas: Alahia e Iahn — los hijos de quien la creó. Opera bajo un modelo de drops
                limitados con producción 100% local. Cada pieza se diseña para durar, no para una temporada.
              </p>
              <div className="grid grid-cols-2 gap-px bg-border">
                {BRAND_FACTS.map(({ label, value }) => (
                  <div key={label} className="bg-background py-5 pr-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/35 mb-1">{label}</p>
                    <p className="text-sm text-cream">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Assets */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-10">— Kit de prensa</p>
          </Reveal>
          <div className="space-y-px">
            {ASSETS.map((asset, i) => (
              <Reveal key={asset.label} delay={i * 50}>
                <div className="flex items-start justify-between gap-6 py-8 border-b border-border group">
                  <div>
                    <p className="text-sm font-medium text-cream mb-1">{asset.label}</p>
                    <p className="text-sm text-cream/45">{asset.desc}</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="shrink-0 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors border border-border hover:border-acid px-4 py-2"
                  >
                    <Download size={12} strokeWidth={1.5} />
                    Solicitar
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-8 text-[11px] text-cream/30 uppercase tracking-[0.2em]">
              * Los assets están disponibles bajo solicitud. Escríbenos a {EMAIL.press} para acceso inmediato.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contacto prensa */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-10 md:p-14">
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-6">— Contacto de prensa</p>
                <h2 className="font-display text-3xl uppercase leading-tight text-cream mb-6">
                  Colaboraciones<br />y medios
                </h2>
                <p className="text-sm leading-relaxed text-cream/55 mb-8">
                  Para entrevistas, colaboraciones editoriales, préstamo de prendas o cualquier consulta de
                  medios, escríbenos directamente. Respondemos en 24–48 horas.
                </p>
                <a
                  href={`mailto:${EMAIL.press}`}
                  className="inline-block bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
                >
                  {EMAIL.press}
                </a>
              </div>
              <div className="bg-background p-10 md:p-14 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">Nota editorial</p>
                <p className="font-serif-i text-xl leading-snug text-cream/70">
                  "{BRAND.name} no es un proyecto de moda. Es un documento de amor con forma de ropa —
                  escrito sobre el pecho como una promesa a dos hijos."
                </p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-cream/30">— Ficha de marca, {BRAND.year}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
