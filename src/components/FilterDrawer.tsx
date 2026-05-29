import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
const COLORS = [
  { name: "Negro", swatch: "#0a0a0a" },
  { name: "Grafito", swatch: "#363636" },
  { name: "Hueso", swatch: "#e8e0d0" },
  { name: "Olive", swatch: "#4a4a30" },
  { name: "Acid", swatch: "#d4ff00" },
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 350000;

export interface Filters {
  tallas: string[];
  colores: string[];
  precioMin: number;
  precioMax: number;
  disponible: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  tallas: [],
  colores: [],
  precioMin: PRICE_MIN,
  precioMax: PRICE_MAX,
  disponible: false,
};

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  sort: string;
  onFiltersChange: (f: Filters) => void;
  onSortChange: (s: string) => void;
  activeCount: number;
  availableSizes?: string[];
}

function fmtCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
}

export function FilterDrawer({
  open, onClose, filters, onFiltersChange, activeCount, availableSizes,
}: FilterDrawerProps) {
  const sizes = availableSizes ?? ALL_SIZES;

  const minPct = ((filters.precioMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((filters.precioMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function toggleTalla(t: string) {
    const next = filters.tallas.includes(t)
      ? filters.tallas.filter((x) => x !== t)
      : [...filters.tallas, t];
    onFiltersChange({ ...filters, tallas: next });
  }

  function toggleColor(c: string) {
    const next = filters.colores.includes(c)
      ? filters.colores.filter((x) => x !== c)
      : [...filters.colores, c];
    onFiltersChange({ ...filters, colores: next });
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="left"
        className="bg-background border-r border-border flex flex-col p-0 w-full max-w-[340px]"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border shrink-0">
          <SheetTitle className="font-display text-base uppercase tracking-[0.2em] text-cream">
            Filtros {activeCount > 0 && <span className="text-acid">({activeCount})</span>}
          </SheetTitle>
          <div className="flex items-center gap-4">
            {activeCount > 0 && (
              <button
                onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                className="text-[10px] uppercase tracking-[0.25em] text-cream/50 hover:text-acid transition-colors"
              >
                Limpiar
              </button>
            )}
            <SheetClose className="text-cream/50 hover:text-cream transition-colors">
              <X size={16} strokeWidth={1.5} />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Precio */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Precio</p>
            </div>

            {/* Dual range slider */}
            <div className="relative h-5 flex items-center mb-5">
              {/* Track base */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border pointer-events-none" />
              {/* Active fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-px bg-cream pointer-events-none"
                style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
              />

              {/* Min input */}
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10000}
                value={filters.precioMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < filters.precioMax) onFiltersChange({ ...filters, precioMin: val });
                }}
                className="absolute inset-0 w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-10
                  [&::-webkit-slider-runnable-track]:bg-transparent
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-cream
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-background
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_oklch(0.87_0.015_80)]
                  [&::-moz-range-track]:bg-transparent
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-cream
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-background"
              />

              {/* Max input */}
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10000}
                value={filters.precioMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > filters.precioMin) onFiltersChange({ ...filters, precioMax: val });
                }}
                className="absolute inset-0 w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-20
                  [&::-webkit-slider-runnable-track]:bg-transparent
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-acid
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-background
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_oklch(0.95_0.22_115)]
                  [&::-moz-range-track]:bg-transparent
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-acid
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-background"
              />
            </div>

            {/* Manual inputs */}
            <div className="flex items-center gap-3">
              <PriceInput
                label="Mínimo"
                value={filters.precioMin}
                min={PRICE_MIN}
                max={filters.precioMax - 10000}
                onChange={(v) => onFiltersChange({ ...filters, precioMin: v })}
              />
              <div className="h-px w-3 bg-border shrink-0" />
              <PriceInput
                label="Máximo"
                value={filters.precioMax}
                min={filters.precioMin + 10000}
                max={PRICE_MAX}
                onChange={(v) => onFiltersChange({ ...filters, precioMax: v })}
              />
            </div>
          </div>

          {/* Talla */}
          {sizes.length > 1 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">Talla</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleTalla(s)}
                    className={cn(
                      "min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all",
                      filters.tallas.includes(s)
                        ? "bg-cream text-ink border-cream"
                        : "text-cream/60 border-border hover:border-cream hover:text-cream"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3">Color</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => toggleColor(c.name)}
                  aria-label={c.name}
                  title={c.name}
                  className={cn(
                    "w-8 h-8 border-2 transition-all",
                    filters.colores.includes(c.name)
                      ? "border-cream scale-110"
                      : "border-transparent hover:border-cream/50"
                  )}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
          </div>

          {/* Disponibilidad */}
          <div>
            <button
              onClick={() => onFiltersChange({ ...filters, disponible: !filters.disponible })}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-cream/70 hover:text-cream transition-colors"
            >
              <span className={cn(
                "w-8 h-4 border relative flex-shrink-0 transition-colors",
                filters.disponible ? "bg-acid border-acid" : "border-border"
              )}>
                <span className={cn(
                  "absolute top-0.5 w-3 h-3 bg-ink transition-all",
                  filters.disponible ? "left-4" : "left-0.5"
                )} />
              </span>
              Solo disponibles
            </button>
          </div>

        </div>

        <div className="px-6 pb-6 pt-4 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-cream text-ink py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors"
          >
            Ver resultados
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PriceInput({ label, value, min, max, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex-1 border border-border focus-within:border-cream transition-colors">
      <div className="px-2 pt-1.5">
        <span className="text-[8px] uppercase tracking-[0.25em] text-cream/30">{label}</span>
      </div>
      <input
        type="text"
        inputMode="numeric"
        value={focused ? raw : fmtCOP(value)}
        onChange={(e) => setRaw(e.target.value)}
        onFocus={() => { setFocused(true); setRaw(String(value)); }}
        onBlur={() => {
          setFocused(false);
          const parsed = parseInt(raw.replace(/\D/g, ""), 10);
          if (!isNaN(parsed)) {
            onChange(Math.min(max, Math.max(min, Math.round(parsed / 1000) * 1000)));
          }
          setRaw("");
        }}
        className="w-full bg-transparent px-2 pb-2 text-[11px] tabular-nums text-cream focus:outline-none"
      />
    </div>
  );
}
