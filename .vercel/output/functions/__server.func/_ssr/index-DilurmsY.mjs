import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, $ as useNavigate, Q as supabase, L as Link, P as Plus, T as Trash2 } from "./router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-CbOX52zc.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { L as LogOut } from "./log-out-CMYRdoCm.mjs";
import { C as Check } from "./check-DeLqmXJ4.mjs";
import { P as Package } from "./package-Dl87lcow.mjs";
import { M as MapPin } from "./map-pin-BFQ1XVXh.mjs";
import { S as Star, P as Pen } from "./star-_M5BROSE.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
import "./menu-BYb1-akj.mjs";
import "./user-vzxeEXK0.mjs";
import "./shopping-bag-6dSKfxZg.mjs";
function CuentaPage() {
  const {
    user,
    loading: authLoading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState({
    full_name: ""
  });
  const [savingProfile, setSavingProfile] = reactExports.useState(false);
  const [savedProfile, setSavedProfile] = reactExports.useState(false);
  const [addresses, setAddresses] = reactExports.useState([]);
  const [showAddressForm, setShowAddressForm] = reactExports.useState(false);
  const [editingAddress, setEditingAddress] = reactExports.useState(null);
  const [savingAddress, setSavingAddress] = reactExports.useState(false);
  const [addressForm, setAddressForm] = reactExports.useState({
    label: "",
    full_name: "",
    company: "",
    phone: "",
    address: "",
    unit: "",
    city: "",
    department: "",
    postal_code: "",
    is_default: false
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [authLoading, user, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);
  async function loadData() {
    const {
      data: profileData
    } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
    if (profileData) {
      setProfile({
        full_name: profileData.full_name ?? ""
      });
    }
    const {
      data: addressesData
    } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", {
      ascending: false
    });
    setAddresses(addressesData ?? []);
    setLoading(false);
  }
  async function handleSignOut() {
    await signOut();
    navigate({
      to: "/"
    });
  }
  async function saveProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    setSavedProfile(false);
    await supabase.from("profiles").update({
      full_name: profile.full_name || null
    }).eq("id", user.id);
    setSavingProfile(false);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3e3);
  }
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
      is_default: false
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  }
  function startEditAddress(addr) {
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
      is_default: addr.is_default
    });
    setEditingAddress(addr);
    setShowAddressForm(true);
  }
  async function saveAddress(e) {
    e.preventDefault();
    setSavingAddress(true);
    if (addressForm.is_default) {
      await supabase.from("addresses").update({
        is_default: false
      }).eq("user_id", user.id);
    }
    if (editingAddress) {
      await supabase.from("addresses").update({
        ...addressForm
      }).eq("id", editingAddress.id);
    } else {
      await supabase.from("addresses").insert({
        ...addressForm,
        user_id: user.id
      });
    }
    setSavingAddress(false);
    resetAddressForm();
    loadData();
  }
  async function deleteAddress(id) {
    if (!confirm("¿Eliminar esta dirección?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    loadData();
  }
  async function setDefaultAddress(id) {
    await supabase.from("addresses").update({
      is_default: false
    }).eq("user_id", user.id);
    await supabase.from("addresses").update({
      is_default: true
    }).eq("id", id);
    loadData();
  }
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-background min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  }
  const initials = profile.full_name?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() || "??";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Tu espacio" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.88] text-cream", children: "Mi cuenta" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13, strokeWidth: 1.5 }),
          "Cerrar sesión"
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-acid/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl text-acid", children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40 mt-1", children: user.app_metadata?.provider === "google" ? "Google" : "Email" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: saveProfile, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Nombre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: profile.full_name, onChange: (e) => setProfile({
                ...profile,
                full_name: e.target.value
              }), placeholder: "Tu nombre", className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: savingProfile, className: "flex items-center gap-2 bg-cream text-background px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50", children: savedProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
              "Guardado"
            ] }) : savingProfile ? "Guardando..." : "Guardar" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cuenta/pedidos", className: "group border border-border p-6 flex items-center gap-4 hover:border-cream/30 transition-colors block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 20, strokeWidth: 1.5, className: "text-cream/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream", children: "Mis pedidos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40", children: "Ver historial de compras" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid text-sm", children: "→" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-cream/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream", children: "Direcciones de envío" })
          ] }),
          !showAddressForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAddressForm(true), className: "flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-acid hover:text-cream transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
            "Agregar"
          ] })
        ] }),
        showAddressForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: saveAddress, className: "border border-border/50 p-6 mb-6 bg-cream/[0.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-4", children: editingAddress ? "Editar dirección" : "Nueva dirección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Nombre de dirección (Casa, Oficina, Trabajo...)", value: addressForm.label, onChange: (e) => setAddressForm({
              ...addressForm,
              label: e.target.value
            }), className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Nombre completo", value: addressForm.full_name, onChange: (e) => setAddressForm({
              ...addressForm,
              full_name: e.target.value
            }), className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", minLength: 2, required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Empresa (opcional)", value: addressForm.company, onChange: (e) => setAddressForm({
            ...addressForm,
            company: e.target.value
          }), className: "w-full bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", placeholder: "Teléfono (10 dígitos)", value: addressForm.phone, onChange: (e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              setAddressForm({
                ...addressForm,
                phone: val
              });
            }, pattern: "[0-9]{10}", inputMode: "numeric", className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Dirección (Calle 80 #45-30)", value: addressForm.address, onChange: (e) => setAddressForm({
              ...addressForm,
              address: e.target.value
            }), className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Apto, Casa, Torre, Bloque (opcional)", value: addressForm.unit, onChange: (e) => setAddressForm({
            ...addressForm,
            unit: e.target.value
          }), className: "w-full bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Ciudad", value: addressForm.city, onChange: (e) => setAddressForm({
              ...addressForm,
              city: e.target.value
            }), className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: addressForm.department, onChange: (e) => setAddressForm({
              ...addressForm,
              department: e.target.value
            }), className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream focus:border-cream/40 outline-none", required: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-ink", children: "Departamento" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Amazonas", className: "bg-ink", children: "Amazonas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Antioquia", className: "bg-ink", children: "Antioquia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Arauca", className: "bg-ink", children: "Arauca" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Atlántico", className: "bg-ink", children: "Atlántico" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bolívar", className: "bg-ink", children: "Bolívar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Boyacá", className: "bg-ink", children: "Boyacá" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Caldas", className: "bg-ink", children: "Caldas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Caquetá", className: "bg-ink", children: "Caquetá" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Casanare", className: "bg-ink", children: "Casanare" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cauca", className: "bg-ink", children: "Cauca" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cesar", className: "bg-ink", children: "Cesar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Chocó", className: "bg-ink", children: "Chocó" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Córdoba", className: "bg-ink", children: "Córdoba" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cundinamarca", className: "bg-ink", children: "Cundinamarca" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Guainía", className: "bg-ink", children: "Guainía" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Guaviare", className: "bg-ink", children: "Guaviare" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Huila", className: "bg-ink", children: "Huila" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "La Guajira", className: "bg-ink", children: "La Guajira" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Magdalena", className: "bg-ink", children: "Magdalena" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Meta", className: "bg-ink", children: "Meta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Nariño", className: "bg-ink", children: "Nariño" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Norte de Santander", className: "bg-ink", children: "Norte de Santander" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Putumayo", className: "bg-ink", children: "Putumayo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Quindío", className: "bg-ink", children: "Quindío" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Risaralda", className: "bg-ink", children: "Risaralda" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "San Andrés y Providencia", className: "bg-ink", children: "San Andrés y Providencia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Santander", className: "bg-ink", children: "Santander" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sucre", className: "bg-ink", children: "Sucre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Tolima", className: "bg-ink", children: "Tolima" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Valle del Cauca", className: "bg-ink", children: "Valle del Cauca" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Vaupés", className: "bg-ink", children: "Vaupés" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Vichada", className: "bg-ink", children: "Vichada" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Código postal", value: addressForm.postal_code, onChange: (e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setAddressForm({
                ...addressForm,
                postal_code: val
              });
            }, inputMode: "numeric", maxLength: 6, className: "bg-transparent border border-border px-4 py-2.5 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 mb-4 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: addressForm.is_default, onChange: (e) => setAddressForm({
              ...addressForm,
              is_default: e.target.checked
            }), className: "w-4 h-4 accent-acid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/50", children: "Predeterminada" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: savingAddress, className: "bg-cream text-background px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-acid transition-colors disabled:opacity-50", children: savingAddress ? "..." : editingAddress ? "Actualizar" : "Guardar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetAddressForm, className: "border border-border px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-cream/50 hover:border-cream/40 transition-colors", children: "Cancelar" })
          ] })
        ] }),
        addresses.length === 0 && !showAddressForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 text-cream/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 30, strokeWidth: 1, className: "mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No tienes direcciones guardadas" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: addresses.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border p-4 relative ${addr.is_default ? "border-acid" : "border-border/50"}`, children: [
          addr.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "absolute top-3 right-3 text-acid fill-acid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-acid mb-2", children: addr.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: addr.full_name }),
          addr.company && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-cream/40", children: addr.company }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-cream/50", children: [
            addr.address,
            addr.unit ? `, ${addr.unit}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-cream/50", children: [
            addr.city,
            ", ",
            addr.department
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30 mt-1", children: addr.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4 pt-3 border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => startEditAddress(addr), className: "text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-cream transition-colors flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 10 }),
              " Editar"
            ] }),
            !addr.is_default && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDefaultAddress(addr.id), className: "text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-acid transition-colors flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10 }),
              " Predeterminada"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteAddress(addr.id), className: "text-[9px] uppercase tracking-[0.15em] text-cream/40 hover:text-red-400 transition-colors ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 10 }) })
          ] })
        ] }, addr.id)) })
      ] }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CuentaPage as component
};
