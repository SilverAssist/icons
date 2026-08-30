import react from "@silverassist/npm-package-standards/eslint/react";
import { ESLINT_IGNORE_PATTERNS } from "@silverassist/next-testing-toolkit";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...react,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Softer than the shared base's "error": this package generates 168
      // icon components from a script, and a warn-not-error lets that
      // pipeline output land without blocking on lint until reviewed.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    // Generated icon components legitimately destructure props they don't
    // all use (a shared signature across 168 auto-generated files).
    files: ["src/icons/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    ignores: [
      // Fixture and build-output globs come from the harness itself, so a
      // change there (a new generated file, say) reaches every consumer.
      ...ESLINT_IGNORE_PATTERNS,
      "node_modules/",
      "temp-svgs/",
      "*.config.mjs",
      "*.config.js",
      "*.config.ts",
    ],
  },
);
