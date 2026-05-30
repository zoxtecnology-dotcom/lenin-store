import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/drops/")({
  component: AdminDrops,
});

interface Drop {
  id: string;
  slug: string;
  name: string;
  label: string;
  season: string;
  published: boolean;
  release_date: string;
}

function AdminDrops() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("drops").select("*").order("position").then(({ data }) => {
      setDrops(data ?? []);
      setLoading(false);
    });
  }, []);

  async function toggle(id: string, current: boolean) {
    await supabase.from("drops").update({ published: !current }).eq("id", id);
    setDrops((prev) => prev.map((d) => d.id === id ? { ...d, published: !current } : d));
  }

  async function deleteDrop(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    await supabase.from("drops").delete().eq("id", id);
    setDrops((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Colecciones</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Drops</h1>
        </div>
        <Link to="/admin/drops/nuevo"
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity">
          <Plus size={14} strokeWidth={2} /> Nuevo
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-cream/5 animate-pulse" />)}</div>
      ) : drops.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-cream/40 text-sm mb-4">No hay drops todavía.</p>
          <Link to="/admin/drops/nuevo" className="text-[11px] uppercase tracking-[0.3em] text-acid hover:underline">Crear el primero →</Link>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {drops.map((d) => (
            <div key={d.id} className="flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors">
              <div className="flex-1">
                <p className="text-sm text-cream">{d.name} — {d.label}</p>
                <p className="text-[10px] text-cream/40 mt-0.5">{d.season} · {d.release_date ?? "Sin fecha"}</p>
              </div>
              <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${d.published ? "bg-acid/10 text-acid" : "bg-cream/5 text-cream/30"}`}>
                {d.published ? "Publicado" : "Borrador"}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => toggle(d.id, d.published)} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors">
                  {d.published ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                </button>
                <Link to="/admin/drops/$id" params={{ id: d.id }} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors">
                  <Edit size={14} strokeWidth={1.5} />
                </Link>
                <button onClick={() => deleteDrop(d.id, d.name)} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-red-400 transition-colors">
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
