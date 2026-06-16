import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface SiteSettings {
  // Contacto
  whatsapp_number: string;
  instagram_url: string;
  email_contacto: string;
  tiktok_url: string;
  facebook_url: string;
  youtube_url: string;
  // Envíos
  free_shipping_threshold: string;
  shipping_cost: string;
  shipping_zona1: string;
  shipping_zona2: string;
  shipping_zona3: string;
  shipping_time: string;
  // Contraentrega
  cod_enabled: string;
  cod_cities: string;
  cod_extra_fee: string;
  // Tienda
  store_address: string;
  store_hours: string;
  // Otros
  returns_days: string;
  min_order_amount: string;
  announcement_bar: string;
}

// Defaults (fallback si no hay settings en DB)
const DEFAULTS: SiteSettings = {
  whatsapp_number: "3146309301",
  instagram_url: "https://instagram.com/aiahn.co",
  email_contacto: "hola@aiahn.co",
  tiktok_url: "",
  facebook_url: "",
  youtube_url: "",
  free_shipping_threshold: "200000",
  shipping_cost: "15000",
  shipping_zona1: "12000",
  shipping_zona2: "18000",
  shipping_zona3: "30000",
  shipping_time: "3-5 días hábiles",
  cod_enabled: "true",
  cod_cities: "Medellín|Envigado|Sabaneta|Itagüí|Bello",
  cod_extra_fee: "5000",
  store_address: "Medellín, Colombia",
  store_hours: "Lun-Vie 9am-6pm",
  returns_days: "30",
  min_order_amount: "50000",
  announcement_bar: "",
};

interface SettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
  // Helpers
  whatsappUrl: string;
  whatsappDisplay: string;
  freeShippingThreshold: number;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          const loaded = data.reduce(
            (acc, { key, value }) => ({ ...acc, [key]: value }),
            {} as Partial<SiteSettings>
          );
          setSettings({ ...DEFAULTS, ...loaded });
        }
        setLoading(false);
      });
  }, []);

  // Computed helpers
  const phone = settings.whatsapp_number.replace(/\D/g, "");
  const fullPhone = phone.startsWith("57") ? phone : `57${phone}`;
  const whatsappUrl = `https://wa.me/${fullPhone}`;
  const whatsappDisplay = `+57 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
  const freeShippingThreshold = parseInt(settings.free_shipping_threshold) || 200000;

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        whatsappUrl,
        whatsappDisplay,
        freeShippingThreshold,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    // Fallback para componentes fuera del provider
    return {
      settings: DEFAULTS,
      loading: false,
      whatsappUrl: `https://wa.me/57${DEFAULTS.whatsapp_number}`,
      whatsappDisplay: `+57 ${DEFAULTS.whatsapp_number.slice(0, 3)} ${DEFAULTS.whatsapp_number.slice(3, 6)} ${DEFAULTS.whatsapp_number.slice(6)}`,
      freeShippingThreshold: 200000,
    };
  }
  return ctx;
}
