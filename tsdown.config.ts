import { defineConfig } from "tsdown";

// Migrated from tsup, which is no longer maintained ("This project is not
// actively maintained anymore. Please consider using tsdown instead.").
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  // tsdown defaults to fixed .mjs/.cjs. This package declares no `type`, so
  // `false` yields .js for CJS and .mjs for ESM — the names the published
  // `exports` map already points at. Changing them would break consumers.
  fixedExtension: false,
  // No `ignoreDeprecations` workaround needed any more: that existed only
  // because tsup injected a deprecated `baseUrl` into its DTS build.
  dts: { sourcemap: false },
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  deps: { neverBundle: ["react"] },
});
