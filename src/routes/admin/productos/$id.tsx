import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageUpload, type UploadedImage } from "@/components/admin/ImageUpload";
import { Save, Loader, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/productos/$id")({
  component: EditarProducto,
});

const CATEGORIES = [
  { value: "Camisetas", label: "Camisetas" },
  { value: "Busos", label: "Chaqueta / Busos" },
  { value: "Conjuntos", label: "Conjuntos" },
  { value: "Pantalonetas", label: "Pantalonetas" },
  { value: "Pantalones", label: "Pantalones" },
  { value: "Gorras", label: "Gorras" },
  { value: "Accesorios", label: "Accesorios" },
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
const TOP_PIECE_TYPES = [
  { value: "camiseta", label: "Camiseta" },
  { value: "buso", label: "Chaqueta / Buso" },
];
const BOTTOM_PIECE_TYPES = [
  { value: "pantalon", label: "Pantalón" },
  { value: "pantaloneta", label: "Pantaloneta" },
];

interface Color { id?: string; name: string; swatch: string; }
interface Variant { id?: string; color_name: string; size: string; piece: string | null; stock: number; sku: string; }
interface SavedColor { name: string; swatch: string; }

function EditarProducto() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["S", "M", "L"]);
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);
  const [productType, setProductType] = useState<"standard" | "conjunto">("standard");

  const [drops, setDrops] = useState<{ id: string; name: string; label: string }[]>([]);

  const [form, setForm] = useState({
    slug: "", name: "", price: "", compare_at_price: "",
    category: "Camisetas", drop_id: "", short_desc: "", description: "", details: "",
    type: "standard" as "standard" | "conjunto",
    top_name: "", bottom_name: "", top_price: "", bottom_price: "",
    top_piece_type: "camiseta", bottom_piece_type: "pantalon",
  });

  // Auto-genera variantes cuando cambian colores, tallas o tipo
  useEffect(() => {
    if (loading) return;
    const pieces = productType === "conjunto" ? ["top", "bottom"] : [null];
    const newVariants: Variant[] = [];
    for (const color of colors.filter((c) => c.name)) {
      for (const size of selectedSizes) {
        for (const piece of pieces) {
          const existing = variants.find(
            (v) => v.color_name === color.name && v.size === size && v.piece === piece
          );
          newVariants.push(existing ?? {
            color_name: color.name, size, piece,
            stock: 0,
            sku: `${form.slug.toUpperCase()}-${color.name.replace(/\s+/g, "-").toUpperCase()}-${size}${piece ? `-${piece.toUpperCase()}` : ""}`,
          });
        }
      }
    }
    setVariants(newVariants);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, selectedSizes, productType, loading]);

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: colorCatalog }, { data: dropList }] = await Promise.all([
        supabase
          .from("products")
          .select("*, product_images(*), product_colors(*), product_variants(*)")
          .eq("id", id)
          .single(),
        supabase.from("colors").select("name, swatch").order("name"),
        supabase.from("drops").select("id, name, label").order("position"),
      ]);

      if (!p) { navigate({ to: "/admin/productos" }); return; }

      setSavedColors(colorCatalog ?? []);
      setDrops(dropList ?? []);

      const type = p.type ?? "standard";
      setProductType(type);

      setForm({
        slug: p.slug, name: p.name, price: String(p.price),
        compare_at_price: p.compare_at_price ? String(p.compare_at_price) : "",
        category: p.category, drop_id: p.drop_id ?? "",
        short_desc: p.short_desc ?? "", description: p.description ?? "",
        details: p.details ?? "", type,
        top_name: p.top_name ?? "", bottom_name: p.bottom_name ?? "",
        top_price: p.top_price ? String(p.top_price) : "",
        bottom_price: p.bottom_price ? String(p.bottom_price) : "",
        top_piece_type: p.top_piece_type ?? "camiseta",
        bottom_piece_type: p.bottom_piece_type ?? "pantalon",
      });

      setImages(p.product_images.map((img: UploadedImage & { id: string }) => ({
        cloudinary_id: img.cloudinary_id,
        role: img.role,
        alt_text: img.alt_text,
        position: img.position,
      })));

      const loadedColors = p.product_colors.map((c: Color) => ({ id: c.id, name: c.name, swatch: c.swatch }));
      setColors(loadedColors);

      const loadedVariants = p.product_variants.map((v: Variant) => ({
        id: v.id, color_name: v.color_name, size: v.size,
        piece: v.piece, stock: v.stock, sku: v.sku ?? "",
      }));
      setVariants(loadedVariants);

      const sizes = [...new Set(p.product_variants.map((v: Variant) => v.size))] as string[];
      setSelectedSizes(sizes.length > 0 ? sizes : ["S", "M", "L"]);

      setLoading(false);
    }
    load();
  }, [id, navigate]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "category" ? { type: value === "Conjuntos" ? "conjunto" : "standard" } : {}),
    }));
    if (key === "category") setProductType(value === "Conjuntos" ? "conjunto" : "standard");
  }

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function updateVariantStock(idx: number, stock: number) {
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, stock } : v));
  }

  function addSavedColor(sc: SavedColor) {
    if (colors.some((c) => c.name === sc.name)) return;
    setColors((prev) => [...prev, { name: sc.name, swatch: sc.swatch }]);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from("products").update({
        slug: form.slug, name: form.name, price: parseInt(form.price),
        compare_at_price: form.compare_at_price ? parseInt(form.compare_at_price) : null,
        category: form.category,
        drop_id: form.drop_id || null,
        short_desc: form.short_desc, description: form.description, details: form.details,
        type: form.type,
        top_name: form.type === "conjunto" ? form.top_name : null,
        bottom_name: form.type === "conjunto" ? form.bottom_name : null,
        top_price: form.type === "conjunto" && form.top_price ? parseInt(form.top_price) : null,
        bottom_price: form.type === "conjunto" && form.bottom_price ? parseInt(form.bottom_price) : null,
        top_piece_type: form.type === "conjunto" ? form.top_piece_type : null,
        bottom_piece_type: form.type === "conjunto" ? form.bottom_piece_type : null,
      }).eq("id", id);

      // Imágenes
      await supabase.from("product_images").delete().eq("product_id", id);
      if (images.length > 0) {
        await supabase.from("product_images").insert(images.map((img) => ({ product_id: id, ...img })));
      }

      // Colores
      await supabase.from("product_colors").delete().eq("product_id", id);
      const validColors = colors.filter((c) => c.name);
      if (validColors.length > 0) {
        await supabase.from("product_colors").insert(
          validColors.map((c, i) => ({ product_id: id, name: c.name, swatch: c.swatch, position: i }))
        );
        // Guardar colores nuevos al catálogo global
        for (const c of validColors) {
          await supabase.from("colors").upsert({ name: c.name, swatch: c.swatch }, { onConflict: "name" });
        }
      }

      // Variantes: actualizar existentes + insertar nuevas
      for (const v of variants) {
        if (v.id) {
          await supabase.from("product_variants").update({ stock: v.stock }).eq("id", v.id);
        } else {
          await supabase.from("product_variants").insert({
            product_id: id, color_name: v.color_name, size: v.size,
            piece: v.piece, stock: v.stock, sku: v.sku, active: true,
          });
        }
      }

      navigate({ to: "/admin/productos" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" /></div>;

  const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40 transition-colors";

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Productos</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">Editar producto</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <Section title="Información básica">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre"><input value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></Field>
          <Field label="Slug"><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={input} /></Field>
          <Field label="Precio actual COP"><input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={input} /></Field>
          <Field label="Precio original COP (si hay descuento)"><input type="number" value={form.compare_at_price} onChange={(e) => set("compare_at_price", e.target.value)} placeholder="El % se calcula solo" className={input} /></Field>
          <Field label="Categoría">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={input}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Drop (colección de lanzamiento)">
            <select value={form.drop_id} onChange={(e) => set("drop_id", e.target.value)} className={input}>
              <option value="">Sin drop</option>
              {drops.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.label}</option>)}
            </select>
          </Field>
        </div>
        <p className="text-[10px] text-cream/20 mt-2">Publicado y Nuevo se gestionan desde el listado. Oferta y más vendidos: automáticos.</p>
      </Section>

      {form.type === "conjunto" && (
        <Section title="Configuración del conjunto">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre superior"><input value={form.top_name} onChange={(e) => set("top_name", e.target.value)} className={input} /></Field>
            <Field label="Tipo de prenda superior">
              <select value={form.top_piece_type} onChange={(e) => set("top_piece_type", e.target.value)} className={input}>
                {TOP_PIECE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Precio superior"><input type="number" value={form.top_price} onChange={(e) => set("top_price", e.target.value)} className={input} /></Field>
            <div />
            <Field label="Nombre inferior"><input value={form.bottom_name} onChange={(e) => set("bottom_name", e.target.value)} className={input} /></Field>
            <Field label="Tipo de prenda inferior">
              <select value={form.bottom_piece_type} onChange={(e) => set("bottom_piece_type", e.target.value)} className={input}>
                {BOTTOM_PIECE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Precio inferior"><input type="number" value={form.bottom_price} onChange={(e) => set("bottom_price", e.target.value)} className={input} /></Field>
          </div>
          <p className="text-[10px] text-cream/30 mt-3">El tipo de prenda determina qué guía de tallas se muestra al cliente.</p>
        </Section>
      )}

      <Section title="Descripciones">
        <Field label="Descripción corta"><textarea value={form.short_desc} onChange={(e) => set("short_desc", e.target.value)} rows={2} className={input} /></Field>
        <Field label="Descripción completa"><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={input} /></Field>
        <Field label="Detalles y materiales"><textarea value={form.details} onChange={(e) => set("details", e.target.value)} rows={5} className={input} /></Field>
      </Section>

      <Section title="Imágenes">
        <ImageUpload images={images} onChange={setImages} />
      </Section>

      <Section title="Colores">
        {/* Colores del catálogo guardados */}
        {savedColors.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-2">Colores guardados — click para agregar</p>
            <div className="flex flex-wrap gap-2">
              {savedColors.map((sc) => {
                const alreadyAdded = colors.some((c) => c.name === sc.name);
                return (
                  <button key={sc.name} onClick={() => addSavedColor(sc)}
                    disabled={alreadyAdded}
                    title={sc.name}
                    className={`flex items-center gap-1.5 px-2 py-1 border text-[10px] transition-all ${alreadyAdded ? "border-acid/40 text-acid/40 cursor-default" : "border-border text-cream/60 hover:border-cream/40 hover:text-cream"}`}
                  >
                    <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: sc.swatch }} />
                    {sc.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Colores del producto */}
        <div className="space-y-3">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3">
              <input type="color" value={color.swatch}
                onChange={(e) => setColors((prev) => prev.map((c, idx) => idx === i ? { ...c, swatch: e.target.value } : c))}
                className="w-10 h-10 border border-border bg-transparent cursor-pointer" />
              <input value={color.name}
                onChange={(e) => setColors((prev) => prev.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c))}
                placeholder="Nombre del color" className={`${input} flex-1`} />
              <button onClick={() => setColors((prev) => prev.filter((_, idx) => idx !== i))}
                className="w-8 h-8 flex items-center justify-center text-cream/30 hover:text-red-400">
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
          <button onClick={() => setColors((prev) => [...prev, { name: "", swatch: "#000000" }])}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-acid hover:text-acid/70">
            <Plus size={12} strokeWidth={2} /> Agregar color nuevo
          </button>
        </div>
      </Section>

      <Section title="Tallas disponibles">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button key={size} onClick={() => toggleSize(size)}
              className={`px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                selectedSizes.includes(size) ? "bg-cream text-ink border-cream" : "text-cream/40 border-border hover:border-cream/40"
              }`}>
              {size}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Stock por variante">
        {variants.length === 0 ? (
          <p className="text-[11px] text-cream/40">Agrega colores y selecciona tallas arriba para ver el stock.</p>
        ) : (
          <div className="border border-border overflow-x-auto">
            <div className="min-w-[420px]">
              <div className="grid grid-cols-[1fr_1fr_80px_100px] text-[9px] uppercase tracking-[0.2em] text-cream/30 px-4 py-2 border-b border-border">
                <span>Color</span><span>Talla</span><span>Pieza</span><span>Stock</span>
              </div>
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_80px_100px] items-center px-4 py-2 border-b border-border/50 last:border-0 hover:bg-cream/5">
                  <span className="text-[11px] text-cream/70">{v.color_name}</span>
                  <span className="text-[11px] text-cream/70">{v.size}</span>
                  <span className="text-[10px] text-cream/40">{v.piece ?? "—"}</span>
                  <input type="number" min={0} value={v.stock}
                    onChange={(e) => updateVariantStock(i, parseInt(e.target.value) || 0)}
                    className="bg-background border border-border text-cream text-[11px] px-2 py-1 w-16 focus:outline-none focus:border-cream/40" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-[0.25em] text-cream/40">{label}</label>
      {children}
    </div>
  );
}
