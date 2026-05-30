import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const getCloudinarySignature = createServerFn({ method: "POST" })
  .inputValidator((data: { accessToken: string }) => data)
  .handler(async ({ data }) => {
    // 1. Verificar que el usuario es admin usando su JWT
    const url = import.meta.env.VITE_SUPABASE_URL as string;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    if (!url || !key) {
      throw new Error(`ENV faltante en server: url=${url ? "ok" : "VACIO"} key=${key ? "ok" : "VACIO"}`);
    }

    const supabase = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${data.accessToken}` } },
    });

    // Validar el JWT y obtener el usuario
    const { data: userData, error: userErr } = await supabase.auth.getUser(data.accessToken);
    if (userErr || !userData.user) {
      throw new Error(`JWT inválido: ${userErr?.message ?? "sin usuario"}`);
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

    if (error) {
      throw new Error(`Error leyendo perfil: ${error.message}`);
    }
    if (profile?.role !== "admin") {
      throw new Error(`Tu rol es "${profile?.role}" — necesitas admin`);
    }

    // 2. Generar firma de Cloudinary (el API secret nunca sale del servidor)
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "aiahn";
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + process.env.CLOUDINARY_API_SECRET!)
      .digest("hex");

    return {
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY!,
      cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD as string,
      folder,
    };
  });
