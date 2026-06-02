import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { $ as useNavigate, Q as supabase } from "./router-Cd0oBxWL.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
function AuthCallback() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    async function handle() {
      const {
        data: {
          session
        },
        error
      } = await supabase.auth.getSession();
      if (error || !session) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        if (!accessToken) {
          navigate({
            to: "/login"
          });
          return;
        }
        await new Promise((r) => setTimeout(r, 500));
        const {
          data: retryData
        } = await supabase.auth.getSession();
        if (!retryData.session) {
          navigate({
            to: "/login"
          });
          return;
        }
      }
      const {
        data: finalData
      } = await supabase.auth.getSession();
      const finalSession = finalData.session;
      if (!finalSession) {
        navigate({
          to: "/login"
        });
        return;
      }
      const user = finalSession.user;
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        role: "customer"
      }, {
        onConflict: "id",
        ignoreDuplicates: true
      });
      const {
        data: profile
      } = await supabase.from("profiles").select("role").eq("id", finalSession.user.id).single();
      navigate({
        to: profile?.role === "admin" ? "/admin" : "/cuenta"
      });
    }
    handle();
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background min-h-screen flex flex-col items-center justify-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/30", children: "Verificando sesión..." })
  ] });
}
export {
  AuthCallback as component
};
