import { supabase } from "./supabase";

export interface SizeMeasurement {
  id: string;
  guide_type: string;
  guide_label: string;
  size: string;
  measurements: Record<string, string>;
  how_to_measure: Record<string, string> | null;
  fit_note: string | null;
  position: number;
}

// Cache para evitar múltiples requests
let cache: SizeMeasurement[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function fetchSizeMeasurements(): Promise<SizeMeasurement[]> {
  // Usar cache si está fresco
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return cache;
  }

  const { data, error } = await supabase
    .from("size_measurements")
    .select("*")
    .order("guide_type")
    .order("position");

  if (error) {
    console.error("Error fetching size measurements:", error);
    return [];
  }

  cache = data ?? [];
  cacheTime = Date.now();
  return cache;
}

export function getGuideTypeFromCategory(category?: string): string {
  if (!category) return "camiseta";
  const c = category.toLowerCase();
  
  // Si ya es un tipo de guía válido, devolverlo directamente
  if (["camiseta", "buso", "pantalon", "pantaloneta"].includes(c)) return c;
  
  // Detectar desde nombre de categoría
  if (c.includes("pantaloneta") || c.includes("short") || c.includes("bermuda")) return "pantaloneta";
  if (c.includes("pantal") || c.includes("jean") || c.includes("jogger")) return "pantalon";
  if (c.includes("buso") || c.includes("hoodie") || c.includes("sudadera") || c.includes("buzo")) return "buso";
  return "camiseta";
}

export function filterByGuideType(measurements: SizeMeasurement[], guideType: string): SizeMeasurement[] {
  return measurements.filter((m) => m.guide_type === guideType);
}

// Obtener las columnas (keys del objeto measurements) en orden
export function getMeasurementColumns(measurements: SizeMeasurement[]): string[] {
  if (!measurements.length) return [];
  const first = measurements[0];
  return Object.keys(first.measurements);
}

// Obtener instrucciones de cómo medir (del primer registro que las tenga)
export function getHowToMeasure(measurements: SizeMeasurement[]): Record<string, string> {
  const withHowTo = measurements.find((m) => m.how_to_measure);
  return withHowTo?.how_to_measure ?? {};
}

// Obtener nota de fit (del primer registro que la tenga)
export function getFitNote(measurements: SizeMeasurement[]): string | null {
  const withNote = measurements.find((m) => m.fit_note);
  return withNote?.fit_note ?? null;
}

// Invalidar cache (útil después de editar en admin)
export function invalidateSizeCache() {
  cache = null;
  cacheTime = 0;
}
