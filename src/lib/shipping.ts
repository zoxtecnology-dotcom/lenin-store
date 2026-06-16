// ═══════════════════════════════════════════════════════════════
// CÁLCULO DE ENVÍO POR ZONAS (Colombia)
// Compartido entre el checkout (cliente) y la creación de preferencia (servidor)
// ═══════════════════════════════════════════════════════════════

export type ShippingZone = 1 | 2 | 3;

// Departamentos por zona. Los que no estén aquí caen en la Zona 2 (resto del país).
// Los nombres deben coincidir EXACTO con la lista DEPARTMENTS del checkout.
const ZONE_BY_DEPARTMENT: Record<string, ShippingZone> = {
  // Zona 1 — principales (más barata)
  "Antioquia": 1,
  "Bogotá D.C.": 1,
  "Cundinamarca": 1,
  "Valle del Cauca": 1,
  "Atlántico": 1,
  "Santander": 1,
  "Risaralda": 1,
  "Caldas": 1,
  "Quindío": 1,

  // Zona 3 — remotas / difícil acceso (más cara)
  "Amazonas": 3,
  "Guainía": 3,
  "Guaviare": 3,
  "Vaupés": 3,
  "Vichada": 3,
  "Chocó": 3,
  "San Andrés y Providencia": 3,
  "Putumayo": 3,
  "La Guajira": 3,
};

export function zoneFor(department: string): ShippingZone {
  return ZONE_BY_DEPARTMENT[department] ?? 2;
}

export interface ShippingRates {
  zona1: number;
  zona2: number;
  zona3: number;
  freeThreshold: number; // subtotal a partir del cual el envío es gratis
}

export const DEFAULT_SHIPPING_RATES: ShippingRates = {
  zona1: 12000,
  zona2: 18000,
  zona3: 30000,
  freeThreshold: 200000,
};

// Construye las tarifas a partir de los valores de site_settings (con fallback a defaults)
export function ratesFromSettings(s: {
  shipping_zona1?: string;
  shipping_zona2?: string;
  shipping_zona3?: string;
  free_shipping_threshold?: string;
}): ShippingRates {
  return {
    zona1: parseInt(s.shipping_zona1 ?? "") || DEFAULT_SHIPPING_RATES.zona1,
    zona2: parseInt(s.shipping_zona2 ?? "") || DEFAULT_SHIPPING_RATES.zona2,
    zona3: parseInt(s.shipping_zona3 ?? "") || DEFAULT_SHIPPING_RATES.zona3,
    freeThreshold: parseInt(s.free_shipping_threshold ?? "") || DEFAULT_SHIPPING_RATES.freeThreshold,
  };
}

// Devuelve el costo de envío. 0 si el subtotal supera el umbral de envío gratis.
export function calcShipping(department: string, subtotal: number, rates: ShippingRates): number {
  if (subtotal >= rates.freeThreshold) return 0;
  const zone = zoneFor(department);
  return zone === 1 ? rates.zona1 : zone === 3 ? rates.zona3 : rates.zona2;
}
