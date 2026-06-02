import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, $ as useNavigate, Q as supabase, L as Link } from "./router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-CbOX52zc.mjs";
import { R as Reveal } from "./Reveal-BJbI2hXw.mjs";
import { A as ArrowLeft } from "./arrow-left-COmzqrIF.mjs";
import { C as Check } from "./check-DeLqmXJ4.mjs";
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
function PerfilPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    full_name: "",
    phone: ""
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
      loadProfile();
    }
  }, [user]);
  async function loadProfile() {
    const {
      data
    } = await supabase.from("profiles").select("full_name, phone").eq("id", user.id).single();
    if (data) {
      setForm({
        full_name: data.full_name ?? "",
        phone: data.phone ?? ""
      });
    }
    setLoading(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await supabase.from("profiles").update({
      full_name: form.full_name || null,
      phone: form.phone || null
    }).eq("id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3e3);
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-6", children: "— Datos personales" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] text-cream", children: "Mi perfil" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-acid/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-acid", children: form.full_name?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40 mt-1", children: user.app_metadata?.provider === "google" ? "Conectado con Google" : "Conectado con email" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Nombre completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.full_name, onChange: (e) => setForm({
          ...form,
          full_name: e.target.value
        }), placeholder: "Tu nombre", className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Teléfono" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), placeholder: "Tu número de contacto", className: "w-full bg-transparent border border-border px-4 py-3 text-sm text-cream placeholder:text-cream/20 focus:border-cream/40 outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.2em] text-cream/40 block mb-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: user.email ?? "", disabled: true, className: "w-full bg-cream/[0.02] border border-border px-4 py-3 text-sm text-cream/40 cursor-not-allowed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30 mt-2", children: "El email no se puede cambiar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "flex items-center gap-2 bg-cream text-background px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-acid transition-colors disabled:opacity-50", children: saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
        "Guardado"
      ] }) : saving ? "Guardando..." : "Guardar cambios" })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PerfilPage as component
};
