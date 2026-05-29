import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
  server: {
    preset: "vercel",
  },
  tsr: {
    generatedRouteTree: "./src/routeTree.gen.ts",
    routesDirectory: "./src/routes",
  },
});
