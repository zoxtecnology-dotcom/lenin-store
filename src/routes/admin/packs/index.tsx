import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { fmtCOP } from "@/lib/products";

export const Route = createFileRoute("/admin/packs/")({
  component: AdminPacks,
});

interface Pack {
  id: string;
  slug: string;
  name: string;
  tag: string;
  discount: number;
  published: boolean;
  pack_items: { product: { name: string; price: number } }[];
}

function AdminPacks() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("packs")
      .select("*, pack_items(product:products(name, price))")
      .order("position")
      .then(({ data }) => { setPacks(data ?? []); setLoading(false); });
  }, []);

  async function toggle(id: string, current: boolean) {
    await supabase.from("packs").update({ published: !current }).eq("id", id);
    setPacks((prev) => prev.map((p) => p.id === id ? { ...p, published: !current } : p));
  }

  async function deletePack(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    await supabase.from("packs").delete().eq("id", id);
    setPacks((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Ofertas</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Packs</h1>
        </div>
        <Link to="/admin/packs/nuevo"
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90">
          <Plus size={14} strokeWidth={2} /> Nuevo
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-cream/5 animate-pulse" />)}</div>
      ) : packs.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-cream/40 text-sm mb-4">No hay packs todavía.</p>
          <Link to="/admin/packs/nuevo" className="text-[11px] uppercase tracking-[0.3em] text-acid hover:underline">Crear el primero →</Link>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {packs.map((pack) => {
            const total = pack.pack_items.reduce((sum, i) => sum + i.product.price, 0);
            const discounted = Math.round(total * (1 - pack.discount / 100));
            return (
              <div key={pack.id} className="flex items-center gap-4 p-4 hover:bg-cream/5 transition-colors">
                <div className="flex-1">
                  <p className="text-sm text-cream">{pack.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-cream/40">{pack.tag}</span>
                    <span className="text-[10px] text-acid">-{pack.discount}%</span>
                    <span className="text-[10px] text-cream/40">{fmtCOP(discounted)}</span>
                    <span className="text-[10px] text-cream/20">{pack.pack_items.length} productos</span>
                  </div>
                </div>
                <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${pack.published ? "bg-acid/10 text-acid" : "bg-cream/5 text-cream/30"}`}>
                  {pack.published ? "Publicado" : "Borrador"}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(pack.id, pack.published)} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors">
                    {pack.published ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                  </button>
                  <Link to="/admin/packs/$id" params={{ id: pack.id }} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-cream transition-colors">
                    <Edit size={14} strokeWidth={1.5} />
                  </Link>
                  <button onClick={() => deletePack(pack.id, pack.name)} className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-red-400 transition-colors">
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
