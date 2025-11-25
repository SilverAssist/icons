# Silver Icons - Copilot Instructions

## Project Overview

This is a **React icon library** for SilverAssist, built as an NPM package. Icons are sourced from Figma and converted to React components with a standardized API similar to lucide-react.

**Key Architecture:**
- Source: Figma design file (SilverAssist-Library with 168 icons)
- Build: TypeScript + tsup → dual ESM/CJS outputs
- Distribution: NPM package `@silverassist/icons` (published under silverassist organization)

## Icon Component Pattern

**ALL icons MUST follow this exact structure:**

```tsx
import React from 'react';

export default function IconNameSVG(props: React.ComponentProps<"svg">) {
  const { width = 100, height = 100, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG paths here */}
    </svg>
  );
}
```

**Critical conventions:**
- Component name: `{IconName}SVG` (PascalCase + SVG suffix)
- Default props: `width=100, height=100, fill="#E3F7FB", stroke="#3F3F3F"`
- ViewBox: `0 0 100 100` for large icons, `0 0 50 50` for small icons
- Color replacement: Replace `fill="#E3F7FB"` → `fill={fill}` in paths
- Props type: `React.ComponentProps<"svg">` (NOT custom IconProps)

## Figma Import Workflow

**Adding new icons from Figma:**

1. Export SVG from Figma → save to `temp-svgs/` folder
2. Convert single icon: `npm run convert-svg filename.svg IconName`
3. Bulk convert: Create `temp-svgs/icons-list.txt` with format `filename.svg|ComponentName|Description` → run `npm run bulk-convert`

**Naming rules from Figma:**
- `Generic Icons Alt=Quality` → `QualitySVG`
- `Generic Solid Icons=Bridge Loan` → `BridgeLoanSVG`
- Special chars: `&` becomes `And`, `?` is removed
- See `CONTRIBUTING.md` for complete workflow and naming details

## Build System

**Commands:**
- `npm run build` - Build dist/ with tsup (CJS + ESM + types)
- `npm run dev` - Watch mode for development
- `npm run typecheck` - Validate TypeScript without building

**Important:** Always run `typecheck` before building. The build system (tsup) bundles to `dist/` with dual format exports.

## File Structure

```
src/icons/           # Individual icon components (Quality.tsx, Healthcare.tsx, etc.)
src/icons/index.ts   # Auto-generated exports (updated by scripts)
scripts/             # SVG conversion utilities (generate-icons-list.js, bulk-convert.js, convert-svg.js)
temp-svgs/           # Drop zone for Figma SVG exports (gitignored)
.github/             # GitHub configuration and copilot instructions
CONTRIBUTING.md      # Technical documentation for developers
README.md            # User-facing documentation
```

**Index file management:** The `scripts/bulk-convert.js` auto-updates `src/icons/index.ts` with alphabetically sorted exports.

**Important:** `temp-svgs/` is gitignored to keep development files out of version control.

## Design System Constants

- Default fill: `#E3F7FB` (light cyan - SilverAssist brand)
- Default stroke: `#3F3F3F` (dark gray)
- Large icons: 100×100px (most icons)
- Small icons: 50×50px (solid variants)

## License & Publishing

- License: **Polyform Noncommercial License 1.0.0** (NOT MIT)
- Author: **Silver Assist Team**
- Target: Internal use + Next.js projects
- Package scope: `@silverassist/icons`
- NPM Organization: `silverassist`

## When Creating New Icons

1. **Never** deviate from the component template above
2. **Always** use the conversion scripts - don't hand-code unless fixing issues
3. **Update** `src/icons/index.ts` with new exports (bulk-convert does this automatically)
4. **Validate** the icon displays correctly at different sizes (24px, 50px, 100px)
5. **Test** color prop overrides work: `<IconSVG fill="#FF0000" stroke="#0000FF" />`
