import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ImageUpload, type UploadedImage } from "@/components/admin/ImageUpload";
import { Plus, X, Save, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/productos/nuevo")({
  component: NuevoProducto,
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

interface Color { name: string; swatch: string; }
interface Variant { color_name: string; size: string; piece: string | null; stock: number; sku: string; }

function NuevoProducto() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Campos básicos
  const [form, setForm] = useState({
    slug: "", name: "", price: "", compare_at_price: "",
    category: "Camisetas", drop_id: "", short_desc: "", description: "", details: "",
    type: "standard" as "standard" | "conjunto",
    top_name: "", bottom_name: "", top_price: "", bottom_price: "",
    top_piece_type: "camiseta", bottom_piece_type: "pantalon",
  });

  const [colors, setColors] = useState<Color[]>([{ name: "", swatch: "#000000" }]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["S", "M", "L"]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [savedColors, setSavedColors] = useState<Color[]>([]);
  const [drops, setDrops] = useState<{ id: string; name: string; label: string }[]>([]);

  useEffect(() => {
    supabase.from("colors").select("name, swatch").order("name")
      .then(({ data }) => setSavedColors(data ?? []));
    supabase.from("drops").select("id, name, label").order("position")
      .then(({ data }) => setDrops(data ?? []));
  }, []);

  function set(key: string, value: unknown) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      // Tipo se deriva solo de la categoría — no es campo separado
      ...(key === "category" ? { type: value === "Conjuntos" ? "conjunto" : "standard" } : {}),
    }));
  }

  function addColor() {
    setColors((prev) => [...prev, { name: "", swatch: "#000000" }]);
  }

  function removeColor(i: number) {
    setColors((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateColor(i: number, field: keyof Color, value: string) {
    setColors((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  }

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  // Auto-genera variantes al cambiar colores o tallas
  useEffect(() => {
    const pieces = form.type === "conjunto" ? ["top", "bottom"] : [null];
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
  }, [colors, selectedSizes, form.type]);

  function updateVariantStock(idx: number, stock: number) {
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, stock } : v));
  }

  function updateVariantSku(idx: number, sku: string) {
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, sku } : v));
  }

  async function handleSave() {
    if (!form.slug || !form.name || !form.price || !form.category) {
      alert("Completa los campos obligatorios: slug, nombre, precio y categoría.");
      return;
    }
    setSaving(true);
    try {
      // 1. Crear producto
      const { data: product, error } = await supabase.from("products").insert({
        slug: form.slug,
        name: form.name,
        price: parseInt(form.price),
        compare_at_price: form.compare_at_price ? parseInt(form.compare_at_price) : null,
        is_new: true,       // nuevo producto siempre es "Nuevo"
        published: true,    // se publica directo
        category: form.category,
        drop_id: form.drop_id || null,
        short_desc: form.short_desc,
        description: form.description,
        details: form.details,
        type: form.type,
        top_name: form.type === "conjunto" ? form.top_name : null,
        bottom_name: form.type === "conjunto" ? form.bottom_name : null,
        top_price: form.type === "conjunto" && form.top_price ? parseInt(form.top_price) : null,
        bottom_price: form.type === "conjunto" && form.bottom_price ? parseInt(form.bottom_price) : null,
        top_piece_type: form.type === "conjunto" ? form.top_piece_type : null,
        bottom_piece_type: form.type === "conjunto" ? form.bottom_piece_type : null,
      }).select().single();

      if (error) throw error;

      const productId = product.id;

      // 2. Imágenes
      if (images.length > 0) {
        await supabase.from("product_images").insert(
          images.map((img) => ({ product_id: productId, ...img }))
        );
      }

      // 3. Colores
      const validColors = colors.filter((c) => c.name);
      if (validColors.length > 0) {
        await supabase.from("product_colors").insert(
          validColors.map((c, i) => ({ product_id: productId, ...c, position: i }))
        );
        // Guardar colores nuevos al catálogo global para reutilizar
        for (const c of validColors) {
          await supabase.from("colors").upsert({ name: c.name, swatch: c.swatch }, { onConflict: "name" });
        }
      }

      // 4. Variantes
      if (variants.length > 0) {
        await supabase.from("product_variants").insert(
          variants.map((v) => ({ product_id: productId, ...v, active: true }))
        );
      }

      navigate({ to: "/admin/productos" });
    } catch (e: unknown) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Productos</p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream">
            Nuevo producto
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {/* Info básica */}
      <Section title="Información básica">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre *">
            <input value={form.name} onChange={(e) => {
              const name = e.target.value;
              const slug = name
                .toLowerCase()
                .normalize("NFD").replace(/[̀-ͯ]/g, "") // quita tildes
                .replace(/[^a-z0-9\s-]/g, "")                    // quita especiales
                .trim()
                .replace(/\s+/g, "-");                            // espacios → -
              setForm((p) => ({ ...p, name, slug }));
            }}
              placeholder="Camiseta / Box Distressed" className={input} />
          </Field>
          <Field label="Slug (URL) — se genera solo">
            <input value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="camiseta-box-distressed"
              className={`${input} text-cream/50`} />
          </Field>
          <Field label="Precio actual COP *">
            <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
              placeholder="84000" className={input} />
          </Field>
          <Field label="Precio original COP (solo si hay descuento)">
            <input type="number" value={form.compare_at_price} onChange={(e) => set("compare_at_price", e.target.value)}
              placeholder="120000 — el % se calcula solo" className={input} />
          </Field>
          <Field label="Categoría *">
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

        <p className="text-[10px] text-cream/20 mt-2">Se crea publicado y como "Nuevo" automáticamente. Oferta y más vendidos: automáticos.</p>
      </Section>

      {/* Conjunto extra */}
      {form.type === "conjunto" && (
        <Section title="Configuración del conjunto">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre parte superior">
              <input value={form.top_name} onChange={(e) => set("top_name", e.target.value)}
                placeholder="Buso Angoscia" className={input} />
            </Field>
            <Field label="Tipo de prenda superior">
              <select value={form.top_piece_type} onChange={(e) => set("top_piece_type", e.target.value)} className={input}>
                {TOP_PIECE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Precio parte superior">
              <input type="number" value={form.top_price} onChange={(e) => set("top_price", e.target.value)}
                placeholder="160000" className={input} />
            </Field>
            <div />  {/* spacer */}
            <Field label="Nombre parte inferior">
              <input value={form.bottom_name} onChange={(e) => set("bottom_name", e.target.value)}
                placeholder="Pantalón Angoscia" className={input} />
            </Field>
            <Field label="Tipo de prenda inferior">
              <select value={form.bottom_piece_type} onChange={(e) => set("bottom_piece_type", e.target.value)} className={input}>
                {BOTTOM_PIECE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Precio parte inferior">
              <input type="number" value={form.bottom_price} onChange={(e) => set("bottom_price", e.target.value)}
                placeholder="140000" className={input} />
            </Field>
          </div>
          <p className="text-[10px] text-cream/30 mt-3">El tipo de prenda determina qué guía de tallas se muestra al cliente.</p>
        </Section>
      )}

      {/* Descripciones */}
      <Section title="Descripciones">
        <Field label="Descripción corta">
          <textarea value={form.short_desc} onChange={(e) => set("short_desc", e.target.value)}
            rows={2} placeholder="Descripción breve para las cards..." className={input} />
        </Field>
        <Field label="Descripción completa">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            rows={3} placeholder="Descripción detallada del producto..." className={input} />
        </Field>
        <Field label="Detalles y materiales (una línea por detalle)">
          <textarea value={form.details} onChange={(e) => set("details", e.target.value)}
            rows={5} placeholder={"100% algodón peinado\nPeso: 280 gsm\nCorte: Box fit\nLavado a máquina 30°C\nFabricado en Medellín, Colombia"} className={input} />
        </Field>
      </Section>

      {/* Imágenes */}
      <Section title="Imágenes">
        <ImageUpload images={images} onChange={setImages} />
      </Section>

      {/* Colores */}
      <Section title="Colores disponibles">
        {/* Colores guardados del catálogo */}
        {savedColors.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-2">Colores guardados — click para agregar</p>
            <div className="flex flex-wrap gap-2">
              {savedColors.map((sc) => {
                const alreadyAdded = colors.some((c) => c.name === sc.name);
                return (
                  <button key={sc.name}
                    onClick={() => !alreadyAdded && setColors((prev) => [...prev, { name: sc.name, swatch: sc.swatch }])}
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
        <div className="space-y-3">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3">
              <input type="color" value={color.swatch}
                onChange={(e) => updateColor(i, "swatch", e.target.value)}
                className="w-10 h-10 border border-border bg-transparent cursor-pointer rounded-none" />
              <input value={color.name} onChange={(e) => updateColor(i, "name", e.target.value)}
                placeholder="Nombre del color (ej: Hueso Lavado)" className={`${input} flex-1`} />
              <button onClick={() => removeColor(i)}
                className="w-8 h-8 flex items-center justify-center text-cream/30 hover:text-red-400 transition-colors">
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
          <button onClick={addColor}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-acid hover:text-acid/70 transition-colors">
            <Plus size={12} strokeWidth={2} /> Agregar color nuevo
          </button>
        </div>
      </Section>

      {/* Tallas y variantes */}
      <Section title="Tallas y stock">
        {/* Selector de tallas */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-3">Tallas disponibles</p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button key={size} onClick={() => toggleSize(size)}
                className={`px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                  selectedSizes.includes(size)
                    ? "bg-cream text-ink border-cream"
                    : "text-cream/40 border-border hover:border-cream/40"
                }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {variants.length > 0 && (
          <div className="border border-border overflow-x-auto">
            <div className="min-w-[480px]">
              <div className="grid grid-cols-[1fr_1fr_auto_100px_120px] gap-0 text-[9px] uppercase tracking-[0.2em] text-cream/30 px-4 py-2 border-b border-border">
                <span>Color</span><span>Talla</span><span>Pieza</span><span>Stock</span><span>SKU</span>
              </div>
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto_100px_120px] gap-0 items-center px-4 py-2 border-b border-border/50 last:border-0">
                  <span className="text-[11px] text-cream/70">{v.color_name}</span>
                  <span className="text-[11px] text-cream/70">{v.size}</span>
                  <span className="text-[10px] text-cream/40">{v.piece ?? "—"}</span>
                  <input type="number" min={0} value={v.stock}
                    onChange={(e) => updateVariantStock(i, parseInt(e.target.value) || 0)}
                    className="bg-background border border-border text-cream text-[11px] px-2 py-1 w-16 focus:outline-none focus:border-cream/40" />
                  <input value={v.sku}
                    onChange={(e) => updateVariantSku(i, e.target.value)}
                    className="bg-background border border-border text-cream/50 text-[10px] px-2 py-1 focus:outline-none focus:border-cream/40" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40 transition-colors";

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
