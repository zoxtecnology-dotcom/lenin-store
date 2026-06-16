import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/settings";
import { calcShipping, ratesFromSettings } from "@/lib/shipping";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { pageTitle } from "@/lib/brand";
import { fmtCOP } from "@/lib/products";
import { createMPPreference } from "@/lib/api/mercadopago.functions";
import { ArrowLeft, Loader2, MapPin, CreditCard, ShoppingBag, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: pageTitle("Checkout") }],
  }),
  component: CheckoutPage,
});

interface SavedAddress {
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

const DEPARTMENTS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar",
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó",
  "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
  "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío",
  "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima",
  "Valle del Cauca", "Vaupés", "Vichada",
];

function CheckoutPage() {
  const { user, session, loading: authLoading } = useAuth();
  const { items, total, count, clear } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    postal_code: "",
  });

  // Redirect si carrito vacío
  useEffect(() => {
    if (count === 0 && !processing) {
      navigate({ to: "/" });
    }
  }, [count, processing, navigate]);

  // Pre-llenar email si hay usuario
  useEffect(() => {
    if (user?.email) {
      setForm((f) => ({ ...f, email: user.email! }));
    }
  }, [user]);

  // Cargar direcciones guardadas
  useEffect(() => {
    async function loadAddresses() {
      if (!user) {
        setLoadingAddresses(false);
        setUseNewAddress(true);
        return;
      }

      const { data } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });

      if (data && data.length > 0) {
        setSavedAddresses(data);
        const defaultAddr = data.find((a) => a.is_default) || data[0];
        setSelectedAddressId(defaultAddr.id);
        setUseNewAddress(false);
      } else {
        setUseNewAddress(true);
      }
      setLoadingAddresses(false);
    }
    loadAddresses();
  }, [user]);

  // Obtener dirección seleccionada
  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId);

  // Calcular envío según el departamento de destino (mismo cálculo que el servidor)
  const shippingDept = useNewAddress ? form.department : (selectedAddress?.department ?? "");
  const shippingRates = ratesFromSettings(settings);
  const shipping = shippingDept ? calcShipping(shippingDept, total, shippingRates) : null;
  const grandTotal = total + (shipping ?? 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      // Validar email
      const email = useNewAddress ? form.email : (user?.email ?? form.email);
      if (!email) {
        throw new Error("Por favor ingresa tu correo electrónico");
      }

      // Construir dirección
      const address = useNewAddress
        ? {
            full_name: form.full_name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            department: form.department,
            postal_code: form.postal_code,
          }
        : {
            full_name: selectedAddress!.full_name,
            phone: selectedAddress!.phone,
            address: selectedAddress!.address,
            city: selectedAddress!.city,
            department: selectedAddress!.department,
            postal_code: selectedAddress!.postal_code,
          };

      // Validar campos
      if (!address.full_name || !address.phone || !address.address || !address.city || !address.department) {
        throw new Error("Por favor completa todos los campos de la dirección");
      }
      if (!/^[a-zA-ZÀ-ÿñÑ\s'.]{3,}$/.test(address.full_name.trim())) {
        throw new Error("El nombre solo puede contener letras (mínimo 3 caracteres)");
      }
      if (!/^\d{7,10}$/.test(address.phone.trim())) {
        throw new Error("El teléfono debe tener entre 7 y 10 dígitos");
      }

      // Crear preferencia de MercadoPago
      const result = await createMPPreference({
        data: {
          items: items.map((item) => ({
            slug: item.slug,
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image,
            size: item.size,
            color: item.color,
          })),
          address,
          email,
          accessToken: session?.access_token,
        },
      });

      // Limpiar carrito y redirigir a MercadoPago
      clear();
      
      // Usar initPoint para producción
      const checkoutUrl = result.initPoint;

      window.location.href = checkoutUrl!;
    } catch (err) {
      console.error("Error en checkout:", err);
      setError(err instanceof Error ? err.message : "Error procesando el pago");
      setProcessing(false);
    }
  }

  // Loading state
  if (authLoading || loadingAddresses) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="pt-36 pb-20 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-cream/50" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          {/* Header */}
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/50 hover:text-cream transition-colors mb-8"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Seguir comprando
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-cream mb-12">
              Checkout
            </h1>
          </Reveal>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
              {/* Left column - Address */}
              <div className="space-y-8">
                {/* Email */}
                <Reveal delay={0.15}>
                  <div>
                    <h2 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-acid">1</span>
                      Contacto
                    </h2>
                    <input
                      type="email"
                      placeholder="Correo electrónico *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      disabled={!!user}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none disabled:opacity-50"
                    />
                    {!user && (
                      <p className="mt-2 text-[10px] text-cream/40">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-acid hover:underline">
                          Inicia sesión
                        </Link>
                      </p>
                    )}
                  </div>
                </Reveal>

                {/* Shipping Address */}
                <Reveal delay={0.2}>
                  <div>
                    <h2 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-acid">2</span>
                      Dirección de envío
                    </h2>

                    {/* Saved addresses selector */}
                    {savedAddresses.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {savedAddresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                              selectedAddressId === addr.id && !useNewAddress
                                ? "border-acid bg-acid/5"
                                : "border-border hover:border-cream/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === addr.id && !useNewAddress}
                              onChange={() => {
                                setSelectedAddressId(addr.id);
                                setUseNewAddress(false);
                              }}
                              className="mt-1 accent-acid"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] uppercase tracking-[0.2em] text-acid mb-1">
                                {addr.label}
                                {addr.is_default && " • Predeterminada"}
                              </p>
                              <p className="text-sm text-cream">{addr.full_name}</p>
                              <p className="text-xs text-cream/60">
                                {addr.address}, {addr.city}, {addr.department}
                              </p>
                              <p className="text-xs text-cream/60">{addr.phone}</p>
                            </div>
                          </label>
                        ))}

                        {/* Option for new address */}
                        <label
                          className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                            useNewAddress
                              ? "border-acid bg-acid/5"
                              : "border-border hover:border-cream/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={useNewAddress}
                            onChange={() => setUseNewAddress(true)}
                            className="accent-acid"
                          />
                          <span className="text-sm text-cream">Usar otra dirección</span>
                        </label>
                      </div>
                    )}

                    {/* New address form */}
                    {useNewAddress && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Nombre completo *"
                          value={form.full_name}
                          onChange={(e) => setForm({ ...form, full_name: e.target.value.replace(/[^a-zA-ZÀ-ÿñÑ\s'.]/g, "") })}
                          required={useNewAddress}
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none"
                        />
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="Teléfono *"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          required={useNewAddress}
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Dirección completa *"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          required={useNewAddress}
                          className="md:col-span-2 w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Ciudad *"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value.replace(/[^a-zA-ZÀ-ÿñÑ\s'.-]/g, "") })}
                          required={useNewAddress}
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none"
                        />
                        <div className="relative">
                          <select
                            value={form.department}
                            onChange={(e) => setForm({ ...form, department: e.target.value })}
                            required={useNewAddress}
                            className="w-full bg-transparent border border-border px-4 py-3 text-sm text-cream focus:border-cream/40 outline-none appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-background">Departamento *</option>
                            {DEPARTMENTS.map((d) => (
                              <option key={d} value={d} className="bg-background">
                                {d}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
                        </div>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Código postal (opcional)"
                          value={form.postal_code}
                          onChange={(e) => setForm({ ...form, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                          className="md:col-span-2 w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Payment method info */}
                <Reveal delay={0.25}>
                  <div>
                    <h2 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-acid">3</span>
                      Método de pago
                    </h2>
                    <div className="border border-border p-4 flex items-center gap-4">
                      <CreditCard className="w-5 h-5 text-acid shrink-0" />
                      <div>
                        <p className="text-sm text-cream">MercadoPago</p>
                        <p className="text-[10px] text-cream/50">
                          Tarjetas, PSE, Nequi, Efecty y más
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right column - Order summary */}
              <div>
                <Reveal delay={0.3}>
                  <div className="border border-border p-6 sticky top-28">
                    <h2 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream mb-6">
                      <ShoppingBag className="w-4 h-4" />
                      Resumen del pedido
                    </h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.slug} className="flex gap-3">
                          <div className="w-16 h-20 bg-bone shrink-0 overflow-hidden">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] uppercase tracking-[0.15em] text-cream line-clamp-1">
                              {item.name}
                            </p>
                            {(item.size || item.color) && (
                              <p className="text-[9px] text-cream/50 mt-0.5">
                                {[item.size && `Talla ${item.size}`, item.color]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            )}
                            <p className="text-[10px] text-cream/50 mt-1">Cant: {item.qty}</p>
                            <p className="text-xs text-cream mt-1">{fmtCOP(item.price * item.qty)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-cream/60">Subtotal</span>
                        <span className="text-cream">{fmtCOP(total)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-cream/60">Envío</span>
                        {shipping === null ? (
                          <span className="text-cream/50 text-[10px]">Elige tu departamento</span>
                        ) : shipping === 0 ? (
                          <span className="text-acid">Gratis</span>
                        ) : (
                          <span className="text-cream">{fmtCOP(shipping)}</span>
                        )}
                      </div>
                      {shipping !== null && shipping > 0 && (
                        <p className="text-[9px] text-cream/40">
                          Envío gratis desde {fmtCOP(shippingRates.freeThreshold)}
                        </p>
                      )}
                      <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                        <span className="text-cream">Total</span>
                        <span className="text-cream">{fmtCOP(grandTotal)}</span>
                      </div>
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                        {error}
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full mt-6 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        "Pagar con MercadoPago"
                      )}
                    </button>

                    <p className="mt-4 text-[9px] text-cream/40 text-center">
                      Al continuar aceptas nuestros{" "}
                      <Link to="/terminos" className="underline hover:text-cream/60">
                        Términos y condiciones
                      </Link>
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
