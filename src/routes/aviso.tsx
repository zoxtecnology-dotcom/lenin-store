import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/aviso")({
  head: () => ({
    meta: [
      { title: pageTitle("Aviso Legal") },
      { name: "description", content: `Aviso legal de ${BRAND.legal}. Información de la empresa y condiciones de uso del sitio.` },
    ],
  }),
  component: AvisoPage,
});

const COMPANY = [
  { label: "Razón social", value: BRAND.legal },
  { label: "País",         value: BRAND.country },
  { label: "Ciudad",       value: BRAND.cityLegal },
  { label: "Actividad",    value: "Comercio de prendas de vestir" },
  { label: "Sitio web",    value: BRAND.domain },
  { label: "Correo",       value: EMAIL.legal },
];

const SECTIONS = [
  {
    num: "01",
    title: "Objeto",
    body: `El presente aviso legal regula el acceso y el uso del sitio web ${BRAND.domain}, titularidad de ${BRAND.legal}. El acceso al sitio implica la aceptación plena y sin reservas de las condiciones aquí establecidas.`,
  },
  {
    num: "02",
    title: "Propiedad intelectual",
    body: `Todos los contenidos del sitio web — incluyendo textos, fotografías, ilustraciones, logos, marcas, diseños, código fuente y cualquier otro elemento — son propiedad de ${BRAND.legal} o de sus licenciantes, y están protegidos por la legislación colombiana e internacional de propiedad intelectual.`,
  },
  {
    num: "03",
    title: "Uso permitido",
    body: `El usuario puede consultar los contenidos del sitio para uso personal y no comercial. Queda prohibida cualquier reproducción, distribución, comunicación pública, transformación o explotación con fines comerciales sin autorización expresa y por escrito de ${BRAND.legal}.`,
  },
  {
    num: "04",
    title: "Exención de responsabilidad",
    body: `${BRAND.legal} no garantiza la disponibilidad ininterrumpida del sitio ni la ausencia de errores en sus contenidos. No será responsable de los daños o perjuicios derivados del uso o la imposibilidad de uso del sitio por causas ajenas a su control.`,
  },
  {
    num: "05",
    title: "Ley aplicable",
    body: `Este aviso legal se rige por las leyes de la República de ${BRAND.country}. Para la resolución de cualquier conflicto derivado del acceso o uso del sitio, las partes se someten expresamente a la jurisdicción de los juzgados y tribunales de ${BRAND.city}, ${BRAND.country}.`,
  },
];

function AvisoPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Legal</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream">
              Aviso Legal
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30">
              Versión 1.0 — Enero {BRAND.year}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Datos de la empresa */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-8">— Datos de la empresa</p>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border max-w-3xl">
              {COMPANY.map(({ label, value }) => (
                <div key={label} className="bg-background p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cream/35 mb-1">{label}</p>
                  <p className="text-sm text-cream">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Secciones legales */}
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

          <Reveal delay={80}>
            <div className="mt-16 flex flex-wrap gap-3">
              {[
                { label: "Privacidad", to: "/privacidad" },
                { label: "Términos y condiciones", to: "/terminos" },
                { label: "Cookies", to: "/cookies" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="border border-border text-cream/60 hover:border-cream/40 hover:text-cream px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
