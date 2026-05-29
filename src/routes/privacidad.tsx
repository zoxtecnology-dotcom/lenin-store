import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: pageTitle("Privacidad") },
      { name: "description", content: `Política de privacidad de ${BRAND.legal}. Cómo recopilamos, usamos y protegemos tu información.` },
    ],
  }),
  component: PrivacidadPage,
});

const SECTIONS = [
  {
    num: "01",
    title: "Responsable del tratamiento",
    body: `${BRAND.legal}, con domicilio en ${BRAND.cityFull}, es la empresa responsable del tratamiento de tus datos personales. Para cualquier consulta relacionada con tus datos escríbenos a ${EMAIL.data}.`,
  },
  {
    num: "02",
    title: "Información que recopilamos",
    body: `Recopilamos nombre completo, dirección de envío, correo electrónico y teléfono al momento de una compra. Los datos de pago son procesados directamente por pasarelas certificadas — ${BRAND.name} no almacena números de tarjeta ni información bancaria. También recopilamos datos de navegación a través de cookies propias.`,
  },
  {
    num: "03",
    title: "Finalidad del tratamiento",
    body: "Usamos tu información para: procesar y gestionar tus pedidos, enviarte confirmaciones de compra y actualizaciones de envío, comunicarte nuevos drops y novedades de la marca (puedes cancelar esta suscripción en cualquier momento), y cumplir con las obligaciones legales aplicables.",
  },
  {
    num: "04",
    title: "Tus derechos",
    body: `De acuerdo con la Ley 1581 de 2012, tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales. También puedes revocar la autorización otorgada en cualquier momento. Para ejercer estos derechos envía un correo a ${EMAIL.data} con tu nombre completo y la solicitud.`,
  },
  {
    num: "05",
    title: "Seguridad",
    body: "Implementamos medidas técnicas y organizativas para proteger tu información contra accesos no autorizados, alteración, divulgación o destrucción. El acceso a datos personales está restringido únicamente al personal que necesita conocerlos para operar el servicio.",
  },
  {
    num: "06",
    title: "Vigencia y cambios",
    body: `Esta política fue actualizada en enero de ${BRAND.year}. Podemos modificarla en cualquier momento publicando la versión actualizada en este sitio. El uso continuado del sitio después de los cambios implica la aceptación de la política vigente.`,
  },
];

function PrivacidadPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Legal</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream">
              Privacidad
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30">
              Ley 1581 de 2012 — Actualizado: Enero {BRAND.year}
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
