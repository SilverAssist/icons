import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      // tsup internally sets baseUrl which is deprecated in TS 6.
      // This suppresses the deprecation error for TS 6+ compatibility.
      ignoreDeprecations: "6.0",
    },
  },
  clean: true,
  sourcemap: true,
  minify: false,
  external: ["react"],
  treeshake: true,
  splitting: false,
});
