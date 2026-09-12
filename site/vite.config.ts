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
      // Icon components live in ../src/icons, outside this project, and import
      // "react" via a bare specifier. Node's node_modules resolution walks up
      // from *their* directory, which never reaches this project's own
      // node_modules — it only happened to work locally because the repo
      // root also has react installed (a devDependency there for unrelated
      // reasons). Alias explicitly so the build doesn't depend on that.
      react: path.resolve(import.meta.dirname, "node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "node_modules/react-dom"),
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
