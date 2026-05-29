import { Link } from "@tanstack/react-router";
// eslint-disable-next-line @typescript-eslint/no-deprecated
import { Instagram, Youtube } from "lucide-react";
import { BRAND, SOCIAL } from "@/lib/brand";

const NAV_COLS = [
  {
    h: "Marca",
    links: [
      { label: "Sobre nosotros", to: "/historia" },
      { label: "Packs", to: "/packs" },
      { label: "Tiendas", to: "/tiendas" },
      { label: "Contacto", to: "/contacto" },
      { label: "Prensa", to: "/prensa" },
    ],
  },
  {
    h: "Ayuda",
    links: [
      { label: "Envíos", to: "/envios" },
      { label: "Cambios y devoluciones", to: "/cambios-devoluciones" },
      { label: "Guía de tallas", to: "/guia-de-tallas" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    h: "Legal",
    links: [
      { label: "Privacidad", to: "/privacidad" },
      { label: "Términos", to: "/terminos" },
      { label: "Cookies", to: "/cookies" },
      { label: "Aviso legal", to: "/aviso" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background pt-20">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cream/50">{BRAND.name}</p>
            <p className="mt-5 max-w-[18rem] font-serif-i text-base leading-snug text-cream/80">
              {BRAND.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4 text-cream/70">
              <a href={SOCIAL.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-acid transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href={SOCIAL.tiktok.url} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-acid transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 3v2.5a4.5 4.5 0 0 0 4.5 4.5V13a7.5 7.5 0 0 1-4.5-1.5V16a5.5 5.5 0 1 1-5.5-5.5" />
                </svg>
              </a>
              <a href={SOCIAL.youtube.url} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-acid transition-colors">
                <Youtube size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {NAV_COLS.map((col) => (
            <div key={col.h}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/50">{col.h}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-underline text-sm text-cream/85 hover:text-cream">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.25em] text-cream/40">
          <p>{BRAND.copyright}</p>
          <p>{BRAND.madeIn}</p>
        </div>

      </div>
    </footer>
  );
}
