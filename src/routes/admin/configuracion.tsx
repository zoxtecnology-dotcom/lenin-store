import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/configuracion")({
  component: AdminConfiguracion,
});

interface Setting { key: string; value: string; label: string; }

function AdminConfiguracion() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").order("key")
      .then(({ data }) => { setSettings(data ?? []); setLoading(false); });
  }, []);

  function updateValue(key: string, value: string) {
    setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value } : s));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all(
        settings.map((s) =>
          supabase.from("site_settings").update({ value: s.value }).eq("key", s.key)
        )
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  const boolKeys = ["announcement_active", "store_open"];
  const numberKeys = ["free_shipping_threshold"];

  return (
    <div className="space-y-8 max-w-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Ajustes</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Configuración</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saved ? "¡Guardado!" : saving ? "Guardando..." : "Guardar todo"}
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-cream/5 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4">
          {settings.map((s) => (
            <div key={s.key} className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/40">{s.label}</label>
              {boolKeys.includes(s.key) ? (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.value === "true"}
                    onChange={(e) => updateValue(s.key, String(e.target.checked))}
                    className="accent-[#d4f542] w-4 h-4"
                  />
                  <span className="text-sm text-cream">{s.value === "true" ? "Activado" : "Desactivado"}</span>
                </label>
              ) : numberKeys.includes(s.key) ? (
                <input
                  type="number"
                  value={s.value}
                  onChange={(e) => updateValue(s.key, e.target.value)}
                  className="w-full bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40"
                />
              ) : (
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => updateValue(s.key, e.target.value)}
                  className="w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40"
                />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
