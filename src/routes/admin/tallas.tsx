import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader, Plus, Trash2 } from "lucide-react";
import { invalidateSizeCache, type SizeMeasurement } from "@/lib/size-guides";

export const Route = createFileRoute("/admin/tallas")({
  component: AdminTallas,
});

const GUIDE_TYPES = [
  { value: "camiseta", label: "Camisetas", description: "T-shirts, polos, camisas" },
  { value: "buso", label: "Chaqueta / Busos", description: "Chaquetas, busos, hoodies, sudaderas" },
  { value: "pantalon", label: "Pantalones", description: "Pantalones largos, jeans, joggers" },
  { value: "pantaloneta", label: "Pantalonetas", description: "Shorts, pantalonetas, bermudas" },
];

function AdminTallas() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeType, setActiveType] = useState("camiseta");
  const [measurements, setMeasurements] = useState<SizeMeasurement[]>([]);
  const [fitNote, setFitNote] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const { data } = await supabase
      .from("size_measurements")
      .select("*")
      .order("guide_type")
      .order("position");
    setMeasurements(data ?? []);
    setLoading(false);
  }

  const filtered = measurements.filter((m) => m.guide_type === activeType);
  const columns = filtered.length > 0 ? Object.keys(filtered[0].measurements) : [];

  useEffect(() => {
    const first = filtered.find((m) => m.fit_note);
    setFitNote(first?.fit_note ?? "");
  }, [activeType, measurements]);

  function updateMeasurement(id: string, col: string, value: string) {
    setMeasurements((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, measurements: { ...m.measurements, [col]: value } } : m
      )
    );
  }

  function updateFitNote(value: string) {
    setFitNote(value);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const toSave = measurements.filter((m) => m.guide_type === activeType);
      
      for (let i = 0; i < toSave.length; i++) {
        const m = toSave[i];
        await supabase
          .from("size_measurements")
          .update({
            measurements: m.measurements,
            fit_note: i === 0 ? fitNote : null,
          })
          .eq("id", m.id);
      }

      invalidateSizeCache();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  async function addSize() {
    const existingSizes = filtered.map((m) => m.size);
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
    const nextSize = allSizes.find((s) => !existingSizes.includes(s));
    
    if (!nextSize) {
      alert("Ya existen todas las tallas estándar");
      return;
    }

    const template = filtered[0];
    if (!template) {
      alert("No hay plantilla de medidas para este tipo");
      return;
    }

    const emptyMeasurements: Record<string, string> = {};
    Object.keys(template.measurements).forEach((key) => {
      emptyMeasurements[key] = "";
    });

    const { data, error } = await supabase
      .from("size_measurements")
      .insert({
        guide_type: activeType,
        guide_label: template.guide_label,
        size: nextSize.toUpperCase(),
        measurements: emptyMeasurements,
        position: filtered.length,
      })
      .select()
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    setMeasurements((prev) => [...prev, data]);
    invalidateSizeCache();
  }

  async function removeSize(id: string) {
    if (!confirm("¿Eliminar esta talla?")) return;
    
    const { error } = await supabase.from("size_measurements").delete().eq("id", id);
    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }
    
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
    invalidateSizeCache();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Ajustes</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">
            Guía de Tallas
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saved ? "¡Guardado!" : saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="flex gap-2 border-b border-border">
        {GUIDE_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setActiveType(type.value)}
            className={`px-4 py-3 text-[11px] uppercase tracking-[0.2em] border-b-2 transition-colors ${
              activeType === type.value
                ? "border-acid text-acid"
                : "border-transparent text-cream/50 hover:text-cream"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-cream/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-cream/50">
            {GUIDE_TYPES.find((t) => t.value === activeType)?.description}
          </p>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-bone/[0.03]">
                  <th className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal w-20">
                    Talla
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 font-normal"
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                    </th>
                  ))}
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "" : "bg-bone/[0.02]"}`}
                  >
                    <td className="py-2 px-4 font-display text-base text-acid">{row.size.toUpperCase()}</td>
                    {columns.map((col) => (
                      <td key={col} className="py-2 px-2">
                        <input
                          type="text"
                          value={row.measurements[col] ?? ""}
                          onChange={(e) => updateMeasurement(row.id, col, e.target.value)}
                          className="w-full bg-background border border-border/50 text-cream text-sm px-2 py-1.5 focus:outline-none focus:border-cream/40"
                        />
                      </td>
                    ))}
                    <td className="py-2 px-2">
                      <button
                        onClick={() => removeSize(row.id)}
                        className="text-cream/30 hover:text-red-400 transition-colors p-1"
                        title="Eliminar talla"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addSize}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/50 hover:text-acid transition-colors"
          >
            <Plus size={14} /> Añadir talla
          </button>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
              Nota de fit (se muestra en el modal)
            </label>
            <textarea
              value={fitNote}
              onChange={(e) => updateFitNote(e.target.value)}
              rows={2}
              className="w-full bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40 resize-none"
              placeholder="Ej: La talla M equivale a un L en corte regular..."
            />
          </div>

          <div className="border border-border/50 p-4 bg-bone/[0.02]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-2">Vista previa</p>
            <p className="text-sm text-cream/70">
              Todas las medidas son en centímetros (cm) del cuerpo, no de la prenda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
