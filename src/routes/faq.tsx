import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, SOCIAL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: pageTitle("Preguntas Frecuentes") },
      { name: "description", content: `Respuestas a las dudas más comunes sobre pedidos, envíos, tallas y la marca ${BRAND.name}.` },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    cat: "Pedidos",
    items: [
      {
        q: "¿Cuándo llega mi pedido?",
        a: `Los pedidos se procesan dentro de las 48 horas siguientes a la confirmación del pago. Una vez despachado, el tiempo estimado es de 2 a 4 días hábiles en ciudades principales y 4 a 7 en el resto de ${BRAND.country}.`,
      },
      {
        q: "¿Cómo hago seguimiento de mi pedido?",
        a: "Al momento del despacho recibirás un correo con el número de guía y el enlace de rastreo. Si no lo ves en tu bandeja principal, revisa la carpeta de spam.",
      },
      {
        q: "¿Puedo cancelar o modificar un pedido?",
        a: `Si el pedido aún no ha sido despachado, escríbenos inmediatamente a ${EMAIL.general}. Una vez en tránsito no es posible modificar ni cancelar.`,
      },
    ],
  },
  {
    cat: "Envíos",
    items: [
      {
        q: "¿Hacen envíos internacionales?",
        a: `Por ahora solo enviamos dentro de ${BRAND.country}. Estamos trabajando para habilitar envíos internacionales próximamente. Síguenos en Instagram para ser el primero en saberlo.`,
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: "El envío estándar tiene un costo de $12.000 COP. Es gratis en compras superiores a $150.000 COP.",
      },
    ],
  },
  {
    cat: "Tallas y prendas",
    items: [
      {
        q: "¿Cómo sé qué talla elegir?",
        a: "Todas nuestras prendas tienen corte oversize. Revisa nuestra guía de tallas con medidas exactas. Si tienes dudas escríbenos con tus medidas y te ayudamos.",
      },
      {
        q: "¿Las prendas encogen con el lavado?",
        a: "Nuestras telas son tratadas para minimizar el encogimiento. Recomendamos lavado a mano o máquina en frío, vuelta al revés, sin centrifugado fuerte.",
      },
    ],
  },
  {
    cat: "Cambios y devoluciones",
    items: [
      {
        q: "¿Puedo devolver mi compra?",
        a: `No realizamos devoluciones en dinero dado nuestro modelo de drops limitados. Sí ofrecemos cambios de talla o referencia y notas crédito dentro de los 15 días siguientes a la recepción del pedido.`,
      },
      {
        q: "¿Cómo inicio un cambio?",
        a: `Escríbenos a ${EMAIL.returns} con tu número de pedido y el motivo del cambio. Te enviaremos las instrucciones de retorno.`,
      },
    ],
  },
  {
    cat: "La marca",
    items: [
      {
        q: "¿Hay reposición de los drops?",
        a: `No. Cuando un drop se agota, se agota. Actívate en ${SOCIAL.instagram.handle} para no perderte el siguiente lanzamiento.`,
      },
      {
        q: "¿Dónde están las tiendas físicas?",
        a: `${BRAND.name} es una marca 100% online. Realizamos pop-ups periódicos en ${BRAND.city} — las fechas y ubicaciones se anuncian exclusivamente en nuestro Instagram.`,
      },
      {
        q: `¿Qué significa ${BRAND.name}?`,
        a: `${BRAND.name} es la combinación de dos nombres: Alahia e Iahn. Los hijos de quien fundó la marca. Cada prenda lleva esos dos nombres. No es un proyecto de moda — es un documento de amor con forma de ropa.`,
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-sm text-cream/85 group-hover:text-cream transition-colors leading-snug">{q}</span>
        <span className="shrink-0 mt-0.5 text-acid">
          {open ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
        </span>
      </button>
      {open && (
        <p className="text-sm leading-relaxed text-cream/55 pb-6 max-w-2xl">{a}</p>
      )}
    </div>
  );
}

function FaqPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Ayuda</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream">
              Preguntas<br />Frecuentes
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-8 md:col-start-3">
              {FAQS.map((cat, ci) => (
                <Reveal key={cat.cat} delay={ci * 40}>
                  <div className="mb-14">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-4">{cat.cat}</p>
                    {cat.items.map((item) => (
                      <FaqItem key={item.q} q={item.q} a={item.a} />
                    ))}
                  </div>
                </Reveal>
              ))}

              <Reveal>
                <div className="mt-10 p-8 border border-border">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-3">¿No encontraste tu respuesta?</p>
                  <p className="text-sm text-cream/60 leading-relaxed mb-5">
                    Escríbenos directamente — respondemos en menos de 24 horas.
                  </p>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-3 bg-acid text-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
                  >
                    Contactar
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
