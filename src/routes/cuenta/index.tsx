import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { LogOut, Package, MapPin, User, Plus, Trash2, Star, Edit2, Check } from "lucide-react";

export const Route = createFileRoute("/cuenta/")({
  head: () => ({
    meta: [{ title: pageTitle("Mi cuenta") }],
  }),
  component: CuentaPage,
});

interface Address {
  id: string;
  label: string;
  full_name: string;
  company: string | null;
  phone: string;
  address: string;
  unit: string | null;
  city: string;
  department: string;
  postal_code: string;
  is_default: boolean;
}

function CuentaPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // Perfil
  const [profile, setProfile] = useState({ full_name: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);

  // Direcciones
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "",
    full_name: "",
    company: "",
    phone: "",
    address: "",
    unit: "",
    city: "",
    department: "",
    postal_code: "",
    is_default: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  async function loadData() {
    // Cargar perfil
    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user!.id)
      .single();

    if (profileData) {
      setProfile({
        full_name: profileData.full_name ?? "",
      });
    }

    // Cargar direcciones
    const { data: addressesData } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user!.id)
      .order("is_default", { ascending: false });

    setAddresses(addressesData ?? []);
    setLoading(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  // === PERFIL ===
  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setSavedProfile(false);

    await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name || null,
      })
      .eq("id", user!.id);

    setSavingProfile(false);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3000);
  }

  // === DIRECCIONES ===
  function resetAddressForm() {
    setAddressForm({
      label: "",
      full_name: "",
      company: "",
      phone: "",
      address: "",
      unit: "",
      city: "",
      department: "",
      postal_code: "",
      is_default: false,
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  }

  function startEditAddress(addr: Address) {
    setAddressForm({
      label: addr.label,
      full_name: addr.full_name,
      company: addr.company ?? "",
      phone: addr.phone,
      address: addr.address,
      unit: addr.unit ?? "",
      city: addr.city,
      department: addr.department,
      postal_code: addr.postal_code,
      is_default: addr.is_default,
    });
    setEditingAddress(addr);
    setShowAddressForm(true);
  }

  async function saveAddress(e: React.FormEvent) {
    e.preventDefault();
    setSavingAddress(true);

    if (addressForm.is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user!.id);
    }

    if (editingAddress) {
      await supabase
        .from("addresses")
        .update({ ...addressForm })
        .eq("id", editingAddress.id);
    } else {
      await supabase.from("addresses").insert({
        ...addressForm,
        user_id: user!.id,
      });
    }

    setSavingAddress(false);
    resetAddressForm();
    loadData();
  }

  async function deleteAddress(id: string) {
    if (!confirm("¿Eliminar esta dirección?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    loadData();
  }

  async function setDefaultAddress(id: string) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user!.id);
    await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);
    loadData();
  }

  if (authLoading || !user) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      </main>
    );
  }

  const initials = profile.full_name?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() || "??";

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
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Columna izquierda: Perfil + Links */}
              <div className="space-y-8">
                {/* Perfil */}
                <Reveal>
                  <div className="border border-border p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-acid/10 flex items-center justify-center">
                        <span className="font-display text-xl text-acid">{initials}</span>
                      </div>
                      <div>
                        <p className="text-sm text-cream">{user.email}</p>
                        <p className="text-[10px] text-cream/40 mt-1">
                          {user.app_metadata?.provider === "google"
                            ? "Google"
                            : "Email"}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={saveProfile} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={profile.full_name}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          placeholder="Tu nombre"
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="flex items-center gap-2 bg-cream text-background px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50"
                      >
                        {savedProfile ? (
                          <>
                            <Check size={12} />
                            Guardado
                          </>
                        ) : savingProfile ? (
                          "Guardando..."
                        ) : (
                          "Guardar"
                        )}
                      </button>
                    </form>
                  </div>
                </Reveal>

                {/* Links rápidos */}
                <Reveal delay={60}>
                  <Link to="/cuenta/pedidos" className="group border border-border p-6 flex items-center gap-4 hover:border-cream/30 transition-colors block">
                    <Package size={20} strokeWidth={1.5} className="text-cream/40" />
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cream">Mis pedidos</p>
                      <p className="text-[10px] text-cream/40">Ver historial de compras</p>
                    </div>
                    <span className="text-acid text-sm">→</span>
                  </Link>
                </Reveal>
              </div>

              {/* Columna derecha: Direcciones */}
              <div className="lg:col-span-2">
                <Reveal delay={120}>
                  <div className="border border-border p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-cream/40" />
                        <p className="text-[11px] uppercase tracking-[0.3em] text-cream">Direcciones de envío</p>
                      </div>
                      {!showAddressForm && (
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-acid hover:text-cream transition-colors"
                        >
                          <Plus size={12} />
                          Agregar
                        </button>
                      )}
                    </div>

                    {/* Form de dirección */}
                    {showAddressForm && (
                      <form onSubmit={saveAddress} className="border border-border/50 p-6 mb-6 bg-cream/[0.02]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-4">
                          {editingAddress ? "Editar dirección" : "Nueva dirección"}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Nombre de dirección (Casa, Oficina, Trabajo...)"
                            value={addressForm.label}
                            onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Nombre completo"
                            value={addressForm.full_name}
                            onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                            minLength={2}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Empresa (opcional)"
                            value={addressForm.company}
                            onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                            className="w-full bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <input
                            type="tel"
                            placeholder="Teléfono (10 dígitos)"
                            value={addressForm.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setAddressForm({ ...addressForm, phone: val });
                            }}
                            pattern="[0-9]{10}"
                            inputMode="numeric"
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Dirección (Calle 80 #45-30)"
                            value={addressForm.address}
                            onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Apto, Casa, Torre, Bloque (opcional)"
                            value={addressForm.unit}
                            onChange={(e) => setAddressForm({ ...addressForm, unit: e.target.value })}
                            className="w-full bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Ciudad"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                            required
                          />
                          <select
                            value={addressForm.department}
                            onChange={(e) => setAddressForm({ ...addressForm, department: e.target.value })}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream focus:border-cream/40 outline-none"
                            required
                          >
                            <option value="" className="bg-ink">Departamento</option>
                            <option value="Amazonas" className="bg-ink">Amazonas</option>
                            <option value="Antioquia" className="bg-ink">Antioquia</option>
                            <option value="Arauca" className="bg-ink">Arauca</option>
                            <option value="Atlántico" className="bg-ink">Atlántico</option>
                            <option value="Bolívar" className="bg-ink">Bolívar</option>
                            <option value="Boyacá" className="bg-ink">Boyacá</option>
                            <option value="Caldas" className="bg-ink">Caldas</option>
                            <option value="Caquetá" className="bg-ink">Caquetá</option>
                            <option value="Casanare" className="bg-ink">Casanare</option>
                            <option value="Cauca" className="bg-ink">Cauca</option>
                            <option value="Cesar" className="bg-ink">Cesar</option>
                            <option value="Chocó" className="bg-ink">Chocó</option>
                            <option value="Córdoba" className="bg-ink">Córdoba</option>
                            <option value="Cundinamarca" className="bg-ink">Cundinamarca</option>
                            <option value="Guainía" className="bg-ink">Guainía</option>
                            <option value="Guaviare" className="bg-ink">Guaviare</option>
                            <option value="Huila" className="bg-ink">Huila</option>
                            <option value="La Guajira" className="bg-ink">La Guajira</option>
                            <option value="Magdalena" className="bg-ink">Magdalena</option>
                            <option value="Meta" className="bg-ink">Meta</option>
                            <option value="Nariño" className="bg-ink">Nariño</option>
                            <option value="Norte de Santander" className="bg-ink">Norte de Santander</option>
                            <option value="Putumayo" className="bg-ink">Putumayo</option>
                            <option value="Quindío" className="bg-ink">Quindío</option>
                            <option value="Risaralda" className="bg-ink">Risaralda</option>
                            <option value="San Andrés y Providencia" className="bg-ink">San Andrés y Providencia</option>
                            <option value="Santander" className="bg-ink">Santander</option>
                            <option value="Sucre" className="bg-ink">Sucre</option>
                            <option value="Tolima" className="bg-ink">Tolima</option>
                            <option value="Valle del Cauca" className="bg-ink">Valle del Cauca</option>
                            <option value="Vaupés" className="bg-ink">Vaupés</option>
                            <option value="Vichada" className="bg-ink">Vichada</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Código postal"
                            value={addressForm.postal_code}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                              setAddressForm({ ...addressForm, postal_code: val });
                            }}
                            inputMode="numeric"
                            maxLength={6}
                            className="bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none"
                          />
                        </div>

                        <label className="flex items-center gap-2 mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addressForm.is_default}
                            onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                            className="w-4 h-4 accent-acid"
                          />
                          <span className="text-[10px] text-cream/50">Predeterminada</span>
                        </label>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={savingAddress}
                            className="bg-cream text-background px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-acid transition-colors disabled:opacity-50"
                          >
                            {savingAddress ? "..." : editingAddress ? "Actualizar" : "Guardar"}
                          </button>
                          <button
                            type="button"
                            onClick={resetAddressForm}
                            className="border border-border px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-cream/50 hover:border-cream/40 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Lista de direcciones */}
                    {addresses.length === 0 && !showAddressForm ? (
                      <div className="text-center py-10 text-cream/30">
                        <MapPin size={30} strokeWidth={1} className="mx-auto mb-4 opacity-50" />
                        <p className="text-sm">No tienes direcciones guardadas</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`border p-4 relative ${addr.is_default ? "border-acid" : "border-border/50"}`}
                          >
                            {addr.is_default && (
                              <Star size={12} className="absolute top-3 right-3 text-acid fill-acid" />
                            )}
                            <p className="text-[10px] uppercase tracking-[0.2em] text-acid mb-2">{addr.label}</p>
                            <p className="text-sm text-cream">{addr.full_name}</p>
                            {addr.company && <p className="text-[11px] text-cream/40">{addr.company}</p>}
                            <p className="text-[11px] text-cream/50">{addr.address}{addr.unit ? `, ${addr.unit}` : ""}</p>
                            <p className="text-[11px] text-cream/50">{addr.city}, {addr.department}</p>
                            <p className="text-[10px] text-cream/30 mt-1">{addr.phone}</p>

                            <div className="flex gap-3 mt-4 pt-3 border-t border-border/30">
                              <button
                                onClick={() => startEditAddress(addr)}
                                className="text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-cream transition-colors flex items-center gap-1"
                              >
                                <Edit2 size={10} /> Editar
                              </button>
                              {!addr.is_default && (
                                <button
                                  onClick={() => setDefaultAddress(addr.id)}
                                  className="text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1"
                                >
                                  <Star size={10} /> Predeterminada
                                </button>
                              )}
                              <button
                                onClick={() => deleteAddress(addr.id)}
                                className="text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-red-400 transition-colors ml-auto"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
