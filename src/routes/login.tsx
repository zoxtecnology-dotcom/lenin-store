import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: pageTitle("Iniciar sesión") }],
  }),
  beforeLoad: ({ context }) => {
    // Si ya está logueado, redirige a /cuenta
  },
  component: LoginPage,
});

function LoginPage() {
  const { signInWithEmail, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate({ to: "/cuenta" });
  }, [user, navigate]);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await signInWithEmail(email.trim());
    setLoading(false);
    if (error) {
      setError("Hubo un error. Intenta de nuevo.");
    } else {
      setSent(true);
    }
  }

  async function handleGoogle() {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError("Error al iniciar con Google. Intenta de nuevo.");
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <section className="flex min-h-screen items-center justify-center px-5 pt-20">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-4">— Acceso</p>
            <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.88] text-cream">
              Iniciar<br />sesión
            </h1>
          </div>

          {sent ? (
            /* Estado: correo enviado */
            <div className="text-center py-8 border border-border px-8">
              <div className="w-12 h-12 bg-acid/10 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-acid">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-acid mb-3">Revisa tu correo</p>
              <p className="text-cream/70 text-sm leading-relaxed mb-2">
                Te enviamos un link a <span className="text-cream font-medium">{email}</span>
              </p>
              <p className="text-cream/40 text-xs">
                Haz clic en el link del correo para entrar. Expira en 1 hora.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors"
              >
                Usar otro correo
              </button>
            </div>
          ) : (
            /* Formulario de login */
            <div className="space-y-4">

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 border border-border text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:border-cream/40 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </button>

              {/* Separador */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/30">o</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    className="w-full bg-transparent border border-border text-cream placeholder:text-cream/20 px-4 py-3 text-sm focus:outline-none focus:border-cream/40 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs tracking-wide">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Recibir link por correo"}
                </button>
              </form>

              <p className="text-center text-[10px] text-cream/30 leading-relaxed pt-2">
                Sin contraseñas. Te mandamos un link directo a tu correo.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
