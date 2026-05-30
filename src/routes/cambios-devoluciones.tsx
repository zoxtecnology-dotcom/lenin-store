import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { EMAIL, pageTitle } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cambios-devoluciones")({
  head: () => ({
    meta: [
      { title: pageTitle("Cambios y Devoluciones") },
      { name: "description", content: "Política de cambios y devoluciones de AIAHN. 15 días para cambiar tu prenda, sin complicaciones." },
    ],
  }),
  component: CambiosPage,
});

const SECTIONS = [
  {
    num: "01",
    title: "Nuestra política",
    body: "Dado que AIAHN opera bajo un modelo de drops limitados, no realizamos devoluciones en dinero. Sí ofrecemos cambios de talla o referencia y notas crédito dentro de los plazos establecidos.",
  },
  {
    num: "02",
    title: "Condiciones",
    body: "La prenda debe estar sin uso, con todas sus etiquetas originales intactas y en su empaque original. No se aceptan cambios de prendas con señales de uso, lavado, alteración o daño causado por el cliente.",
  },
  {
    num: "03",
    title: "Plazo",
    body: "Tienes 15 días calendario desde la fecha de recepción del pedido para solicitar un cambio o nota crédito. Pasado ese plazo no podemos procesar la solicitud.",
  },
  {
    num: "04",
    title: "Proceso",
    body: `1. Escríbenos a ${EMAIL.returns} con tu número de pedido, el artículo a cambiar y el motivo. 2. Te enviamos las instrucciones de retorno. 3. Una vez recibida y revisada la prenda, procesamos el cambio o nota crédito en máximo 5 días hábiles.`,
  },
  {
    num: "05",
    title: "Artículos en sale",
    body: "Los artículos de venta especial, outlet o liquidación no aplican para cambios ni notas crédito. Esto se indica claramente en la descripción de cada producto.",
  },
  {
    num: "06",
    title: "Producto defectuoso",
    body: `Si la prenda tiene un defecto de fabricación, el proceso es diferente y completamente a nuestro cargo. Escríbenos a ${EMAIL.general} con fotos claras del defecto dentro de los 30 días siguientes a la recepción.`,
  },
];

function CambiosPage() {
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
              Cambios y<br />Devoluciones
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/55">
              Queremos que cada prenda te quede perfecta. Si algo no va bien, lo arreglamos.
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
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${EMAIL.returns}`}
                className="inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
              >
                Iniciar cambio
              </a>
              <Link
                to="/guia-de-tallas"
                className="inline-flex items-center gap-3 border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors"
              >
                Ver guía de tallas
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formulario de reclamación */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-6">— Formulario</p>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.88] text-cream mb-6">
                Iniciar<br />reclamación
              </h2>
              <p className="text-sm leading-relaxed text-cream/55">
                Diligencia el formulario y te contactamos en máximo 2 días hábiles. Ten a la mano el número de pedido — está en el correo de confirmación.
              </p>
            </Reveal>

            <Reveal delay={80} className="md:col-span-7 md:col-start-6">
              <ClaimForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const MOTIVOS = [
  "Cambio de talla",
  "Producto defectuoso",
  "Pedido incorrecto",
  "Producto no llegó",
  "Otro",
];

function ClaimForm() {
  const [form, setForm] = useState({
    nombre: "", email: "", pedido: "", motivo: "", descripcion: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);

  function set(k: keyof typeof form, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      `Pedido: ${form.pedido}`,
      `Motivo: ${form.motivo}`,
      `Descripción: ${form.descripcion}`,
      file ? `Adjunto: ${file.name}` : "",
    ].filter(Boolean).join("\n");
    window.open(`mailto:${EMAIL.returns}?subject=Reclamación%20pedido%20${encodeURIComponent(form.pedido)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }

  const inputCls = "w-full bg-transparent border-b border-border text-sm text-cream placeholder:text-cream/30 outline-none py-3 focus:border-cream/60 transition-colors";
  const labelCls = "block text-[9px] uppercase tracking-[0.3em] text-cream/40 mb-1";

  if (sent) {
    return (
      <div className="border border-border p-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">¡Listo!</p>
        <p className="font-display text-2xl uppercase text-cream mb-3">Reclamación enviada</p>
        <p className="text-sm text-cream/55">
          Se abrió tu cliente de correo con la reclamación lista. Envíala y te respondemos en máximo 2 días hábiles.
        </p>
        <button onClick={() => setSent(false)} className="mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors">
          Enviar otra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>Nombre completo</label>
          <input required value={form.nombre} onChange={(e) => set("nombre", e.target.value)}
            placeholder="Tu nombre" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Correo electrónico</label>
          <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
            placeholder="tu@email.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Número de pedido</label>
        <input required value={form.pedido} onChange={(e) => set("pedido", e.target.value)}
          placeholder="#AIAHN-0001" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Motivo</label>
        <div className="flex flex-wrap gap-2 pt-2">
          {MOTIVOS.map((m) => (
            <button key={m} type="button" onClick={() => set("motivo", m)}
              className={cn(
                "px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-colors",
                form.motivo === m ? "bg-acid text-ink border-acid" : "border-border text-cream/60 hover:border-cream/40"
              )}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Descripción</label>
        <textarea required value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)}
          placeholder="Describe el problema con el mayor detalle posible..."
          rows={4}
          className="w-full bg-transparent border border-border text-sm text-cream placeholder:text-cream/30 outline-none p-3 focus:border-cream/60 transition-colors resize-none" />
      </div>

      <div>
        <label className={labelCls}>Foto del producto (opcional)</label>
        <label className="flex items-center gap-3 border border-dashed border-border px-4 py-3 cursor-pointer hover:border-cream/40 transition-colors group">
          <Paperclip size={14} strokeWidth={1.5} className="text-cream/40 group-hover:text-cream/70 transition-colors shrink-0" />
          <span className="text-sm text-cream/40 group-hover:text-cream/60 transition-colors truncate">
            {file ? file.name : "Adjuntar foto..."}
          </span>
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/25">JPG, PNG o WEBP — máx. 10MB</p>
      </div>

      <button
        type="submit"
        disabled={!form.nombre || !form.email || !form.pedido || !form.motivo || !form.descripcion}
        className="flex items-center gap-3 bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        <Send size={13} strokeWidth={1.5} />
        Enviar reclamación
      </button>
    </form>
  );
}
