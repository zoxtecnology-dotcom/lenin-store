import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background pt-20">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cream/50">AIAHN</p>
            <p className="mt-5 max-w-[18rem] font-serif-i text-base leading-snug text-cream/80">
              Hecho por amor. Vestido con actitud. Medellín, Colombia.
            </p>
            <div className="mt-6 flex items-center gap-4 text-cream/70">
              <a href="#" aria-label="Instagram" className="hover:text-acid transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-acid transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 3v2.5a4.5 4.5 0 0 0 4.5 4.5V13a7.5 7.5 0 0 1-4.5-1.5V16a5.5 5.5 0 1 1-5.5-5.5" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-acid transition-colors">
                <Youtube size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {[
            { h: "AIAHN", links: ["Sobre nosotros", "Tiendas", "Contacto", "Prensa"] },
            { h: "Ayuda", links: ["Envíos", "Cambios y devoluciones", "Guía de tallas", "FAQ"] },
            { h: "Legal", links: ["Privacidad", "Términos", "Cookies", "Aviso"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/50">{col.h}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="link-underline text-sm text-cream/85 hover:text-cream">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <p>© 2026 AIAHN Store S.A.S — Todos los derechos reservados</p>
          <p>Made with love in Medellín</p>
        </div>

        <div aria-hidden className="-mb-2 mt-10 overflow-hidden">
          <h3
            className="text-outline font-display select-none uppercase leading-[0.8] tracking-[-0.04em]"
            style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
          >
            AI<span className="font-serif-it not-italic md:italic">A</span>HN
          </h3>
        </div>
      </div>
    </footer>
  );
}
