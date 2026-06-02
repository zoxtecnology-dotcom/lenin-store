import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, $ as useNavigate, Q as supabase, L as Link, P as Plus, T as Trash2 } from "./router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-CbOX52zc.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { A as ArrowLeft } from "./arrow-left-COmzqrIF.mjs";
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
function DireccionesPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    label: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    postal_code: "",
    is_default: false
  });
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [authLoading, user, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);
  async function loadAddresses() {
    const {
      data
    } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", {
      ascending: false
    });
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
      is_default: false
    });
    setEditing(null);
    setShowForm(false);
  }
  function startEdit(addr) {
    setForm({
      label: addr.label,
      full_name: addr.full_name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      department: addr.department,
      postal_code: addr.postal_code,
      is_default: addr.is_default
    });
    setEditing(addr);
    setShowForm(true);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    if (form.is_default) {
      await supabase.from("addresses").update({
        is_default: false
      }).eq("user_id", user.id);
    }
    if (editing) {
      await supabase.from("addresses").update({
        ...form
      }).eq("id", editing.id);
    } else {
      await supabase.from("addresses").insert({
        ...form,
        user_id: user.id
      });
    }
    setSaving(false);
    resetForm();
    loadAddresses();
  }
  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta dirección?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    loadAddresses();
  }
  async function setDefault(id) {
    await supabase.from("addresses").update({
      is_default: false
    }).eq("user_id", user.id);
    await supabase.from("addresses").update({
      is_default: true
    }).eq("id", id);
    loadAddresses();
  }
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-background min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cuenta", className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 12 }),
        "Volver a mi cuenta"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Envíos" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream", children: "Direcciones" }) }),
        !showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowForm(true), className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-acid hover:text-cream transition-colors mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13, strokeWidth: 1.5 }),
          "Agregar"
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
      showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "border border-border p-8 mb-10 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-cream mb-6", children: editing ? "Editar dirección" : "Nueva dirección" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Etiqueta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Ej: Casa, Oficina", value: form.label, onChange: (e) => setForm({
              ...form,
              label: e.target.value
            }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Nombre completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.full_name, onChange: (e) => setForm({
              ...form,
              full_name: e.target.value
            }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Teléfono" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Dirección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Calle, número, apartamento", value: form.address, onChange: (e) => setForm({
            ...form,
            address: e.target.value
          }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Ciudad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.city, onChange: (e) => setForm({
              ...form,
              city: e.target.value
            }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Departamento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.department, onChange: (e) => setForm({
              ...form,
              department: e.target.value
            }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Código postal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.postal_code, onChange: (e) => setForm({
              ...form,
              postal_code: e.target.value
            }), className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 mb-6 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.is_default, onChange: (e) => setForm({
            ...form,
            is_default: e.target.checked
          }), className: "w-4 h-4 accent-acid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream/60", children: "Usar como dirección predeterminada" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "bg-cream text-background px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50", children: saving ? "Guardando..." : editing ? "Actualizar" : "Guardar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetForm, className: "border border-border px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:border-cream/40 transition-colors", children: "Cancelar" })
        ] })
      ] }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) }) : addresses.length === 0 && !showForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 40, strokeWidth: 1, className: "mx-auto text-cream/20 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50 mb-6", children: "No tienes direcciones guardadas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(true), className: "inline-block border border-cream/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-background transition-colors", children: "Agregar dirección" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: addresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border p-6 relative ${addr.is_default ? "border-acid" : "border-border"}`, children: [
        addr.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-acid fill-acid" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid mb-3", children: addr.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream mb-1", children: addr.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60 mb-1", children: addr.address }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cream/60 mb-1", children: [
          addr.city,
          ", ",
          addr.department,
          " ",
          addr.postal_code
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/40", children: addr.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-6 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => startEdit(addr), className: "flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 11 }),
            "Editar"
          ] }),
          !addr.is_default && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDefault(addr.id), className: "flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-acid transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11 }),
            "Predeterminar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(addr.id), className: "flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-red-400 transition-colors ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 }) })
        ] })
      ] }) }, addr.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  DireccionesPage as component
};
