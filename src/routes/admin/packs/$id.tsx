import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/packs/$id")({
  component: EditarPack,
});

interface ProductOption { id: string; name: string; price: number; category: string; }

function EditarPack() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductOption[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [form, setForm] = useState({ slug: "", name: "", tag: "", discount: "10", description: "", published: false });

  useEffect(() => {
    Promise.all([
      supabase.from("packs").select("*, pack_items(product_id, position)").eq("id", id).single(),
      supabase.from("products").select("id, name, price, category").order("position"),
    ]).then(([{ data: pack }, { data: products }]) => {
      if (!pack) { navigate({ to: "/admin/packs" }); return; }
      setForm({
        slug: pack.slug, name: pack.name, tag: pack.tag ?? "",
        discount: String(pack.discount), description: pack.description ?? "", published: pack.published,
      });
      const sorted = [...pack.pack_items].sort((a: { position: number }, b: { position: number }) => a.position - b.position);
      setSelectedProductIds(sorted.map((i: { product_id: string }) => i.product_id));
      setAllProducts(products ?? []);
      setLoading(false);
    });
  }, [id, navigate]);

  function set(key: string, value: unknown) { setForm((p) => ({ ...p, [key]: value })); }

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("packs").update({ ...form, discount: parseInt(form.discount) }).eq("id", id);
      await supabase.from("pack_items").delete().eq("pack_id", id);
      await supabase.from("pack_items").insert(
        selectedProductIds.map((product_id, position) => ({ pack_id: id, product_id, position }))
      );
      navigate({ to: "/admin/packs" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" /></div>;

  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const selectedProducts = allProducts.filter((p) => selectedProductIds.includes(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(total * (1 - parseInt(form.discount || "0") / 100));
  const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Packs</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Editar pack</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div><label className={lbl}>Nombre</label><input value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Slug</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Tag</label><input value={form.tag} onChange={(e) => set("tag", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Descuento %</label><input type="number" min={1} max={99} value={form.discount} onChange={(e) => set("discount", e.target.value)} className={input} /></div>
      </div>
      <div><label className={lbl}>Descripción</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="accent-[#d4f542]" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Publicado</span>
      </label>

      <div className="space-y-4">
        <div className="border-b border-border pb-2"><p className="text-[10px] uppercase tracking-[0.3em] text-acid">Productos</p></div>
        {selectedProducts.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-acid/20 px-4 py-3 bg-acid/5">
            <div><p className="text-sm text-cream">{p.name}</p><p className="text-[10px] text-cream/40">{fmt(p.price)}</p></div>
            <button onClick={() => setSelectedProductIds((prev) => prev.filter((pid) => pid !== p.id))} className="text-cream/30 hover:text-red-400 transition-colors">
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        ))}
        {selectedProducts.length >= 2 && (
          <div className="flex items-center justify-between px-4 py-2 border border-border">
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Con -{form.discount}%</span>
            <span className="text-sm text-acid font-medium">{fmt(discounted)}</span>
          </div>
        )}
        <div className="border border-border divide-y divide-border max-h-48 overflow-y-auto">
          {allProducts.filter((p) => !selectedProductIds.includes(p.id)).map((p) => (
            <button key={p.id} onClick={() => setSelectedProductIds((prev) => [...prev, p.id])}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-cream/5 text-left">
              <div><p className="text-[11px] text-cream">{p.name}</p><p className="text-[10px] text-cream/40">{p.category}</p></div>
              <Plus size={12} strokeWidth={2} className="text-acid shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
