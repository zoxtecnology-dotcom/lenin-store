import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { $ as useNavigate, Q as supabase, X, P as Plus } from "./router-Cd0oBxWL.mjs";
import { I as ImageUpload } from "./ImageUpload-CTKNwbF7.mjs";
import { L as Loader } from "./loader-bWMdxCq7.mjs";
import { S as Save } from "./save-CVIDclM7.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
const CATEGORIES = [{
  value: "Camisetas",
  label: "Camisetas"
}, {
  value: "Busos",
  label: "Chaqueta / Busos"
}, {
  value: "Conjuntos",
  label: "Conjuntos"
}, {
  value: "Pantalonetas",
  label: "Pantalonetas"
}, {
  value: "Pantalones",
  label: "Pantalones"
}, {
  value: "Gorras",
  label: "Gorras"
}, {
  value: "Accesorios",
  label: "Accesorios"
}];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
const TOP_PIECE_TYPES = [{
  value: "camiseta",
  label: "Camiseta"
}, {
  value: "buso",
  label: "Chaqueta / Buso"
}];
const BOTTOM_PIECE_TYPES = [{
  value: "pantalon",
  label: "Pantalón"
}, {
  value: "pantaloneta",
  label: "Pantaloneta"
}];
function NuevoProducto() {
  const navigate = useNavigate();
  const [saving, setSaving] = reactExports.useState(false);
  const [images, setImages] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    slug: "",
    name: "",
    price: "",
    compare_at_price: "",
    category: "Camisetas",
    drop_id: "",
    short_desc: "",
    description: "",
    details: "",
    type: "standard",
    top_name: "",
    bottom_name: "",
    top_price: "",
    bottom_price: "",
    top_piece_type: "camiseta",
    bottom_piece_type: "pantalon"
  });
  const [colors, setColors] = reactExports.useState([{
    name: "",
    swatch: "#000000"
  }]);
  const [selectedSizes, setSelectedSizes] = reactExports.useState(["S", "M", "L"]);
  const [variants, setVariants] = reactExports.useState([]);
  const [savedColors, setSavedColors] = reactExports.useState([]);
  const [drops, setDrops] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("colors").select("name, swatch").order("name").then(({
      data
    }) => setSavedColors(data ?? []));
    supabase.from("drops").select("id, name, label").order("position").then(({
      data
    }) => setDrops(data ?? []));
  }, []);
  function set(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      // Tipo se deriva solo de la categoría — no es campo separado
      ...key === "category" ? {
        type: value === "Conjuntos" ? "conjunto" : "standard"
      } : {}
    }));
  }
  function addColor() {
    setColors((prev) => [...prev, {
      name: "",
      swatch: "#000000"
    }]);
  }
  function removeColor(i) {
    setColors((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateColor(i, field, value) {
    setColors((prev) => prev.map((c, idx) => idx === i ? {
      ...c,
      [field]: value
    } : c));
  }
  function toggleSize(size) {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  }
  reactExports.useEffect(() => {
    const pieces = form.type === "conjunto" ? ["top", "bottom"] : [null];
    const newVariants = [];
    for (const color of colors.filter((c) => c.name)) {
      for (const size of selectedSizes) {
        for (const piece of pieces) {
          const existing = variants.find((v) => v.color_name === color.name && v.size === size && v.piece === piece);
          newVariants.push(existing ?? {
            color_name: color.name,
            size,
            piece,
            stock: 0,
            sku: `${form.slug.toUpperCase()}-${color.name.replace(/\s+/g, "-").toUpperCase()}-${size}${piece ? `-${piece.toUpperCase()}` : ""}`
          });
        }
      }
    }
    setVariants(newVariants);
  }, [colors, selectedSizes, form.type]);
  function updateVariantStock(idx, stock) {
    setVariants((prev) => prev.map((v, i) => i === idx ? {
      ...v,
      stock
    } : v));
  }
  function updateVariantSku(idx, sku) {
    setVariants((prev) => prev.map((v, i) => i === idx ? {
      ...v,
      sku
    } : v));
  }
  async function handleSave() {
    if (!form.slug || !form.name || !form.price || !form.category) {
      alert("Completa los campos obligatorios: slug, nombre, precio y categoría.");
      return;
    }
    setSaving(true);
    try {
      const {
        data: product,
        error
      } = await supabase.from("products").insert({
        slug: form.slug,
        name: form.name,
        price: parseInt(form.price),
        compare_at_price: form.compare_at_price ? parseInt(form.compare_at_price) : null,
        is_new: true,
        // nuevo producto siempre es "Nuevo"
        published: true,
        // se publica directo
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
        bottom_piece_type: form.type === "conjunto" ? form.bottom_piece_type : null
      }).select().single();
      if (error) throw error;
      const productId = product.id;
      if (images.length > 0) {
        await supabase.from("product_images").insert(images.map((img) => ({
          product_id: productId,
          ...img
        })));
      }
      const validColors = colors.filter((c) => c.name);
      if (validColors.length > 0) {
        await supabase.from("product_colors").insert(validColors.map((c, i) => ({
          product_id: productId,
          ...c,
          position: i
        })));
        for (const c of validColors) {
          await supabase.from("colors").upsert({
            name: c.name,
            swatch: c.swatch
          }, {
            onConflict: "name"
          });
        }
      }
      if (variants.length > 0) {
        await supabase.from("product_variants").insert(variants.map((v) => ({
          product_id: productId,
          ...v,
          active: true
        })));
      }
      navigate({
        to: "/admin/productos"
      });
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Productos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Nuevo producto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, strokeWidth: 2 }),
        saving ? "Guardando..." : "Guardar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Información básica", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.name, onChange: (e) => {
          const name = e.target.value;
          const slug = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
          setForm((p) => ({
            ...p,
            name,
            slug
          }));
        }, placeholder: "Camiseta / Box Distressed", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL) — se genera solo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")), placeholder: "camiseta-box-distressed", className: `${input} text-cream/50` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Precio actual COP *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.price, onChange: (e) => set("price", e.target.value), placeholder: "84000", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Precio original COP (solo si hay descuento)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.compare_at_price, onChange: (e) => set("compare_at_price", e.target.value), placeholder: "120000 — el % se calcula solo", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Categoría *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (e) => set("category", e.target.value), className: input, children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.value, children: c.label }, c.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Drop (colección de lanzamiento)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.drop_id, onChange: (e) => set("drop_id", e.target.value), className: input, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Sin drop" }),
          drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.id, children: [
            d.name,
            " — ",
            d.label
          ] }, d.id))
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/20 mt-2", children: 'Se crea publicado y como "Nuevo" automáticamente. Oferta y más vendidos: automáticos.' })
    ] }),
    form.type === "conjunto" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Configuración del conjunto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre parte superior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.top_name, onChange: (e) => set("top_name", e.target.value), placeholder: "Buso Angoscia", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo de prenda superior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.top_piece_type, onChange: (e) => set("top_piece_type", e.target.value), className: input, children: TOP_PIECE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Precio parte superior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.top_price, onChange: (e) => set("top_price", e.target.value), placeholder: "160000", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre parte inferior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.bottom_name, onChange: (e) => set("bottom_name", e.target.value), placeholder: "Pantalón Angoscia", className: input }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo de prenda inferior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.bottom_piece_type, onChange: (e) => set("bottom_piece_type", e.target.value), className: input, children: BOTTOM_PIECE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Precio parte inferior", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.bottom_price, onChange: (e) => set("bottom_price", e.target.value), placeholder: "140000", className: input }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30 mt-3", children: "El tipo de prenda determina qué guía de tallas se muestra al cliente." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Descripciones", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descripción corta", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.short_desc, onChange: (e) => set("short_desc", e.target.value), rows: 2, placeholder: "Descripción breve para las cards...", className: input }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descripción completa", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => set("description", e.target.value), rows: 3, placeholder: "Descripción detallada del producto...", className: input }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Detalles y materiales (una línea por detalle)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.details, onChange: (e) => set("details", e.target.value), rows: 5, placeholder: "100% algodón peinado\nPeso: 280 gsm\nCorte: Box fit\nLavado a máquina 30°C\nFabricado en Medellín, Colombia", className: input }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Imágenes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { images, onChange: setImages }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Colores disponibles", children: [
      savedColors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-2", children: "Colores guardados — click para agregar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: savedColors.map((sc) => {
          const alreadyAdded = colors.some((c) => c.name === sc.name);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !alreadyAdded && setColors((prev) => [...prev, {
            name: sc.name,
            swatch: sc.swatch
          }]), disabled: alreadyAdded, title: sc.name, className: `flex items-center gap-1.5 px-2 py-1 border text-[10px] transition-all ${alreadyAdded ? "border-acid/40 text-acid/40 cursor-default" : "border-border text-cream/60 hover:border-cream/40 hover:text-cream"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border border-white/20 shrink-0", style: {
              backgroundColor: sc.swatch
            } }),
            sc.name
          ] }, sc.name);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        colors.map((color, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: color.swatch, onChange: (e) => updateColor(i, "swatch", e.target.value), className: "w-10 h-10 border border-border bg-transparent cursor-pointer rounded-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: color.name, onChange: (e) => updateColor(i, "name", e.target.value), placeholder: "Nombre del color (ej: Hueso Lavado)", className: `${input} flex-1` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeColor(i), className: "w-8 h-8 flex items-center justify-center text-cream/30 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, strokeWidth: 1.5 }) })
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addColor, className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-acid hover:text-acid/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2 }),
          " Agregar color nuevo"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Tallas y stock", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-3", children: "Tallas disponibles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SIZES.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleSize(size), className: `px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${selectedSizes.includes(size) ? "bg-cream text-ink border-cream" : "text-cream/40 border-border hover:border-cream/40"}`, children: size }, size)) })
      ] }),
      variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[480px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_1fr_auto_100px_120px] gap-0 text-[9px] uppercase tracking-[0.2em] text-cream/30 px-4 py-2 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Talla" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pieza" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SKU" })
        ] }),
        variants.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_1fr_auto_100px_120px] gap-0 items-center px-4 py-2 border-b border-border/50 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/70", children: v.color_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/70", children: v.size }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40", children: v.piece ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: v.stock, onChange: (e) => updateVariantStock(i, parseInt(e.target.value) || 0), className: "bg-background border border-border text-cream text-[11px] px-2 py-1 w-16 focus:outline-none focus:border-cream/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: v.sku, onChange: (e) => updateVariantSku(i, e.target.value), className: "bg-background border border-border text-cream/50 text-[10px] px-2 py-1 focus:outline-none focus:border-cream/40" })
        ] }, i))
      ] }) })
    ] })
  ] });
}
const input = "w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40 transition-colors";
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-acid", children: title }) }),
    children
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-[0.25em] text-cream/40", children: label }),
    children
  ] });
}
export {
  NuevoProducto as component
};
