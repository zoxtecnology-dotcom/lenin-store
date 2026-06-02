import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useSettings } from "@/lib/settings";

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
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

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
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-acid transition-colors">
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
              )}
              {settings.tiktok_url && (
                <a href={settings.tiktok_url} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-acid transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 3v2.5a4.5 4.5 0 0 0 4.5 4.5V13a7.5 7.5 0 0 1-4.5-1.5V16a5.5 5.5 0 1 1-5.5-5.5" />
                  </svg>
                </a>
              )}
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-acid transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {settings.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-acid transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              )}
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
          <p>© {currentYear} {BRAND.legal} — Todos los derechos reservados</p>
          <p>{BRAND.madeIn}</p>
        </div>

      </div>
    </footer>
  );
}
