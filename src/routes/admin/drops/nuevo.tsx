import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageUpload, type UploadedImage } from "@/components/admin/ImageUpload";
import { Save, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/drops/nuevo")({
  component: NuevoDrop,
});

function NuevoDrop() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [form, setForm] = useState({
    slug: "", name: "", label: "", season: "",
    release_date: "", editorial_quote: "", editorial_body: "",
    discount: "12", published: false,
  });

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

  async function handleSave() {
    if (!form.slug || !form.name) { alert("Slug y nombre son obligatorios."); return; }
    setSaving(true);
    try {
      const { data: drop, error } = await supabase.from("drops").insert({
        ...form, release_date: form.release_date || null, discount: parseInt(form.discount) || 12,
      }).select().single();
      if (error) throw error;

      if (images.length > 0) {
        await supabase.from("drop_images").insert(
          images.map((img) => ({ drop_id: drop.id, cloudinary_id: img.cloudinary_id, alt_text: img.alt_text, position: img.position }))
        );
      }
      navigate({ to: "/admin/drops" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40";

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Drops</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Nuevo drop</h1>
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
          <div><label className={label}>Nombre *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Drop 01" className={input} /></div>
          <div><label className={label}>Slug (URL) — se genera solo</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="drop-01" className={`${input} text-cream/50`} /></div>
          <div><label className={label}>Label</label><input value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="Essentials" className={input} /></div>
          <div><label className={label}>Season</label><input value={form.season} onChange={(e) => set("season", e.target.value)} placeholder="SS26" className={input} /></div>
          <div><label className={label}>Fecha de lanzamiento</label><input type="date" value={form.release_date} onChange={(e) => set("release_date", e.target.value)} className={input} /></div>
          <div><label className={label}>Descuento drop completo %</label><input type="number" min={0} max={99} value={form.discount} onChange={(e) => set("discount", e.target.value)} placeholder="12" className={input} /></div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="accent-[#d4f542]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Publicado</span>
            </label>
          </div>
        </div>
        <div><label className={label}>Editorial — frase</label><input value={form.editorial_quote} onChange={(e) => set("editorial_quote", e.target.value)} placeholder="Hecho por amor, vestido con actitud." className={input} /></div>
        <div><label className={label}>Editorial — texto</label><textarea value={form.editorial_body} onChange={(e) => set("editorial_body", e.target.value)} rows={4} placeholder="Descripción editorial del drop..." className={input} /></div>
      </div>

      <div className="space-y-4">
        <div className="border-b border-border pb-2"><p className="text-[10px] uppercase tracking-[0.3em] text-acid">Imágenes editoriales</p></div>
        <ImageUpload images={images} onChange={setImages} showRoles={false} />
      </div>
    </div>
  );
}

const label = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
