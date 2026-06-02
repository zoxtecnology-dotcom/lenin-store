import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { ArrowLeft, User, Check } from "lucide-react";

export const Route = createFileRoute("/cuenta/perfil")({
  head: () => ({
    meta: [{ title: pageTitle("Editar perfil") }],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user!.id)
      .single();

    if (data) {
      setForm({
        full_name: data.full_name ?? "",
        phone: data.phone ?? "",
      });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await supabase
      .from("profiles")
      .update({
        full_name: form.full_name || null,
        phone: form.phone || null,
      })
      .eq("id", user!.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (authLoading || !user) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Reveal>
            <Link
              to="/cuenta"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Volver a mi cuenta
            </Link>
          </Reveal>
          <Reveal delay={50}>
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Datos personales</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream">
              Mi perfil
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
            </div>
          ) : (
            <Reveal>
              <form onSubmit={handleSubmit} className="max-w-lg">
                {/* Avatar */}
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 bg-acid/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-acid">
                      {form.full_name?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-cream">{user.email}</p>
                    <p className="text-[10px] text-cream/40 mt-1">
                      {user.app_metadata?.provider === "google"
                        ? "Conectado con Google"
                        : "Conectado con email"}
                    </p>
                  </div>
                </div>

                {/* Nombre */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                  />
                </div>

                {/* Teléfono */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Tu número de contacto"
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                  />
                </div>

                {/* Email (read-only) */}
                <div className="mb-10">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email ?? ""}
                    disabled
                    className="w-full bg-cream/[0.02] border border-border px-4 py-3 text-sm text-cream/40 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-cream/30 mt-2">
                    El email no se puede cambiar
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-cream text-background px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50"
                >
                  {saved ? (
                    <>
                      <Check size={14} />
                      Guardado
                    </>
                  ) : saving ? (
                    "Guardando..."
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
