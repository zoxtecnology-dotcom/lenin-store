import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageUpload, type UploadedImage } from "@/components/admin/ImageUpload";
import { Save, Loader, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/drops/$id")({
  component: EditarDrop,
});

interface ProductItem { id: string; slug: string; name: string; category: string; drop_id: string | null; }

function EditarDrop() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dropProducts, setDropProducts] = useState<ProductItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const [form, setForm] = useState({
    slug: "", name: "", label: "", season: "",
    release_date: "", editorial_quote: "", editorial_body: "",
    discount: "12", published: false,
  });

  useEffect(() => {
    async function load() {
      const [{ data: drop }, { data: prods }] = await Promise.all([
        supabase.from("drops").select("*, drop_images(*)").eq("id", id).single(),
        supabase.from("products").select("id, slug, name, category, drop_id").order("position"),
      ]);

      if (!drop) { navigate({ to: "/admin/drops" }); return; }

      setForm({
        slug: drop.slug, name: drop.name, label: drop.label ?? "",
        season: drop.season ?? "", release_date: drop.release_date ?? "",
        editorial_quote: drop.editorial_quote ?? "", editorial_body: drop.editorial_body ?? "",
        discount: String(drop.discount ?? 12), published: drop.published,
      });
      setImages(drop.drop_images.map((img: UploadedImage) => ({
        cloudinary_id: img.cloudinary_id, role: "gallery" as const,
        alt_text: img.alt_text, position: img.position,
      })));

      const all = prods ?? [];
      setAllProducts(all);
      setDropProducts(all.filter((p) => p.drop_id === id));
      setLoading(false);
    }
    load();
  }, [id, navigate]);

  function set(key: string, value: unknown) { setForm((p) => ({ ...p, [key]: value })); }

  async function assignProduct(product: ProductItem) {
    await supabase.from("products").update({ drop_id: id }).eq("id", product.id);
    setDropProducts((prev) => [...prev, product]);
    setShowPicker(false);
  }

  async function removeProduct(product: ProductItem) {
    await supabase.from("products").update({ drop_id: null }).eq("id", product.id);
    setDropProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("drops").update({
        ...form,
        release_date: form.release_date || null,
        discount: parseInt(form.discount) || 12,
      }).eq("id", id);
      await supabase.from("drop_images").delete().eq("drop_id", id);
      if (images.length > 0) {
        await supabase.from("drop_images").insert(
          images.map((img) => ({ drop_id: id, cloudinary_id: img.cloudinary_id, alt_text: img.alt_text, position: img.position }))
        );
      }
      navigate({ to: "/admin/drops" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" /></div>;

  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";
  const unassigned = allProducts.filter((p) => !dropProducts.find((dp) => dp.id === p.id));

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Drops</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Editar drop</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {/* Info del drop */}
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lbl}>Nombre</label><input value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Slug</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Label</label><input value={form.label} onChange={(e) => set("label", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Season</label><input value={form.season} onChange={(e) => set("season", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Fecha de lanzamiento</label><input type="date" value={form.release_date} onChange={(e) => set("release_date", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Descuento drop completo %</label><input type="number" min={0} max={99} value={form.discount} onChange={(e) => set("discount", e.target.value)} placeholder="12" className={input} /></div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="accent-[#d4f542]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Publicado</span>
          </label>
        </div>
      </div>
      <div><label className={lbl}>Frase editorial</label><input value={form.editorial_quote} onChange={(e) => set("editorial_quote", e.target.value)} className={input} /></div>
      <div><label className={lbl}>Texto editorial</label><textarea value={form.editorial_body} onChange={(e) => set("editorial_body", e.target.value)} rows={4} className={input} /></div>

      {/* Imágenes editoriales */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid border-b border-border pb-2">Imágenes editoriales</p>
        <ImageUpload images={images} onChange={setImages} showRoles={false} />
      </div>

      {/* Productos del drop */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-acid">
            Productos en este drop ({dropProducts.length})
          </p>
          <button
            onClick={() => setShowPicker((v) => !v)}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-acid hover:opacity-70 transition-opacity"
          >
            <Plus size={12} strokeWidth={2} /> Asignar producto
          </button>
        </div>

        {/* Lista de productos asignados */}
        {dropProducts.length === 0 ? (
          <p className="text-[11px] text-cream/30">No hay productos en este drop todavía.</p>
        ) : (
          <div className="space-y-1">
            {dropProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-border px-4 py-3 hover:bg-cream/5 transition-colors">
                <div>
                  <p className="text-[11px] text-cream">{p.name}</p>
                  <p className="text-[10px] text-cream/40">{p.category}</p>
                </div>
                <button
                  onClick={() => removeProduct(p)}
                  title="Quitar del drop"
                  className="text-cream/30 hover:text-red-400 transition-colors"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Picker de productos */}
        {showPicker && unassigned.length > 0 && (
          <div className="border border-acid/30 bg-acid/5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 px-4 py-2 border-b border-acid/20">
              Selecciona un producto para agregar
            </p>
            <div className="max-h-64 overflow-y-auto divide-y divide-border">
              {unassigned.map((p) => (
                <button
                  key={p.id}
                  onClick={() => assignProduct(p)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-acid/10 transition-colors text-left"
                >
                  <div>
                    <p className="text-[11px] text-cream">{p.name}</p>
                    <p className="text-[10px] text-cream/40">{p.category}</p>
                  </div>
                  <Plus size={12} strokeWidth={2} className="text-acid shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {showPicker && unassigned.length === 0 && (
          <p className="text-[11px] text-cream/30">Todos los productos ya están en este drop.</p>
        )}
      </div>
    </div>
  );
}

const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
