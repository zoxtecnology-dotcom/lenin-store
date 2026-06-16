import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader, Store, Megaphone, Truck, CreditCard, MessageCircle, RotateCcw, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/admin/configuracion")({
  component: AdminConfiguracion,
});

interface Setting { key: string; value: string; label: string; }

// Agrupación de settings por sección
const SECTIONS: { title: string; icon: React.ElementType; keys: string[]; description?: string }[] = [
  {
    title: "Tienda",
    icon: Store,
    keys: ["store_address", "store_hours"],
    description: "Información de la tienda",
  },
  {
    title: "Banner de anuncios",
    icon: Megaphone,
    keys: ["announcement_bar"],
    description: "Mensajes que rotan en la parte superior (dejar vacío para ocultar)",
  },
  {
    title: "Envíos",
    icon: Truck,
    keys: ["free_shipping_threshold", "shipping_zona1", "shipping_zona2", "shipping_zona3", "shipping_cost", "shipping_time"],
    description: "Tarifas por zona (Z1: principales · Z2: resto · Z3: remotas). Gratis sobre el umbral.",
  },
  {
    title: "Contraentrega",
    icon: CreditCard,
    keys: ["cod_enabled", "cod_cities", "cod_extra_fee"],
    description: "Pago contra entrega en ciudades específicas",
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    keys: ["min_order_amount"],
    description: "Configuración de pedidos",
  },
  {
    title: "Devoluciones",
    icon: RotateCcw,
    keys: ["returns_days"],
    description: "Política de devoluciones",
  },
  {
    title: "Contacto y redes",
    icon: MessageCircle,
    keys: ["whatsapp_number", "email_contacto", "instagram_url", "tiktok_url", "facebook_url", "youtube_url"],
    description: "Información de contacto y redes sociales",
  },
];

const boolKeys = ["cod_enabled"];
const numberKeys = ["free_shipping_threshold", "shipping_cost", "shipping_zona1", "shipping_zona2", "shipping_zona3", "cod_extra_fee", "min_order_amount", "returns_days"];
const multilineKeys = ["announcement_bar", "cod_cities"];

function AdminConfiguracion() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").order("key")
      .then(({ data }) => { setSettings(data ?? []); setLoading(false); });
  }, []);

  function getSetting(key: string): Setting | undefined {
    return settings.find((s) => s.key === key);
  }

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

  function renderField(s: Setting) {
    if (boolKeys.includes(s.key)) {
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={s.value === "true"}
            onChange={(e) => updateValue(s.key, String(e.target.checked))}
            className="accent-[#d4f542] w-4 h-4"
          />
          <span className="text-sm text-cream">{s.value === "true" ? "Activado" : "Desactivado"}</span>
        </label>
      );
    }

    // Campo especial para WhatsApp con prefijo +57
    if (s.key === "whatsapp_number") {
      return (
        <div className="flex items-center gap-0">
          <span className="bg-cream/10 border border-border border-r-0 text-cream/50 text-sm px-3 py-2">+57</span>
          <input
            type="tel"
            value={s.value}
            onChange={(e) => updateValue(s.key, e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="3XX XXX XXXX"
            className="w-40 bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40"
          />
        </div>
      );
    }

    if (numberKeys.includes(s.key)) {
      return (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={s.value}
            onChange={(e) => updateValue(s.key, e.target.value)}
            className="w-32 bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40"
          />
          <span className="text-[10px] text-cream/30">COP</span>
        </div>
      );
    }

    if (multilineKeys.includes(s.key)) {
      return (
        <div className="space-y-1">
          <input
            type="text"
            value={s.value}
            onChange={(e) => updateValue(s.key, e.target.value)}
            placeholder="Valor 1|Valor 2|Valor 3"
            className="w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40"
          />
          <p className="text-[10px] text-cream/30">Separa los valores con |</p>
        </div>
      );
    }

    return (
      <input
        type="text"
        value={s.value}
        onChange={(e) => updateValue(s.key, e.target.value)}
        className="w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40"
      />
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
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
        <div className="space-y-4">{[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-cream/5 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-6">
          {SECTIONS.map((section) => {
            const sectionSettings = section.keys.map(getSetting).filter(Boolean) as Setting[];
            if (sectionSettings.length === 0) return null;

            return (
              <div key={section.title} className="border border-border">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-cream/5">
                  <section.icon size={16} className="text-acid" />
                  <div>
                    <h3 className="text-sm text-cream font-medium">{section.title}</h3>
                    {section.description && (
                      <p className="text-[10px] text-cream/40">{section.description}</p>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {sectionSettings.map((s) => (
                    <div key={s.key} className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.25em] text-cream/40">{s.label}</label>
                      {renderField(s)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
