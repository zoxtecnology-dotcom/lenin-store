import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { LogOut, Package, Heart, MapPin, User } from "lucide-react";

export const Route = createFileRoute("/cuenta")({
  head: () => ({
    meta: [{ title: pageTitle("Mi cuenta") }],
  }),
  component: CuentaPage,
});

function CuentaPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      </main>
    );
  }

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Tu espacio</p>
          </Reveal>
          <div className="flex items-end justify-between gap-6">
            <Reveal delay={100}>
              <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream">
                Mi cuenta
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-3"
              >
                <LogOut size={13} strokeWidth={1.5} />
                Cerrar sesión
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Perfil */}
            <Reveal>
              <div className="border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-acid/10 flex items-center justify-center">
                    <span className="font-display text-lg text-acid">{initials}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-1">Cuenta</p>
                    <p className="text-sm text-cream">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cream/40">
                  <User size={11} strokeWidth={1.5} />
                  <span>
                    {user.app_metadata?.provider === "google"
                      ? "Conectado con Google"
                      : "Conectado con email"}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Pedidos */}
            <Reveal delay={60}>
              <Link to="/" className="group border border-border p-8 flex flex-col justify-between h-full hover:border-cream/30 transition-colors block">
                <div>
                  <Package size={20} strokeWidth={1.5} className="text-cream/40 mb-4" />
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cream mb-2">Mis pedidos</p>
                  <p className="text-sm text-cream/50">Revisa el estado de tus compras y el historial de pedidos.</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-acid mt-6 group-hover:underline">
                  Ver pedidos →
                </p>
              </Link>
            </Reveal>

            {/* Wishlist */}
            <Reveal delay={120}>
              <Link to="/wishlist" className="group border border-border p-8 flex flex-col justify-between h-full hover:border-cream/30 transition-colors block">
                <div>
                  <Heart size={20} strokeWidth={1.5} className="text-cream/40 mb-4" />
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cream mb-2">Guardados</p>
                  <p className="text-sm text-cream/50">Las prendas que guardaste para no perderlas.</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-acid mt-6 group-hover:underline">
                  Ver guardados →
                </p>
              </Link>
            </Reveal>

            {/* Direcciones */}
            <Reveal delay={180}>
              <div className="border border-border p-8 flex flex-col justify-between opacity-60">
                <div>
                  <MapPin size={20} strokeWidth={1.5} className="text-cream/40 mb-4" />
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cream mb-2">Direcciones</p>
                  <p className="text-sm text-cream/50">Guarda tus direcciones para agilizar el checkout.</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mt-6">
                  Próximamente
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
