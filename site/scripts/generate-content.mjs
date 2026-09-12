// Reads the canonical source of truth (../src/icons/*.tsx, the actual published icon
// components) and produces site/src/content/generated.json. Re-run via `npm run predev` /
// `npm run prebuild` — never hand-edit the generated file.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const PACKAGE_ROOT = path.resolve(SITE_ROOT, "..");
const ICONS_DIR = path.join(PACKAGE_ROOT, "src/icons");
const OUT_DIR = path.join(SITE_ROOT, "src/content");

// e.g. "AllDayDining" -> "all-day-dining"
function toSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])([0-9])/g, "$1-$2")
    .toLowerCase();
}

// e.g. "AllDayDining" -> "All Day Dining", "GenericIcons70" -> "Generic Icons 70"
function toDisplayName(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2")
    .trim();
}

// The 7 icons imported from Figma without a real name (GenericIcons70/79/80/81/82/83,
// GenericIconsAlt123) — no human-readable label to show in a gallery card. Known,
// pre-existing design-source gap, not something this site fixes.
function isUnnamed(name) {
  return name.startsWith("GenericIcons");
}

// Every icon component destructures its props the same way, e.g.:
//   const { width = 100, height = 100, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
// `stroke` is only present on some icons.
const DEFAULTS_PATTERN =
  /const\s*\{\s*width\s*=\s*(\d+)\s*,\s*height\s*=\s*(\d+)\s*,\s*fill\s*=\s*"(#[0-9A-Fa-f]{3,8})"(?:\s*,\s*stroke\s*=\s*"(#[0-9A-Fa-f]{3,8})")?\s*\}\s*=\s*props;/;

function loadIcons() {
  return readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => {
      const name = file.replace(/\.tsx$/, "");
      const raw = readFileSync(path.join(ICONS_DIR, file), "utf-8");
      const match = raw.match(DEFAULTS_PATTERN);
      if (!match) {
        throw new Error(`${file}: could not find the expected props-destructuring pattern`);
      }
      const [, width, height, fill, stroke] = match;
      return {
        slug: toSlug(name),
        componentName: `${name}SVG`,
        displayName: toDisplayName(name),
        unnamed: isUnnamed(name),
        defaultWidth: Number(width),
        defaultHeight: Number(height),
        defaultFill: fill,
        defaultStroke: stroke ?? null,
        hasStroke: Boolean(stroke),
      };
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

const pkg = JSON.parse(readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf-8"));
const icons = loadIcons();
const unnamedCount = icons.filter((icon) => icon.unnamed).length;

const generated = {
  generatedAt: new Date().toISOString(),
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    repository: pkg.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, ""),
    homepage: pkg.homepage,
    license: pkg.license,
  },
  counts: {
    total: icons.length,
    named: icons.length - unnamedCount,
    unnamed: unnamedCount,
  },
  icons,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(path.join(OUT_DIR, "generated.json"), JSON.stringify(generated, null, 2));

console.log(
  `Generated content: ${icons.length} icons (${unnamedCount} unnamed, excluded from default search).`,
);
