import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageUpload, type UploadedImage } from "@/components/admin/ImageUpload";
import { Save, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/drops/$id")({
  component: EditarDrop,
});

function EditarDrop() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [form, setForm] = useState({
    slug: "", name: "", label: "", season: "",
    release_date: "", editorial_quote: "", editorial_body: "", published: false,
  });

  useEffect(() => {
    supabase.from("drops").select("*, drop_images(*)").eq("id", id).single().then(({ data }) => {
      if (!data) { navigate({ to: "/admin/drops" }); return; }
      setForm({
        slug: data.slug, name: data.name, label: data.label ?? "",
        season: data.season ?? "", release_date: data.release_date ?? "",
        editorial_quote: data.editorial_quote ?? "", editorial_body: data.editorial_body ?? "",
        published: data.published,
      });
      setImages(data.drop_images.map((img: UploadedImage) => ({
        cloudinary_id: img.cloudinary_id, role: "gallery" as const,
        alt_text: img.alt_text, position: img.position,
      })));
      setLoading(false);
    });
  }, [id, navigate]);

  function set(key: string, value: unknown) { setForm((p) => ({ ...p, [key]: value })); }

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("drops").update({ ...form, release_date: form.release_date || null }).eq("id", id);
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

  return (
    <div className="space-y-8 max-w-2xl">
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
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lbl}>Nombre</label><input value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Slug</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Label</label><input value={form.label} onChange={(e) => set("label", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Season</label><input value={form.season} onChange={(e) => set("season", e.target.value)} className={input} /></div>
        <div><label className={lbl}>Fecha</label><input type="date" value={form.release_date} onChange={(e) => set("release_date", e.target.value)} className={input} /></div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="accent-[#d4f542]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Publicado</span>
          </label>
        </div>
      </div>
      <div><label className={lbl}>Frase editorial</label><input value={form.editorial_quote} onChange={(e) => set("editorial_quote", e.target.value)} className={input} /></div>
      <div><label className={lbl}>Texto editorial</label><textarea value={form.editorial_body} onChange={(e) => set("editorial_body", e.target.value)} rows={4} className={input} /></div>
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid border-b border-border pb-2">Imágenes</p>
        <ImageUpload images={images} onChange={setImages} showRoles={false} />
      </div>
    </div>
  );
}

const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
