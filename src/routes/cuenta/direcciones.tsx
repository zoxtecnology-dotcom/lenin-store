import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { ArrowLeft, MapPin, Plus, Trash2, Star, Edit2 } from "lucide-react";

export const Route = createFileRoute("/cuenta/direcciones")({
  head: () => ({
    meta: [{ title: pageTitle("Mis direcciones") }],
  }),
  component: DireccionesPage,
});

interface Address {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  postal_code: string;
  is_default: boolean;
}

function DireccionesPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    label: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    postal_code: "",
    is_default: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  async function loadAddresses() {
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user!.id)
      .order("is_default", { ascending: false });

    setAddresses(data ?? []);
    setLoading(false);
  }

  function resetForm() {
    setForm({
      label: "",
      full_name: "",
      phone: "",
      address: "",
      city: "",
      department: "",
      postal_code: "",
      is_default: false,
    });
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(addr: Address) {
    setForm({
      label: addr.label,
      full_name: addr.full_name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      department: addr.department,
      postal_code: addr.postal_code,
      is_default: addr.is_default,
    });
    setEditing(addr);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    // Si es default, quitar default de las demás
    if (form.is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user!.id);
    }

    if (editing) {
      await supabase
        .from("addresses")
        .update({ ...form })
        .eq("id", editing.id);
    } else {
      await supabase.from("addresses").insert({
        ...form,
        user_id: user!.id,
      });
    }

    setSaving(false);
    resetForm();
    loadAddresses();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta dirección?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    loadAddresses();
  }

  async function setDefault(id: string) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user!.id);
    await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);
    loadAddresses();
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
            <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Envíos</p>
          </Reveal>
          <div className="flex items-end justify-between gap-6">
            <Reveal delay={100}>
              <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream">
                Direcciones
              </h1>
            </Reveal>
            {!showForm && (
              <Reveal delay={150}>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-acid hover:text-cream transition-colors mb-3"
                >
                  <Plus size={13} strokeWidth={1.5} />
                  Agregar
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {/* Formulario */}
          {showForm && (
            <Reveal>
              <form onSubmit={handleSubmit} className="border border-border p-8 mb-10 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.3em] text-cream mb-6">
                  {editing ? "Editar dirección" : "Nueva dirección"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                      Etiqueta
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Casa, Oficina"
                      value={form.label}
                      onChange={(e) => setForm({ ...form, label: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    placeholder="Calle, número, apartamento"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                      Código postal
                    </label>
                    <input
                      type="text"
                      value={form.postal_code}
                      onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_default}
                    onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                    className="w-4 h-4 accent-acid"
                  />
                  <span className="text-sm text-cream/60">Usar como dirección predeterminada</span>
                </label>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-cream text-background px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : editing ? "Actualizar" : "Guardar"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-border px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:border-cream/40 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </Reveal>
          )}

          {/* Lista de direcciones */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
            </div>
          ) : addresses.length === 0 && !showForm ? (
            <Reveal>
              <div className="text-center py-20 border border-border">
                <MapPin size={40} strokeWidth={1} className="mx-auto text-cream/20 mb-6" />
                <p className="text-sm text-cream/50 mb-6">No tienes direcciones guardadas</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-block border border-cream/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-background transition-colors"
                >
                  Agregar dirección
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((addr, i) => (
                <Reveal key={addr.id} delay={i * 60}>
                  <div className={`border p-6 relative ${addr.is_default ? "border-acid" : "border-border"}`}>
                    {addr.is_default && (
                      <div className="absolute top-4 right-4">
                        <Star size={14} className="text-acid fill-acid" />
                      </div>
                    )}

                    <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-3">{addr.label}</p>
                    <p className="text-sm text-cream mb-1">{addr.full_name}</p>
                    <p className="text-sm text-cream/60 mb-1">{addr.address}</p>
                    <p className="text-sm text-cream/60 mb-1">
                      {addr.city}, {addr.department} {addr.postal_code}
                    </p>
                    <p className="text-sm text-cream/40">{addr.phone}</p>

                    <div className="flex gap-4 mt-6 pt-4 border-t border-border">
                      <button
                        onClick={() => startEdit(addr)}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors"
                      >
                        <Edit2 size={11} />
                        Editar
                      </button>
                      {!addr.is_default && (
                        <button
                          onClick={() => setDefault(addr.id)}
                          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors"
                        >
                          <Star size={11} />
                          Predeterminar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-red-400 transition-colors ml-auto"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
