import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handle() {
      // Esperar a que Supabase procese el hash de OAuth
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // Intentar intercambiar el código OAuth manualmente
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        
        if (!accessToken) {
          navigate({ to: "/login" });
          return;
        }
        
        // Esperar un momento y reintentar
        await new Promise(r => setTimeout(r, 500));
        const { data: retryData } = await supabase.auth.getSession();
        if (!retryData.session) {
          navigate({ to: "/login" });
          return;
        }
      }

      // Obtener sesión actualizada
      const { data: finalData } = await supabase.auth.getSession();
      const finalSession = finalData.session;
      
      if (!finalSession) {
        navigate({ to: "/login" });
        return;
      }

      const user = finalSession.user;

      // Crear perfil si no existe
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        role: "customer",
      }, { onConflict: "id", ignoreDuplicates: true });

      // Verificar rol para redirigir al lugar correcto
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", finalSession.user.id)
        .single();

      navigate({ to: profile?.role === "admin" ? "/admin" : "/cuenta" });
    }

    handle();
  }, [navigate]);

  return (
    <main className="bg-background min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream/30">Verificando sesión...</p>
    </main>
  );
}
