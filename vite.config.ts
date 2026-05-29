import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    nitro({ preset: "vercel" }),
    tanstackStart({
      server: { entry: "./src/server.ts" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
