// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    react(),
  ],
  test: {
    environment: "jsdom",
  },
});
