import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { U as useAuth, $ as useNavigate } from "./router-BWVHQLZp.mjs";
import { S as SiteHeader, F as Footer } from "./Footer-DFgriNjy.mjs";
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
import "./shopping-bag-Ce0JJ2U8.mjs";
function LoginPage() {
  const {
    signInWithEmail,
    signInWithGoogle,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (user) navigate({
      to: "/cuenta"
    });
  }, [user, navigate]);
  async function handleMagicLink(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    const {
      error: error2
    } = await signInWithEmail(email.trim());
    setLoading(false);
    if (error2) {
      setError("Hubo un error. Intenta de nuevo.");
    } else {
      setSent(true);
    }
  }
  async function handleGoogle() {
    setError(null);
    const {
      error: error2
    } = await signInWithGoogle();
    if (error2) setError("Error al iniciar con Google. Intenta de nuevo.");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex min-h-screen items-center justify-center px-5 pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.4em] text-acid mb-4", children: "— Acceso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.88] text-cream", children: [
          "Iniciar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "sesión"
        ] })
      ] }),
      sent ? (
        /* Estado: correo enviado */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 border border-border px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-acid/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "text-acid", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid mb-3", children: "Revisa tu correo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/70 text-sm leading-relaxed mb-2", children: [
            "Te enviamos un link a ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream font-medium", children: email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-xs", children: "Haz clic en el link del correo para entrar. Expira en 1 hora." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setSent(false);
            setEmail("");
          }, className: "mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors", children: "Usar otro correo" })
        ] })
      ) : (
        /* Formulario de login */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleGoogle, className: "w-full flex items-center justify-center gap-3 border border-border text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:border-cream/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
            ] }),
            "Continuar con Google"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/30", children: "o" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleMagicLink, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-2", children: "Correo electrónico" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "tu@correo.com", required: true, className: "w-full bg-transparent border border-border text-cream placeholder:text-cream/20 px-4 py-3 text-sm focus:outline-none focus:border-cream/40 transition-colors" })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-xs tracking-wide", children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || !email.trim(), className: "w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors disabled:opacity-40 disabled:cursor-not-allowed", children: loading ? "Enviando..." : "Recibir link por correo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] text-cream/30 leading-relaxed pt-2", children: "Sin contraseñas. Te mandamos un link directo a tu correo." })
        ] })
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  LoginPage as component
};
