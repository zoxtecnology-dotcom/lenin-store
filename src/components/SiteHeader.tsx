import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, ChevronDown, X, Menu, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { megaCategories } from "@/lib/collections";
import { SearchModal } from "@/components/SearchModal";
import { cn } from "@/lib/utils";

const announcements = [
  "Envíos a toda Colombia",
  "Envío gratis desde $200.000",
  "Nueva colección Drop 01",
  "AIAHN Store",
  "Streetwear masculino hecho en Medellín",
];

interface SiteHeaderProps {
  transparentTop?: boolean;
}

export function SiteHeader({ transparentTop }: SiteHeaderProps) {
  const { count, setOpen } = useCart();
  const { location } = useRouterState();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hombreExpanded, setHombreExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const isActive = (path: string) => location.pathname.startsWith(path);

  function openMega() {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }

  function scheduleMegaClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <div className="bg-acid text-ink overflow-hidden py-2">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0">
                {announcements.map((text, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-[11px] font-medium uppercase tracking-[0.28em] mx-6">{text}</span>
                    <span className="text-ink/40 mx-1">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main header */}
        <header className={cn(
          "border-b border-border transition-colors duration-300",
          transparentTop && !megaOpen ? "bg-background/80 backdrop-blur-sm" : "bg-background"
        )}>
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">

            {/* Logo */}
            <Link to="/" className="shrink-0 z-10">
              <span className="block bg-acid px-2 py-0.5 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink">
                AI<span className="font-serif-it not-italic">A</span>HN
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.28em]">
              <NavLink to="/collections/$handle" params={{ handle: "nuevo" }} active={isActive("/collections/nuevo")}>Nuevo</NavLink>

              {/* HOMBRE with mega menu trigger */}
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleMegaClose}
              >
                <Link
                  to="/collections/$handle"
                  params={{ handle: "hombre" }}
                  className={cn(
                    "relative flex items-center gap-1 transition-colors group",
                    isActive("/collections/hombre") || megaOpen ? "text-cream" : "text-cream/70 hover:text-cream"
                  )}
                >
                  HOMBRE
                  <ChevronDown
                    size={11}
                    strokeWidth={1.5}
                    className={cn("transition-transform duration-200", megaOpen && "rotate-180")}
                  />
                  <span className={cn(
                    "absolute -bottom-px left-0 h-px bg-cream transition-transform duration-300 origin-left",
                    isActive("/collections/hombre") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} style={{ width: "calc(100% - 16px)" }} />
                </Link>
              </div>

              <NavLink to="/collections/$handle" params={{ handle: "camisetas" }} active={isActive("/collections/camisetas")}>Camisetas</NavLink>
              <NavLink to="/collections/$handle" params={{ handle: "gorras" }} active={isActive("/collections/gorras")}>Gorras</NavLink>
              <NavLink to="/collections/$handle" params={{ handle: "mas-vendidos" }} active={isActive("/collections/mas-vendidos")}>Más Vendidos</NavLink>
              <NavLink to="/collections/$handle" params={{ handle: "hot-sale" }} active={isActive("/collections/hot-sale")} highlight>Hot Sale</NavLink>
              <NavLink to="/drops" active={isActive("/drops")}>Drops</NavLink>
              <NavLink to="/historia" active={isActive("/historia")}>Historia</NavLink>
            </nav>

            {/* Utility icons */}
            <div className="flex items-center gap-5 text-cream">
              <button onClick={() => setSearchOpen(true)} aria-label="Buscar" className="hover:text-acid transition-colors hidden md:block">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button aria-label="Mi cuenta" className="hover:text-acid transition-colors hidden md:block">
                <User size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setOpen(true)}
                aria-label={`Carrito, ${count} artículos`}
                className="relative hover:text-acid transition-colors flex items-center gap-1"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="text-[11px] tracking-widest">({count})</span>
              </button>
              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
                className="md:hidden hover:text-acid transition-colors"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </header>

        {/* Mega menu — text only */}
        <div
          className={cn(
            "w-full bg-background border-b border-border overflow-hidden transition-all duration-200 ease-out",
            megaOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
          onMouseEnter={openMega}
          onMouseLeave={scheduleMegaClose}
        >
          <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-10">
            <div className="flex flex-col gap-1">
              <Link
                to="/collections/$handle"
                params={{ handle: "camisetas" }}
                onClick={() => setMegaOpen(false)}
                className="group flex items-center justify-between py-2 border-b border-border/40 text-[11px] uppercase tracking-[0.28em] text-acid hover:text-acid transition-colors"
              >
                Ver todo
                <ArrowRight size={11} strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              {megaCategories.map((cat) => (
                <Link
                  key={cat.handle}
                  to="/collections/$handle"
                  params={{ handle: cat.handle }}
                  onClick={() => setMegaOpen(false)}
                  className="group flex items-center justify-between py-2 border-b border-border/40 last:border-0 text-[11px] uppercase tracking-[0.28em] text-cream/60 hover:text-cream transition-colors"
                >
                  {cat.name}
                  <ArrowRight size={11} strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile full-screen menu */}
      <div className={cn(
        "fixed inset-0 z-[100] bg-background flex flex-col transition-transform duration-400 ease-out md:hidden",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <span className="block bg-acid px-2 py-0.5 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink">
              AI<span className="font-serif-it not-italic">A</span>HN
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="text-cream hover:text-acid transition-colors">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-8 space-y-1">
          <MobileNavLink to="/collections/$handle" params={{ handle: "nuevo" }} onClick={() => setMobileOpen(false)}>Nuevo</MobileNavLink>

          {/* HOMBRE accordion */}
          <div>
            <button
              onClick={() => setHombreExpanded((v) => !v)}
              className="flex w-full items-center justify-between py-4 border-b border-border text-[13px] uppercase tracking-[0.3em] text-cream"
            >
              Hombre
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={cn("transition-transform duration-200", hombreExpanded && "rotate-180")}
              />
            </button>
            {hombreExpanded && (
              <div className="pl-4 py-2 space-y-1">
                {megaCategories.map((cat) => (
                  <Link
                    key={cat.handle}
                    to="/collections/$handle"
                    params={{ handle: cat.handle }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 border-b border-border/50 text-[12px] uppercase tracking-[0.28em] text-cream/70 hover:text-cream transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <MobileNavLink to="/collections/$handle" params={{ handle: "camisetas" }} onClick={() => setMobileOpen(false)}>Camisetas</MobileNavLink>
          <MobileNavLink to="/collections/$handle" params={{ handle: "gorras" }} onClick={() => setMobileOpen(false)}>Gorras</MobileNavLink>
          <MobileNavLink to="/collections/$handle" params={{ handle: "mas-vendidos" }} onClick={() => setMobileOpen(false)}>Más Vendidos</MobileNavLink>
          <MobileNavLink to="/collections/$handle" params={{ handle: "hot-sale" }} onClick={() => setMobileOpen(false)} highlight>Hot Sale</MobileNavLink>
          <MobileNavLink to="/drops" onClick={() => setMobileOpen(false)}>Drops</MobileNavLink>
          <MobileNavLink to="/historia" onClick={() => setMobileOpen(false)}>Historia</MobileNavLink>
        </nav>

        <div className="px-5 pb-8 border-t border-border pt-6 space-y-4">
          <div className="flex items-center gap-6 text-cream">
            <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }} className="hover:text-acid transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="hover:text-acid transition-colors"><User size={18} strokeWidth={1.5} /></button>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/30">
            Streetwear masculino · Medellín, Colombia
          </p>
        </div>
      </div>
    </>
  );
}

function NavLink({ to, params, active, highlight, children }: { to: string; params?: Record<string, string>; active: boolean; highlight?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      params={params}
      className={cn(
        "relative group transition-colors",
        highlight ? "text-acid hover:text-acid/80" : active ? "text-cream" : "text-cream/70 hover:text-cream"
      )}
    >
      {children}
      {!highlight && (
        <span className={cn(
          "absolute -bottom-px left-0 h-px w-full bg-cream transition-transform duration-300 origin-left",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )} />
      )}
    </Link>
  );
}

function MobileNavLink({ to, params, onClick, highlight, children }: { to: string; params?: Record<string, string>; onClick: () => void; highlight?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      params={params}
      onClick={onClick}
      className={cn(
        "block py-4 border-b border-border text-[13px] uppercase tracking-[0.3em] transition-colors",
        highlight ? "text-acid hover:text-acid/70" : "text-cream hover:text-acid"
      )}
    >
      {children}
    </Link>
  );
}
