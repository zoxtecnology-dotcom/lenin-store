import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BRAND, EMAIL, pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: pageTitle("Cookies") },
      { name: "description", content: `Política de cookies de ${BRAND.store}. Qué cookies usamos y cómo gestionarlas.` },
    ],
  }),
  component: CookiesPage,
});

const SECTIONS = [
  {
    num: "01",
    title: "¿Qué son las cookies?",
    body: "Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo al visitarlos. Permiten que el sitio recuerde tus preferencias y mejoran tu experiencia de navegación.",
  },
  {
    num: "02",
    title: "Cookies que usamos",
    body: "Cookies técnicas necesarias: permiten la navegación y el uso del carrito de compras (no pueden desactivarse). Cookies analíticas: recopilan información anónima sobre cómo se usa el sitio, para mejorar la experiencia. Cookies de preferencias: guardan tu idioma y configuración de sesión.",
  },
  {
    num: "03",
    title: "Cookies de terceros",
    body: "Podemos usar servicios de análisis como Google Analytics o herramientas de pasarelas de pago que instalan sus propias cookies. Estos terceros tienen sus propias políticas de privacidad que están fuera de nuestro control.",
  },
  {
    num: "04",
    title: "Cómo gestionar las cookies",
    body: "Puedes configurar tu navegador para rechazar todas o algunas cookies, o para que te avise cuando un sitio intente instalarlas. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento del sitio, incluyendo la posibilidad de realizar compras.",
  },
  {
    num: "05",
    title: "Más información",
    body: `Para cualquier duda sobre el uso de cookies escríbenos a ${EMAIL.data}. Esta política fue actualizada en enero de ${BRAND.year} y puede ser modificada en cualquier momento publicando la versión actualizada en este sitio.`,
  },
];

function CookiesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Legal</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.88] text-cream">
              Cookies
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-cream/30">
              Actualizado: Enero {BRAND.year}
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
