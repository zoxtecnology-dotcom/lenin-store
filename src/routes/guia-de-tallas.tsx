import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { EMAIL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/guia-de-tallas")({
  head: () => ({
    meta: [
      { title: pageTitle("Guía de Tallas") },
      { name: "description", content: "Guía de tallas AIAHN. Cómo tomar tus medidas y elegir la talla correcta para nuestros drops." },
    ],
  }),
  component: GuiaDeTallasPage,
});

const SIZES = [
  { talla: "S",   pecho: "96–100",  hombros: "43",  largo: "70",  cintura: "80–84"  },
  { talla: "M",   pecho: "100–104", hombros: "45",  largo: "72",  cintura: "84–88"  },
  { talla: "L",   pecho: "104–110", hombros: "47",  largo: "74",  cintura: "88–94"  },
  { talla: "XL",  pecho: "110–116", hombros: "49",  largo: "76",  cintura: "94–100" },
  { talla: "XXL", pecho: "116–122", hombros: "51",  largo: "78",  cintura: "100–106"},
];

const HOW_TO = [
  {
    num: "01",
    title: "Pecho",
    body: "Mide alrededor de la parte más ancha del pecho, pasando por las axilas. Mantén la cinta métrica horizontal y sin apretar.",
  },
  {
    num: "02",
    title: "Hombros",
    body: "Mide de extremo a extremo por la espalda, de la costura del hombro derecho a la del izquierdo.",
  },
  {
    num: "03",
    title: "Largo",
    body: "Mide desde la costura del hombro hasta el dobladillo inferior de la prenda.",
  },
  {
    num: "04",
    title: "Cintura",
    body: "Mide alrededor de la parte más estrecha del torso, generalmente por encima del ombligo.",
  },
];

function GuiaDeTallasPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Ayuda</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(2.8rem,9vw,8rem)] uppercase leading-[0.88] text-cream">
              Guía de<br />Tallas
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Todas las medidas son en centímetros y corresponden a las medidas del cuerpo, no de la prenda.
              AIAHN usa corte oversize — si quieres un fit más ceñido, baja una talla.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tabla de tallas */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-10">— Tabla de tallas (cm)</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {["Talla", "Pecho", "Hombros", "Largo", "Cintura"].map((h) => (
                      <th key={h} className="text-left py-4 pr-8 text-[10px] uppercase tracking-[0.3em] text-cream/40 font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((row, i) => (
                    <tr key={row.talla} className={`border-b border-border ${i % 2 === 0 ? "" : "bg-bone/[0.02]"}`}>
                      <td className="py-5 pr-8 font-display text-base text-acid">{row.talla}</td>
                      <td className="py-5 pr-8 text-cream/70">{row.pecho}</td>
                      <td className="py-5 pr-8 text-cream/70">{row.hombros}</td>
                      <td className="py-5 pr-8 text-cream/70">{row.largo}</td>
                      <td className="py-5 pr-8 text-cream/70">{row.cintura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-[11px] text-cream/30 uppercase tracking-[0.2em]">
              * Las medidas pueden variar ±1 cm dependiendo del tejido y el proceso de lavado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cómo medirte */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-10">— Cómo tomar tus medidas</p>
          </Reveal>
          <div className="space-y-px">
            {HOW_TO.map((item, i) => (
              <Reveal key={item.num} delay={i * 50}>
                <div className="grid md:grid-cols-12 gap-6 py-10 border-b border-border">
                  <p className="md:col-span-1 font-display text-sm text-acid/60">{item.num}</p>
                  <h2 className="md:col-span-2 font-display text-lg uppercase tracking-tight text-cream">{item.title}</h2>
                  <p className="md:col-span-8 md:col-start-4 text-sm leading-relaxed text-cream/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fit note */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-10 md:p-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">Fit oversize</p>
                <p className="text-sm leading-relaxed text-cream/60">
                  Las prendas de AIAHN tienen un corte oversize estructurado. La talla M en nuestro catálogo
                  tiene un fit equivalente a un L o L/XL en corte regular. Si prefieres un fit ceñido,
                  baja una talla.
                </p>
              </div>
              <div className="bg-background p-10 md:p-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">¿Dudas con la talla?</p>
                <p className="text-sm leading-relaxed text-cream/60">
                  Escríbenos a{" "}
                  <a href={`mailto:${EMAIL.general}`} className="text-cream underline underline-offset-4 hover:text-acid transition-colors">
                    {EMAIL.general}
                  </a>{" "}
                  con tus medidas y te ayudamos a elegir la talla ideal. No queremos que tengas que hacer un cambio.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
