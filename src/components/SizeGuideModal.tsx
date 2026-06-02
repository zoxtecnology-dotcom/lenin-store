import { useEffect, useState } from "react";
import { X, Loader } from "lucide-react";
import {
  fetchSizeMeasurements,
  getGuideTypeFromCategory,
  filterByGuideType,
  getMeasurementColumns,
  getHowToMeasure,
  getFitNote,
  type SizeMeasurement,
} from "@/lib/size-guides";

interface Props {
  open: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ open, onClose, category }: Props) {
  const [loading, setLoading] = useState(true);
  const [measurements, setMeasurements] = useState<SizeMeasurement[]>([]);

  useEffect(() => {
    if (!open) return;
    
    setLoading(true);
    fetchSizeMeasurements().then((data) => {
      setMeasurements(data);
      setLoading(false);
    });

    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const guideType = getGuideTypeFromCategory(category);
  const filtered = filterByGuideType(measurements, guideType);
  const columns = getMeasurementColumns(filtered);
  const howToMeasure = getHowToMeasure(filtered);
  const fitNote = getFitNote(filtered);
  const isPierna = guideType === "pantalon" || guideType === "pantaloneta";
  
  const guideLabel = filtered[0]?.guide_label ?? (
    guideType === "pantaloneta" ? "Pantalonetas" 
    : guideType === "pantalon" ? "Pantalones" 
    : guideType === "buso" ? "Chaqueta / Busos"
    : "Camisetas"
  );

  // Capitalizar nombres de columnas para header
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-border animate-in zoom-in-95 fade-in duration-200"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between px-6 py-4 z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-acid">— Ayuda</p>
            <h2 className="font-display text-2xl uppercase leading-none text-cream mt-1">
              Guía de Tallas · {guideLabel}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-cream/50 hover:text-cream transition-colors">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader className="animate-spin text-acid" size={24} />
          </div>
        ) : (
          <div className="p-6 space-y-8">
            <p className="text-sm leading-relaxed text-cream/55">
              Medidas en centímetros, del cuerpo (no de la prenda). AIAHN usa corte oversize —
              si quieres un fit más ceñido, baja una talla.
            </p>

            {/* Diagrama */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">Dónde medir</p>
              <div className="border border-border bg-bone/[0.03] p-6 flex justify-center">
                {guideType === "pantaloneta" ? (
                  <svg viewBox="0 0 240 180" className="w-full max-w-[200px]" fill="none">
                    <path d="M70 20 L170 20 L175 70 L155 160 L120 160 L120 90 L100 160 L65 160 L65 70 Z"
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="60" y1="12" x2="180" y2="12" stroke="var(--acid)" strokeWidth="1" />
                    <text x="120" y="6" fill="var(--acid)" fontSize="10" textAnchor="middle">Cintura</text>
                    <line x1="62" y1="50" x2="178" y2="50" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="195" y="52" fill="var(--acid)" fontSize="10">Cadera</text>
                    <line x1="120" y1="20" x2="120" y2="85" stroke="var(--acid)" strokeWidth="1" />
                    <text x="126" y="55" fill="var(--acid)" fontSize="10">Tiro</text>
                    <line x1="82" y1="22" x2="82" y2="158" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="40" y="95" fill="var(--acid)" fontSize="10">Largo</text>
                  </svg>
                ) : guideType === "pantalon" ? (
                  <svg viewBox="0 0 240 280" className="w-full max-w-[200px]" fill="none">
                    <path d="M70 20 L170 20 L175 120 L150 270 L120 270 L120 140 L100 270 L70 270 L65 120 Z"
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="60" y1="12" x2="180" y2="12" stroke="var(--acid)" strokeWidth="1" />
                    <text x="120" y="6" fill="var(--acid)" fontSize="10" textAnchor="middle">Cintura</text>
                    <line x1="62" y1="60" x2="178" y2="60" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="195" y="62" fill="var(--acid)" fontSize="10">Cadera</text>
                    <line x1="120" y1="20" x2="120" y2="130" stroke="var(--acid)" strokeWidth="1" />
                    <text x="126" y="80" fill="var(--acid)" fontSize="10">Tiro</text>
                    <line x1="85" y1="22" x2="85" y2="268" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="40" y="150" fill="var(--acid)" fontSize="10">Largo</text>
                  </svg>
                ) : guideType === "buso" ? (
                  /* Chaqueta / Buso - manga larga sin capucha */
                  <svg viewBox="0 0 320 260" className="w-full max-w-[280px]" fill="none">
                    {/* Manga izquierda */}
                    <path d="M95 55 L55 65 L25 195 L55 200 L75 95" 
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" fill="none" />
                    {/* Manga derecha */}
                    <path d="M225 55 L265 65 L295 195 L265 200 L245 95" 
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" fill="none" />
                    {/* Cuerpo */}
                    <path d="M95 55 L95 220 L225 220 L225 55" 
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" fill="none" />
                    {/* Hombros */}
                    <path d="M95 55 L130 40 Q160 50 190 40 L225 55" 
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" fill="none" />
                    {/* Cuello redondo */}
                    <path d="M130 40 Q160 55 190 40" 
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" fill="none" />
                    {/* Cierre central */}
                    <line x1="160" y1="52" x2="160" y2="218" stroke="var(--cream)" strokeWidth="1" opacity="0.25" strokeDasharray="5 3" />
                    {/* Puño izquierdo */}
                    <line x1="25" y1="195" x2="55" y2="200" stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    {/* Puño derecho */}
                    <line x1="295" y1="195" x2="265" y2="200" stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    
                    {/* A - Hombros */}
                    <line x1="95" y1="30" x2="225" y2="30" stroke="var(--acid)" strokeWidth="1" />
                    <circle cx="95" cy="30" r="2" fill="var(--acid)" />
                    <circle cx="225" cy="30" r="2" fill="var(--acid)" />
                    <text x="160" y="22" fill="var(--acid)" fontSize="10" textAnchor="middle">A · Hombros</text>
                    
                    {/* B - Manga (desde hombro hasta puño) */}
                    <line x1="95" y1="55" x2="40" y2="197" stroke="var(--acid)" strokeWidth="1" />
                    <circle cx="95" cy="55" r="2" fill="var(--acid)" />
                    <circle cx="40" cy="197" r="2" fill="var(--acid)" />
                    <text x="45" y="130" fill="var(--acid)" fontSize="10" transform="rotate(-72 45 130)">B · Manga</text>
                    
                    {/* C - Largo */}
                    <line x1="160" y1="48" x2="160" y2="218" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="160" cy="48" r="2" fill="var(--acid)" />
                    <circle cx="160" cy="218" r="2" fill="var(--acid)" />
                    <text x="172" y="135" fill="var(--acid)" fontSize="10">C · Largo</text>
                    
                    {/* D - Pecho */}
                    <line x1="95" y1="240" x2="225" y2="240" stroke="var(--acid)" strokeWidth="1" />
                    <circle cx="95" cy="240" r="2" fill="var(--acid)" />
                    <circle cx="225" cy="240" r="2" fill="var(--acid)" />
                    <text x="160" y="254" fill="var(--acid)" fontSize="10" textAnchor="middle">D · Pecho</text>
                  </svg>
                ) : (
                  /* Camiseta - manga corta */
                  <svg viewBox="0 0 300 260" className="w-full max-w-[280px]" fill="none">
                    <path d="M70 50 L40 75 L60 100 L75 90 L75 220 L225 220 L225 90 L240 100 L260 75 L230 50 L195 35 Q150 60 105 35 Z"
                      stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    <path d="M105 35 Q150 60 195 35" stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="105" y1="22" x2="195" y2="22" stroke="var(--acid)" strokeWidth="1" />
                    <text x="150" y="16" fill="var(--acid)" fontSize="11" textAnchor="middle">A · Hombros</text>
                    <line x1="232" y1="48" x2="255" y2="95" stroke="var(--acid)" strokeWidth="1" />
                    <text x="270" y="75" fill="var(--acid)" fontSize="11" textAnchor="middle" transform="rotate(63 270 75)">B · Manga</text>
                    <line x1="150" y1="65" x2="150" y2="215" stroke="var(--acid)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="158" y="145" fill="var(--acid)" fontSize="11">C · Largo</text>
                    <line x1="78" y1="235" x2="222" y2="235" stroke="var(--acid)" strokeWidth="1" />
                    <text x="150" y="252" fill="var(--acid)" fontSize="11" textAnchor="middle">D · Pecho</text>
                  </svg>
                )}
              </div>
            </div>

            {/* Tabla */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">Tabla de tallas (cm)</p>
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-sm border-collapse min-w-[420px]">
                  <thead>
                    <tr className="border-b border-border bg-bone/[0.03]">
                      <th className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal">Talla</th>
                      {columns.map((col) => (
                        <th key={col} className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal">
                          {capitalize(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, i) => (
                      <tr key={row.id} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-bone/[0.02]"}`}>
                        <td className="py-3 px-4 font-display text-base text-acid">{row.size.toUpperCase()}</td>
                        {columns.map((col) => (
                          <td key={col} className="py-3 px-4 text-cream/70">{row.measurements[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[10px] text-cream/30 uppercase tracking-[0.2em]">
                * Pueden variar ±1 cm según el tejido y el lavado.
              </p>
            </div>

            {/* Cómo medir */}
            {Object.keys(howToMeasure).length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-4">Cómo tomar tus medidas</p>
                <div className="space-y-3">
                  {Object.entries(howToMeasure).map(([key, value], idx) => (
                    <div key={key} className="flex gap-4">
                      <span className="font-display text-sm text-acid/60 shrink-0 w-6">{String(idx + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-display text-sm uppercase text-cream">{capitalize(key)}</h3>
                        <p className="text-[13px] leading-relaxed text-cream/55 mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fit note */}
            {fitNote && (
              <div className="border border-border p-5 bg-acid/5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-2">Fit oversize</p>
                <p className="text-[13px] leading-relaxed text-cream/55">{fitNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
