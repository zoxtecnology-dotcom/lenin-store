import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BRAND, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: pageTitle("Términos y Condiciones") },
      { name: "description", content: `Términos y condiciones de uso de ${BRAND.store}. Compras, drops limitados y propiedad intelectual.` },
    ],
  }),
  component: TerminosPage,
});

const SECTIONS = [
  {
    num: "01",
    title: "Aceptación",
    body: `Al acceder y utilizar ${BRAND.domain} aceptas estos términos en su totalidad. Si no estás de acuerdo con alguno de ellos, te pedimos no utilizar el sitio ni realizar compras a través de él.`,
  },
  {
    num: "02",
    title: "El modelo de drops",
    body: `${BRAND.name} opera bajo un sistema de lanzamientos limitados. Cada drop tiene un número finito de unidades — no hay reposición una vez agotado el stock. La disponibilidad no está garantizada más allá del inventario publicado. La escasez es estructural, no de marketing.`,
  },
  {
    num: "03",
    title: "Precios y pagos",
    body: "Todos los precios están expresados en pesos colombianos (COP) e incluyen IVA donde aplica. El pago se realiza al momento de la compra. AIAHN se reserva el derecho de modificar precios sin previo aviso, pero los precios de pedidos ya confirmados no cambian.",
  },
  {
    num: "04",
    title: "Disponibilidad",
    body: "La disponibilidad del sitio no está garantizada de manera ininterrumpida. Podemos realizar mantenimientos, actualizaciones o pausas temporales. No seremos responsables por daños derivados de la no disponibilidad temporal del sitio.",
  },
  {
    num: "05",
    title: "Propiedad intelectual",
    body: `El nombre ${BRAND.name}, el logotipo, las fotografías, los diseños, los textos y cualquier otro elemento del sitio son propiedad exclusiva de ${BRAND.legal}. Queda estrictamente prohibida su reproducción, distribución o uso con fines comerciales sin autorización escrita.`,
  },
  {
    num: "06",
    title: "Limitación de responsabilidad",
    body: `${BRAND.name} no será responsable por demoras en envíos causadas por terceros, situaciones de fuerza mayor o eventos fuera de su control. Tampoco por daños indirectos, lucro cesante o perjuicios derivados del uso o la imposibilidad de uso de sus productos.`,
  },
  {
    num: "07",
    title: "Ley aplicable",
    body: `Estos términos se rigen por las leyes de la República de ${BRAND.country}. Cualquier conflicto derivado de su interpretación o aplicación será resuelto ante los jueces competentes de la ciudad de ${BRAND.city}, ${BRAND.country}.`,
  },
];

function TerminosPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Legal</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(2.6rem,9vw,8rem)] uppercase leading-[0.88] text-cream">
              Términos y<br />Condiciones
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30">
              Versión 1.0 — Enero {BRAND.year}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="space-y-px">
            {SECTIONS.map((item, i) => (
              <Reveal key={item.num} delay={i * 50}>
                <div className="grid md:grid-cols-12 gap-6 py-10 border-b border-border">
                  <p className="md:col-span-1 font-display text-sm text-acid/60">{item.num}</p>
                  <h2 className="md:col-span-3 font-display text-lg uppercase tracking-tight text-cream">{item.title}</h2>
                  <p className="md:col-span-7 md:col-start-5 text-sm leading-relaxed text-cream/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
