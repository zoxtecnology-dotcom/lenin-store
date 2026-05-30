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
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate({ to: "/login" });
        return;
      }

      // Verificar rol para redirigir al lugar correcto
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
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
