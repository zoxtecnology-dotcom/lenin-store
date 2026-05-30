import { useState, useRef } from "react";
import { Upload, X, Loader } from "lucide-react";
import { imgUrl } from "@/lib/cloudinary";
import { getCloudinarySignature } from "@/lib/cloudinary-sign";
import { supabase } from "@/lib/supabase";

async function uploadImage(file: File): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("No hay sesión activa");

  const { signature, timestamp, api_key, cloud_name, folder } =
    await getCloudinarySignature({ data: { accessToken: session.access_token } });

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
  return data.public_id as string;
}

export interface UploadedImage {
  cloudinary_id: string;
  role: "front" | "back" | "gallery" | "top" | "bottom" | "full";
  alt_text?: string;
  position: number;
}

interface Props {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  showRoles?: boolean;
}

const ROLES: { value: UploadedImage["role"]; label: string }[] = [
  { value: "front",   label: "📸 Principal - parte frontal de la prenda" },
  { value: "back",    label: "🔄 Reverso - parte trasera de la prenda" },
  { value: "gallery", label: "🖼️ Galería - fotos adicionales del producto" },
  { value: "top",     label: "👕 Parte de arriba - solo conjuntos" },
  { value: "bottom",  label: "👖 Parte de abajo - solo conjuntos" },
  { value: "full",    label: "🧍 Look completo - solo conjuntos" },
];

export function ImageUpload({ images, onChange, showRoles = true }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map((f) => uploadImage(f))
      );
      const newImages: UploadedImage[] = uploads.map((id, i) => ({
        cloudinary_id: id,
        role: "gallery",
        position: images.length + i,
      }));
      onChange([...images, ...newImages]);
    } catch (e) {
      alert(`Error subiendo imagen: ${e instanceof Error ? e.message : "Intenta de nuevo"}`);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    onChange(images.filter((_, i) => i !== idx).map((img, i) => ({ ...img, position: i })));
  }

  function updateRole(idx: number, role: UploadedImage["role"]) {
    onChange(images.map((img, i) => i === idx ? { ...img, role } : img));
  }


  return (
    <div className="space-y-3">
      {/* Zona de upload */}
      <div
        className="border border-dashed border-border hover:border-cream/40 transition-colors cursor-pointer p-8 flex flex-col items-center justify-center gap-3"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        {uploading ? (
          <Loader size={20} strokeWidth={1.5} className="animate-spin text-acid" />
        ) : (
          <Upload size={20} strokeWidth={1.5} className="text-cream/40" />
        )}
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
          {uploading ? "Subiendo..." : "Click o arrastra imágenes aquí"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Imágenes subidas */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, idx) => (
            <div key={idx} className="border border-border relative group">
              <div className="aspect-square overflow-hidden bg-bone">
                <img
                  src={imgUrl(img.cloudinary_id, "w_300,h_300,c_fill,q_auto")}
                  alt={img.alt_text ?? ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 w-6 h-6 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <X size={12} strokeWidth={2} className="text-cream" />
              </button>
              {showRoles && (
                <div className="p-2">
                  <select
                    value={img.role}
                    onChange={(e) => updateRole(idx, e.target.value as UploadedImage["role"])}
                    className="w-full bg-background border border-border text-cream text-[10px] px-2 py-1.5 focus:outline-none focus:border-cream/40"
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
