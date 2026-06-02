import { defineConfig, loadEnv } from "vite";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Cargar TODAS las variables del .env (incluso sin prefijo VITE_)
  // y exponerlas en process.env para los server functions en dev.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      nitro({ preset: "vercel" }),
      tanstackStart({
        server: { entry: "./src/server.ts" },
      }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    // Forzar que estos paquetes se incluyan en el bundle SSR (no como externos)
    ssr: {
      noExternal: ["tslib", "react-remove-scroll", "react-remove-scroll-bar"],
    },
  };
});
