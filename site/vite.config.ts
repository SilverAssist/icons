import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    fs: {
      // Icon components live one level up, in ../src/icons — outside this
      // project's own root, which Vite's dev server otherwise refuses to serve.
      allow: [path.resolve(import.meta.dirname, "..")],
    },
  },
});
