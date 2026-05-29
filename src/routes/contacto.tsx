import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { EMAIL, SOCIAL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: pageTitle("Contacto") },
      { name: "description", content: "Contáctanos para pedidos, PQRS, prensa o colaboraciones. Respondemos en menos de 24 horas." },
    ],
  }),
  component: ContactoPage,
});

const CHANNELS = [
  {
    icon: Mail,
    label: "Email general",
    value: EMAIL.general,
    desc: "Pedidos, cambios, dudas generales.",
    href: `mailto:${EMAIL.general}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: SOCIAL.whatsapp.display,
    desc: "Lunes a viernes, 9am – 6pm.",
    href: SOCIAL.whatsapp.url,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: SOCIAL.instagram.handle,
    desc: "DMs abiertos. Drops, novedades y más.",
    href: SOCIAL.instagram.url,
  },
];

const PQRS = [
  { code: "P", label: "Petición", desc: "Solicita información sobre productos, procesos o la marca." },
  { code: "Q", label: "Queja", desc: "Reporta inconformidades con tu pedido o el servicio recibido." },
  { code: "R", label: "Reclamo", desc: "Exige solución a un incumplimiento o falla en tu compra." },
  { code: "S", label: "Sugerencia", desc: "Comparte ideas para mejorar nuestros productos o procesos." },
];

function ContactoPage() {
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
              Contacto
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Respondemos en menos de 24 horas. Si tu duda es urgente, escríbenos por WhatsApp o Instagram.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Canales */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-12">— Canales de atención</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {CHANNELS.map((ch) => (
              <Reveal key={ch.label}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex flex-col gap-4 bg-background p-10 md:p-12 hover:bg-bone/5 transition-colors"
                >
                  <ch.icon size={20} strokeWidth={1.5} className="text-acid" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1">{ch.label}</p>
                    <p className="font-display text-lg uppercase text-cream group-hover:text-acid transition-colors">{ch.value}</p>
                    <p className="mt-2 text-sm text-cream/50">{ch.desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PQRS */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— PQRS</p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.88] text-cream">
                Peticiones,<br />Quejas,<br />Reclamos<br />y Sugerencias
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-cream/55">
                Para peticiones formales envía un correo a{" "}
                <a href={`mailto:${EMAIL.pqrs}`} className="text-cream underline underline-offset-4 hover:text-acid transition-colors">
                  {EMAIL.pqrs}
                </a>{" "}
                indicando el tipo de solicitud, tu número de pedido (si aplica) y una descripción detallada. Respondemos en máximo 15 días hábiles.
              </p>
            </Reveal>
            <div className="md:col-span-7 md:col-start-6 space-y-px">
              {PQRS.map((item, i) => (
                <Reveal key={item.code} delay={i * 60}>
                  <div className="flex gap-6 py-8 border-b border-border">
                    <p className="font-display text-2xl text-acid/50 w-8 shrink-0">{item.code}</p>
                    <div>
                      <p className="font-display text-base uppercase tracking-tight text-cream mb-2">{item.label}</p>
                      <p className="text-sm text-cream/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Links rápidos */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-8">— También puede servirte</p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Política de envíos", to: "/envios" },
              { label: "Cambios y devoluciones", to: "/cambios-devoluciones" },
              { label: "Guía de tallas", to: "/guia-de-tallas" },
              { label: "FAQ", to: "/faq" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="border border-border text-cream/70 hover:border-cream/40 hover:text-cream px-5 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
