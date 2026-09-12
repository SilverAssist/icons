# @silverassist/icons docs site

A documentation microsite for `@silverassist/icons` — a searchable gallery of every icon
component the package ships, plus a per-icon sandbox to preview it at any size or color and
copy the exact import and JSX.

Design: same shadcn-style dark/monospace layout as `agents-toolkit/site`.

## How content gets in

Nothing here is hand-authored duplicate content. `scripts/generate-content.mjs` reads every
file in `../src/icons/*.tsx` — the actual published icon components — extracts each one's
prop defaults (`width`, `height`, `fill`, and `stroke` where present) via a pattern match on
the shared destructuring signature, and writes `src/content/generated.json`. That file is
regenerated automatically by `predev` and `prebuild` — never edit it directly, and it isn't
committed (see `.gitignore`).

Icon rendering itself doesn't go through the generated JSON: `src/lib/icon-modules.ts` uses
`import.meta.glob` to load every component directly from `../src/icons/*.tsx` at build/dev
time, so the site always reflects what's on this branch, including icons not yet released to
npm.

Seven icons (`GenericIcons70`, `79`, `80`, `81`, `82`, `83`, `GenericIconsAlt123`) came out of
the original Figma export without a real name — a known, pre-existing gap in the design
source, not something this site works around beyond excluding them from the default gallery
search. They're still reachable directly by slug (e.g. `/icons/generic-icons-70`).

## Commands

```bash
npm run dev               # regenerate content + start the dev server
npm run build              # regenerate content + type-check + production build to dist/
npm run generate-content   # just regenerate src/content/generated.json
npm run preview            # preview the production build locally
npm run check               # format:check + typecheck + lint + build
```

## Deployment

`.github/workflows/deploy-site.yml` (repo root) builds this site and deploys `dist/` to
GitHub Pages on every push to `master` that touches `site/**` or `src/icons/**`. It sets
`VITE_BASE_PATH=/icons/` to match the Pages subpath, and copies `index.html` to `404.html`
after the build so client-side routes (e.g. `/icons/check`) resolve correctly on a hard
refresh or direct link.

GitHub Pages is already enabled for this repo (Settings → Pages → Build and deployment →
Source → "GitHub Actions").
