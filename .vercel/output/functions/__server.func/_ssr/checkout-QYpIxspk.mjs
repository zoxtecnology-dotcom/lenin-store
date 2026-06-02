import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, V as useCart, $ as useNavigate, L as Link, C as ChevronDown, a as CreditCard, z as fmtCOP, Q as supabase } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { L as LoaderCircle, c as createMPPreference } from "./mercadopago.functions-BlCC1ePY.mjs";
import { A as ArrowLeft } from "./arrow-left-jnwlvACu.mjs";
import { S as ShoppingBag } from "./shopping-bag-Ce0JJ2U8.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./types-D0vF8QzC.mjs";
import "./menu-BkUjdS50.mjs";
import "./user-zcyQNMe0.mjs";
import "./arrow-right-BKj3kHQ9.mjs";
import "./createSsrRpc-OYTRBK8B.mjs";
const DEPARTMENTS = ["Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"];
function CheckoutPage() {
  const {
    user,
    session,
    loading: authLoading
  } = useAuth();
  const {
    items,
    total,
    count,
    clear
  } = useCart();
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = reactExports.useState([]);
  const [selectedAddressId, setSelectedAddressId] = reactExports.useState(null);
  const [useNewAddress, setUseNewAddress] = reactExports.useState(false);
  const [loadingAddresses, setLoadingAddresses] = reactExports.useState(true);
  const [processing, setProcessing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    email: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    postal_code: ""
  });
  reactExports.useEffect(() => {
    if (count === 0 && !processing) {
      navigate({
        to: "/"
      });
    }
  }, [count, processing, navigate]);
  reactExports.useEffect(() => {
    if (user?.email) {
      setForm((f) => ({
        ...f,
        email: user.email
      }));
    }
  }, [user]);
  reactExports.useEffect(() => {
    async function loadAddresses() {
      if (!user) {
        setLoadingAddresses(false);
        setUseNewAddress(true);
        return;
      }
      const {
        data
      } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", {
        ascending: false
      });
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
  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setProcessing(true);
    try {
      const email = useNewAddress ? form.email : user?.email ?? form.email;
      if (!email) {
        throw new Error("Por favor ingresa tu correo electrónico");
      }
      const address = useNewAddress ? {
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        department: form.department,
        postal_code: form.postal_code
      } : {
        full_name: selectedAddress.full_name,
        phone: selectedAddress.phone,
        address: selectedAddress.address,
        city: selectedAddress.city,
        department: selectedAddress.department,
        postal_code: selectedAddress.postal_code
      };
      if (!address.full_name || !address.phone || !address.address || !address.city || !address.department) {
        throw new Error("Por favor completa todos los campos de la dirección");
      }
      const result = await createMPPreference({
        data: {
          items: items.map((item) => ({
            slug: item.slug,
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image,
            size: item.size,
            color: item.color
          })),
          address,
          email,
          accessToken: session?.access_token
        }
      });
      clear();
      const checkoutUrl = false ? result.sandboxInitPoint : result.initPoint;
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Error en checkout:", err);
      setError(err instanceof Error ? err.message : "Error procesando el pago");
      setProcessing(false);
    }
  }
  if (authLoading || loadingAddresses) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-36 pb-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-cream/50" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/50 hover:text-cream transition-colors mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, strokeWidth: 1.5 }),
        "Seguir comprando"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl uppercase tracking-wide text-cream mb-12", children: "Checkout" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_400px] gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border border-border flex items-center justify-center text-acid", children: "1" }),
              "Contacto"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Correo electrónico *", value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), disabled: !!user, required: true, className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none disabled:opacity-50" }),
            !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[10px] text-cream/40", children: [
              "¿Ya tienes cuenta?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-acid hover:underline", children: "Inicia sesión" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border border-border flex items-center justify-center text-acid", children: "2" }),
              "Dirección de envío"
            ] }),
            savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
              savedAddresses.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-4 p-4 border cursor-pointer transition-colors ${selectedAddressId === addr.id && !useNewAddress ? "border-acid bg-acid/5" : "border-border hover:border-cream/30"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "address", checked: selectedAddressId === addr.id && !useNewAddress, onChange: () => {
                  setSelectedAddressId(addr.id);
                  setUseNewAddress(false);
                }, className: "mt-1 accent-acid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.2em] text-acid mb-1", children: [
                    addr.label,
                    addr.is_default && " • Predeterminada"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: addr.full_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-cream/60", children: [
                    addr.address,
                    ", ",
                    addr.city,
                    ", ",
                    addr.department
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60", children: addr.phone })
                ] })
              ] }, addr.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-4 p-4 border cursor-pointer transition-colors ${useNewAddress ? "border-acid bg-acid/5" : "border-border hover:border-cream/30"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "address", checked: useNewAddress, onChange: () => setUseNewAddress(true), className: "accent-acid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream", children: "Usar otra dirección" })
              ] })
            ] }),
            useNewAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Nombre completo *", value: form.full_name, onChange: (e) => setForm({
                ...form,
                full_name: e.target.value
              }), required: useNewAddress, className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", placeholder: "Teléfono *", value: form.phone, onChange: (e) => setForm({
                ...form,
                phone: e.target.value
              }), required: useNewAddress, className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Dirección completa *", value: form.address, onChange: (e) => setForm({
                ...form,
                address: e.target.value
              }), required: useNewAddress, className: "md:col-span-2 w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Ciudad *", value: form.city, onChange: (e) => setForm({
                ...form,
                city: e.target.value
              }), required: useNewAddress, className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.department, onChange: (e) => setForm({
                  ...form,
                  department: e.target.value
                }), required: useNewAddress, className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream focus:border-cream/40 outline-none appearance-none cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-background", children: "Departamento *" }),
                  DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, className: "bg-background", children: d }, d))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Código postal (opcional)", value: form.postal_code, onChange: (e) => setForm({
                ...form,
                postal_code: e.target.value
              }), className: "md:col-span-2 w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/40 outline-none" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.25, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border border-border flex items-center justify-center text-acid", children: "3" }),
              "Método de pago"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-acid shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: "MercadoPago" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/50", children: "Tarjetas, PSE, Nequi, Efecty y más" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6 sticky top-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
            "Resumen del pedido"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-6 max-h-64 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 bg-bone shrink-0 overflow-hidden", children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.15em] text-cream line-clamp-1", children: item.name }),
              (item.size || item.color) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-cream/50 mt-0.5", children: [item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(" · ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/50 mt-1", children: [
                "Cant: ",
                item.qty
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream mt-1", children: fmtCOP(item.price * item.qty) })
            ] })
          ] }, item.slug)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: fmtCOP(total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60", children: "Envío" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-[10px]", children: "Calculado al pagar" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-medium pt-2 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: fmtCOP(total) })
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: processing, className: "w-full mt-6 bg-acid text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            "Procesando..."
          ] }) : "Pagar con MercadoPago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[9px] text-cream/40 text-center", children: [
            "Al continuar aceptas nuestros",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terminos", className: "underline hover:text-cream/60", children: "Términos y condiciones" })
          ] })
        ] }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};
