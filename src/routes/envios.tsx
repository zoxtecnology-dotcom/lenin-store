import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, SOCIAL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/envios")({
  head: () => ({
    meta: [
      { title: pageTitle("Envíos") },
      { name: "description", content: `Política de envíos de ${BRAND.name}. Enviamos a toda Colombia con seguimiento en tiempo real.` },
    ],
  }),
  component: EnviosPage,
});

const SECTIONS = [
  {
    num: "01",
    title: "Cobertura",
    body: `Enviamos a toda ${BRAND.country}. Trabajamos con las principales empresas de mensajería para que tu pedido llegue en perfectas condiciones, sin importar el municipio.`,
  },
  {
    num: "02",
    title: "Tiempos de entrega",
    body: `Ciudades principales (${BRAND.city}, Bogotá, Cali, Barranquilla, Cartagena): 2 a 4 días hábiles. Resto del país: 4 a 7 días hábiles. Los pedidos se procesan dentro de las 48 horas siguientes a la confirmación del pago.`,
  },
  {
    num: "03",
    title: "Costos de envío",
    body: "Envío estándar a cualquier ciudad: $12.000 COP. Envío gratis en compras superiores a $150.000 COP. El costo se calcula automáticamente al finalizar la compra.",
  },
  {
    num: "04",
    title: "Seguimiento",
    body: `Una vez despachado tu pedido recibirás un correo con el número de guía y el enlace directo para rastrear en tiempo real. También puedes escribirnos a ${EMAIL.general} con tu número de pedido.`,
  },
  {
    num: "05",
    title: "Envíos internacionales",
    body: "Por ahora solo enviamos dentro de Colombia. Estamos trabajando para habilitar envíos internacionales próximamente — síguenos en Instagram para ser los primeros en saberlo.",
  },
  {
    num: "06",
    title: "Pedido dañado o incorrecto",
    body: `Si tu pedido llega en mal estado o recibiste un artículo diferente al que compraste, escríbenos a ${EMAIL.general} dentro de las 48 horas siguientes a la recepción con fotos del paquete y la prenda. Lo solucionamos.`,
  },
];

function EnviosPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Ayuda</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream">
              Envíos
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Enviamos a toda Colombia. Rápido, con seguimiento y sin letra pequeña.
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

          <Reveal delay={100}>
            <div className="mt-16 bg-bone/5 border border-border p-8 md:p-10 max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-3">¿Tienes alguna duda?</p>
              <p className="text-sm text-cream/60 leading-relaxed">
                Escríbenos a{" "}
                <a href={`mailto:${EMAIL.general}`} className="text-cream underline underline-offset-4 hover:text-acid transition-colors">
                  {EMAIL.general}
                </a>{" "}
                o por DM en{" "}
                <a href={SOCIAL.instagram.url} target="_blank" rel="noreferrer" className="text-cream underline underline-offset-4 hover:text-acid transition-colors">
                  {SOCIAL.instagram.handle}
                </a>
                . Respondemos en menos de 24 horas.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
