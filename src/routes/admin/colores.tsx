import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/colores")({
  component: AdminColores,
});

interface Color {
  id: string;
  name: string;
  swatch: string;
}

function AdminColores() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newColor, setNewColor] = useState({ name: "", swatch: "#1a1a1a" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("colors")
      .select("*")
      .order("name");
    setColors(data ?? []);
    setLoading(false);
  }

  async function addColor() {
    if (!newColor.name.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("colors").insert({
      name: newColor.name.trim(),
      swatch: newColor.swatch,
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      setNewColor({ name: "", swatch: "#1a1a1a" });
      load();
    }
    setSaving(false);
  }

  function updateColor(id: string, field: string, value: string) {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  async function saveColor(color: Color) {
    const { error } = await supabase
      .from("colors")
      .update({ name: color.name, swatch: color.swatch })
      .eq("id", color.id);
    if (error) alert("Error: " + error.message);
  }

  async function deleteColor(id: string) {
    if (!confirm("¿Eliminar este color?")) return;
    const { error } = await supabase.from("colors").delete().eq("id", id);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setColors((prev) => prev.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Catálogo</p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">
          Colores
        </h1>
        <p className="text-sm text-cream/40 mt-2">
          Paleta de colores disponibles para productos.
        </p>
      </div>

      {/* Agregar nuevo color */}
      <div className="border border-border p-4 space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Agregar color</p>
        <div className="flex gap-3">
          <input
            type="color"
            value={newColor.swatch}
            onChange={(e) => setNewColor((prev) => ({ ...prev, swatch: e.target.value }))}
            className="w-12 h-10 bg-transparent border border-border cursor-pointer"
          />
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor((prev) => ({ ...prev, name: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && addColor()}
            placeholder="Nombre del color (ej: Negro Carbón)"
            className="flex-1 bg-transparent border border-border px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none"
          />
          <button
            onClick={addColor}
            disabled={saving || !newColor.name.trim()}
            className="flex items-center gap-2 bg-acid text-ink px-4 py-2 text-[10px] uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <Loader size={14} className="animate-spin" /> : <Plus size={14} />}
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de colores */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 bg-cream/5 animate-pulse" />
          ))}
        </div>
      ) : colors.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <p className="text-cream/40 text-sm">No hay colores guardados.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color.id} className="border border-border p-3 flex items-center gap-3">
              <input
                type="color"
                value={color.swatch}
                onChange={(e) => updateColor(color.id, "swatch", e.target.value)}
                onBlur={() => saveColor(color)}
                className="w-10 h-10 bg-transparent border border-border cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateColor(color.id, "name", e.target.value)}
                onBlur={() => saveColor(color)}
                className="flex-1 bg-transparent border-none text-sm text-cream focus:outline-none"
              />
              <span className="text-[10px] text-cream/30 font-mono uppercase shrink-0">
                {color.swatch}
              </span>
              <button
                onClick={() => deleteColor(color.id)}
                className="p-2 text-cream/20 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-cream/20">
        {colors.length} colores en la paleta
      </p>
    </div>
  );
}
