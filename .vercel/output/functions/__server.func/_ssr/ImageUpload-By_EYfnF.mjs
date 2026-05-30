import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as imgUrl, D as supabase } from "./router-BAT9GkoO.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { j as Loader, U as Upload, X } from "../_libs/lucide-react.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
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
  { value: "front", label: "Principal (card)" },
  { value: "back", label: "Reverso (hover)" },
  { value: "gallery", label: "Galería (detalle)" },
  { value: "top", label: "Parte superior (conjunto)" },
  { value: "bottom", label: "Parte inferior (conjunto)" },
  { value: "full", label: "Look completo (conjunto)" }
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
  function updateAlt(idx, alt_text) {
    onChange(images.map((img, i) => i === idx ? { ...img, alt_text } : img));
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
      showRoles && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: img.role,
            onChange: (e) => updateRole(idx, e.target.value),
            className: "w-full bg-background border border-border text-cream text-[10px] uppercase tracking-[0.2em] px-2 py-1 focus:outline-none focus:border-cream/40",
            children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.value, children: r.label }, r.value))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Alt text",
            value: img.alt_text ?? "",
            onChange: (e) => updateAlt(idx, e.target.value),
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
