import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/packs/nuevo")({
  component: NuevoPack,
});

interface ProductOption { id: string; name: string; price: number; category: string; }

function NuevoPack() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductOption[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [form, setForm] = useState({ slug: "", name: "", discount: "10", description: "", published: true });

  useEffect(() => {
    supabase.from("products").select("id, name, price, category").order("position")
      .then(({ data }) => setAllProducts(data ?? []));
  }, []);

  function slugify(str: string) {
    return str.toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  }

  function set(key: string, value: unknown) {
    setForm((p) => ({
      ...p,
      [key]: value,
      ...(key === "name" ? { slug: slugify(value as string) } : {}),
    }));
  }

  function addProduct(id: string) {
    if (!selectedProductIds.includes(id)) setSelectedProductIds((prev) => [...prev, id]);
  }

  function removeProduct(id: string) {
    setSelectedProductIds((prev) => prev.filter((pid) => pid !== id));
  }

  async function handleSave() {
    if (!form.slug || !form.name || selectedProductIds.length < 2) {
      alert("Slug, nombre y al menos 2 productos son obligatorios.");
      return;
    }
    setSaving(true);
    try {
      const { data: pack, error } = await supabase.from("packs").insert({
        slug: form.slug, name: form.name,
        discount: parseInt(form.discount),
        description: form.description,
        published: true,
      }).select().single();
      if (error) throw error;

      await supabase.from("pack_items").insert(
        selectedProductIds.map((product_id, position) => ({ pack_id: pack.id, product_id, position }))
      );
      navigate({ to: "/admin/packs" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const selectedProducts = allProducts.filter((p) => selectedProductIds.includes(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(total * (1 - parseInt(form.discount || "0") / 100));

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Packs</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Nuevo pack</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="border-b border-border pb-2"><p className="text-[10px] uppercase tracking-[0.3em] text-acid">Información</p></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Nombre *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Pack Esencial" className={input} /></div>
          <div><label className={lbl}>Slug — se genera solo</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={`${input} text-cream/50`} /></div>
          <div><label className={lbl}>Descuento %</label><input type="number" min={1} max={99} value={form.discount} onChange={(e) => set("discount", e.target.value)} className={input} /></div>
        </div>
        <div><label className={lbl}>Descripción</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <p className="text-[10px] text-cream/20">Se publica automáticamente. Gestionalo desde el listado.</p>
      </div>

      {/* Selector de productos */}
      <div className="space-y-4">
        <div className="border-b border-border pb-2"><p className="text-[10px] uppercase tracking-[0.3em] text-acid">Productos del pack *</p></div>

        {selectedProducts.length > 0 && (
          <div className="space-y-2 mb-4">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-acid/20 px-4 py-3 bg-acid/5">
                <div>
                  <p className="text-sm text-cream">{p.name}</p>
                  <p className="text-[10px] text-cream/40">{p.category}</p>
                </div>
                <button onClick={() => removeProduct(p.id)} className="text-cream/30 hover:text-red-400 transition-colors">
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {selectedProducts.length >= 2 && (
              <div className="flex items-center justify-between px-4 py-2 border border-border">
                <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Precio con -{form.discount}%</span>
                <span className="text-sm text-acid font-medium">{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(discounted)}</span>
              </div>
            )}
          </div>
        )}

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-2">Agregar producto</p>
          <div className="border border-border divide-y divide-border max-h-64 overflow-y-auto">
            {allProducts.filter((p) => !selectedProductIds.includes(p.id)).map((p) => (
              <button key={p.id} onClick={() => addProduct(p.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-cream/5 transition-colors text-left">
                <div>
                  <p className="text-[11px] text-cream">{p.name}</p>
                  <p className="text-[10px] text-cream/40">{p.category}</p>
                </div>
                <Plus size={12} strokeWidth={2} className="text-acid shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
