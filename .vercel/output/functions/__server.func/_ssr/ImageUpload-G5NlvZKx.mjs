import { Y as reactExports, N as jsxRuntimeExports, l as createServerFn } from "./index.mjs";
import { A as imgUrl, X, y as createLucideIcon, Q as supabase } from "./router-BWVHQLZp.mjs";
import { c as createSsrRpc } from "./createSsrRpc-OYTRBK8B.mjs";
import { L as Loader } from "./loader-C9Dviu41.mjs";
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const getCloudinarySignature = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("130b829988ea2c8180bcef695dfd31d73ff7f9d3bfe8bbda342969f6d540f822"));
async function uploadImage(file) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("No hay sesión activa");
  const { signature, timestamp, api_key, cloud_name, folder } = await getCloudinarySignature({ data: { accessToken: session.access_token } });
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", api_key);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", folder);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    { method: "POST", body: form }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Error subiendo imagen");
  }
  const data = await res.json();
  return data.public_id;
}
const ROLES = [
  { value: "front", label: "📸 Principal - parte frontal de la prenda" },
  { value: "back", label: "🔄 Reverso - parte trasera de la prenda" },
  { value: "gallery", label: "🖼️ Galería - fotos adicionales del producto" },
  { value: "top", label: "👕 Parte de arriba - solo conjuntos" },
  { value: "bottom", label: "👖 Parte de abajo - solo conjuntos" },
  { value: "full", label: "🧍 Look completo - solo conjuntos" }
];
function ImageUpload({ images, onChange, showRoles = true }) {
  const [uploading, setUploading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  async function handleFiles(files) {
    setUploading(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map((f) => uploadImage(f))
      );
      const newImages = uploads.map((id, i) => ({
        cloudinary_id: id,
        role: "gallery",
        position: images.length + i
      }));
      onChange([...images, ...newImages]);
    } catch (e) {
      alert(`Error subiendo imagen: ${e instanceof Error ? e.message : "Intenta de nuevo"}`);
    } finally {
      setUploading(false);
    }
  }
  function removeImage(idx) {
    onChange(images.filter((_, i) => i !== idx).map((img, i) => ({ ...img, position: i })));
  }
  function updateRole(idx, role) {
    onChange(images.map((img, i) => i === idx ? { ...img, role } : img));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-dashed border-border hover:border-cream/40 transition-colors cursor-pointer p-8 flex flex-col items-center justify-center gap-3",
        onClick: () => inputRef.current?.click(),
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        },
        children: [
          uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 20, strokeWidth: 1.5, className: "animate-spin text-acid" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 20, strokeWidth: 1.5, className: "text-cream/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/40", children: uploading ? "Subiendo..." : "Click o arrastra imágenes aquí" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: (e) => e.target.files && handleFiles(e.target.files)
            }
          )
        ]
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4", children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imgUrl(img.cloudinary_id, "w_300,h_300,c_fill,q_auto"),
          alt: img.alt_text ?? "",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => removeImage(idx),
          className: "absolute top-2 right-2 w-6 h-6 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12, strokeWidth: 2, className: "text-cream" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 space-y-1.5", children: [
        showRoles && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: img.role,
            onChange: (e) => updateRole(idx, e.target.value),
            className: "w-full bg-background border border-border text-cream text-[10px] px-2 py-1.5 focus:outline-none focus:border-cream/40",
            children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.value, children: r.label }, r.value))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: showRoles ? "Alt text (accesibilidad)" : "Leyenda de la foto (opcional)",
            value: img.alt_text ?? "",
            onChange: (e) => onChange(images.map((im, i) => i === idx ? { ...im, alt_text: e.target.value } : im)),
            className: "w-full bg-background border border-border text-cream text-[10px] px-2 py-1 placeholder:text-cream/20 focus:outline-none focus:border-cream/40"
          }
        )
      ] })
    ] }, idx)) })
  ] });
}
export {
  ImageUpload as I
};
