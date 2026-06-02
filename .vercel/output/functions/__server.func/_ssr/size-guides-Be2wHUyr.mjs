import { Q as supabase } from "./router-BWVHQLZp.mjs";
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1e3;
async function fetchSizeMeasurements() {
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return cache;
  }
  const { data, error } = await supabase.from("size_measurements").select("*").order("guide_type").order("position");
  if (error) {
    console.error("Error fetching size measurements:", error);
    return [];
  }
  cache = data ?? [];
  cacheTime = Date.now();
  return cache;
}
function getGuideTypeFromCategory(category) {
  if (!category) return "camiseta";
  const c = category.toLowerCase();
  if (["camiseta", "buso", "pantalon", "pantaloneta"].includes(c)) return c;
  if (c.includes("pantaloneta") || c.includes("short") || c.includes("bermuda")) return "pantaloneta";
  if (c.includes("pantal") || c.includes("jean") || c.includes("jogger")) return "pantalon";
  if (c.includes("buso") || c.includes("hoodie") || c.includes("sudadera") || c.includes("buzo")) return "buso";
  return "camiseta";
}
function filterByGuideType(measurements, guideType) {
  return measurements.filter((m) => m.guide_type === guideType);
}
function getMeasurementColumns(measurements) {
  if (!measurements.length) return [];
  const first = measurements[0];
  return Object.keys(first.measurements);
}
function getHowToMeasure(measurements) {
  const withHowTo = measurements.find((m) => m.how_to_measure);
  return withHowTo?.how_to_measure ?? {};
}
function getFitNote(measurements) {
  const withNote = measurements.find((m) => m.fit_note);
  return withNote?.fit_note ?? null;
}
function invalidateSizeCache() {
  cache = null;
  cacheTime = 0;
}
export {
  filterByGuideType as a,
  getGuideTypeFromCategory as b,
  getHowToMeasure as c,
  getMeasurementColumns as d,
  fetchSizeMeasurements as f,
  getFitNote as g,
  invalidateSizeCache as i
};
