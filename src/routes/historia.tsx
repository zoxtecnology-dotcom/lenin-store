import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import hero from "@/assets/hero.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import p1 from "@/assets/p1.jpg";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Historia — AIAHN STORE" },
      { name: "description", content: "AIAHN nace de dos nombres: Alahia e Iahn. Una marca fundada por un padre, escrita sobre el pecho como una promesa. Streetwear masculino hecho en Medellín." },
    ],
  }),
  component: HistoriaPage,
});

function HistoriaPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      {/* OPENING — full bleed wordmark */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <img
          src={hero}
          alt="AIAHN"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[60%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Medellín, Colombia · 2026</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(4rem,16vw,14rem)] uppercase leading-[0.82] text-cream">
              Dos nombres.<br />
              Una marca.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* EL NOMBRE */}
      <section className="bg-background py-28 md:py-44 border-t border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal className="md:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— El nombre</p>
              <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.88] text-cream">
                AI<span className="font-serif-it not-italic md:italic">A</span>HN
              </h2>
              <p className="mt-6 font-serif-i text-2xl leading-snug text-cream/70">
                Al<span className="text-cream">ahia</span> + I<span className="text-cream">ahn</span>
              </p>
            </Reveal>
            <Reveal delay={150} className="md:col-span-6 md:col-start-7">
              <p className="text-base leading-relaxed text-cream/60 mb-6">
                AIAHN no es un acrónimo de agencia ni el nombre de una tendencia. Es el nombre de dos personas:
                <span className="text-cream"> Alahia</span> y <span className="text-cream">Iahn</span>.
                Dos hijos. Una marca fundada por su padre, escrita sobre el pecho como una promesa.
              </p>
              <p className="text-base leading-relaxed text-cream/60">
                Cada prenda lleva esos dos nombres. Cada costura recuerda por qué empezó esto.
                No es un proyecto de moda — es un documento de amor con forma de ropa.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOTO SPLIT */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={look1} alt="AIAHN editorial" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s]" />
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-bone flex items-end p-10 md:p-16">
          <Reveal>
            <p className="font-serif-i text-[clamp(1.6rem,4vw,3rem)] leading-snug text-ink/80">
              "La prenda no es disfraz.<br />
              Es archivo. Es memoria.<br />
              Cada hilo recuerda quién<br />
              fuimos antes de salir<br />
              a la calle."
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ink/40">— Diario de taller, 2026</p>
          </Reveal>
        </div>
      </section>

      {/* MEDELLÍN */}
      <section className="bg-background py-28 md:py-44 border-t border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— El lugar</p>
              <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] uppercase leading-[0.88] text-cream">
                Medellín,<br />Colombia.
              </h2>
            </Reveal>
            <div className="md:col-span-7 md:col-start-6 space-y-6">
              <Reveal delay={100}>
                <p className="text-base leading-relaxed text-cream/60">
                  AIAHN nace en Medellín — una ciudad que lleva décadas reinventándose sin pedir permiso.
                  No como inspiración turística sino como realidad diaria: la calle, el calor, la actitud
                  de una ciudad que viste con carácter propio.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <p className="text-base leading-relaxed text-cream/60">
                  Producción local. Cada pieza se corta, cose y termina en talleres de la ciudad.
                  No por tendencia sino por convicción: lo que se hace aquí, se queda aquí.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="pt-4 flex gap-12">
                  {[
                    { num: "100%", label: "Producción local" },
                    { num: "280+", label: "Horas por drop" },
                    { num: "01", label: "Drops lanzados" },
                  ].map(({ num, label }) => (
                    <div key={label}>
                      <p className="font-display text-3xl text-acid">{num}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-cream/40">{label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO — triple foto */}
      <section className="grid grid-cols-3 gap-px bg-border">
        {[look2, look3, p1].map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden bg-background">
            <img src={img} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s]" />
          </div>
        ))}
      </section>

      {/* LA FILOSOFÍA */}
      <section className="bg-background py-28 md:py-44 border-t border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-8">— La filosofía</p>
          </Reveal>

          <div className="space-y-px">
            {[
              {
                num: "01",
                title: "Hecho para durar",
                body: "No diseñamos para una temporada. Diseñamos para que la pieza envejezca con quien la usa. Peso real, costuras dobles, telas que ganan carácter con el uso.",
              },
              {
                num: "02",
                title: "Sin género como límite",
                body: "Los cortes oversize y los telas pesadas no tienen dueño. AIAHN es streetwear masculino porque así empezó — pero el diseño habla más alto que la etiqueta.",
              },
              {
                num: "03",
                title: "Edición limitada, siempre",
                body: "Cada drop es finito. No hay reposición infinita. Cuando se acaba, se acaba. Esa escasez no es marketing — es respeto por el proceso.",
              },
              {
                num: "04",
                title: "Local primero",
                body: "Medellín nos da el contexto, el talento y la exigencia. Todo lo que vendemos fue hecho a menos de 20 km de donde están leyendo esto.",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 60}>
                <div className="grid md:grid-cols-12 gap-6 py-10 border-b border-border">
                  <p className="md:col-span-1 font-display text-sm text-acid/60">{item.num}</p>
                  <h3 className="md:col-span-3 font-display text-xl uppercase tracking-tight text-cream">{item.title}</h3>
                  <p className="md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/55">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-background border-t border-border py-28 md:py-40">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.88] text-cream mb-10">
              Hecho por<br />
              <span className="font-serif-it normal-case text-cream/50">amor.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/collections/$handle"
              params={{ handle: "nuevo" }}
              className="group inline-flex items-center gap-3 bg-acid text-ink px-10 py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
            >
              Ver la colección
              <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
