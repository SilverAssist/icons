# Contributing to Silver Icons

## Project Overview

This is a **React icon library** for SilverAssist, built as an NPM package. Icons are sourced from Figma and converted to React components with a standardized API.

**Key Architecture:**
- Source: Figma design file (SilverAssist-Library)
- Build: TypeScript + tsup → dual ESM/CJS outputs
- Distribution: NPM package `@silverassist/icons`

## Project Structure

```
silver-icons/
├── src/
│   ├── icons/              # 168 icon components
│   │   ├── Quality.tsx     # Large icons (viewBox="0 0 100 100")
│   │   ├── Healthcare.tsx
│   │   ├── Calculator.tsx  # Small icons (viewBox="0 0 50 50")
│   │   └── index.ts        # Auto-generated exports
│   └── index.ts            # Main entry point
├── dist/                   # Build output (gitignored)
│   ├── index.js            # CommonJS
│   ├── index.mjs           # ES Modules
│   └── index.d.ts          # TypeScript definitions
├── scripts/
│   ├── generate-icons-list.js  # Auto-generates icons-list.txt
│   ├── bulk-convert.js         # Converts SVG → React components
│   └── convert-svg.js          # Single SVG converter
├── temp-svgs/              # Figma SVG exports (gitignored)
│   └── icons-list.txt      # Auto-generated mapping file
├── .github/
│   └── copilot-instructions.md  # AI agent guidance
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

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

## Design System Constants

- **Default fill**: `#E3F7FB` (light cyan - SilverAssist brand)
- **Default stroke**: `#3F3F3F` (dark gray)
- **Large icons**: 100×100px (most icons)
- **Small icons**: 50×50px (solid variants)

## Adding New Icons from Figma

### Step 1: Export SVG from Figma

1. Open the Figma file: [SilverAssist-Library](https://www.figma.com/design/9b9lqV6JVDsaOFFn7FjJrL/SilverAssist-Library)
2. Navigate to the icon you want to export
3. Select the icon frame
4. Export as SVG with these settings:
   - Format: SVG
   - Include "id" attribute: ✓
5. Save to `temp-svgs/` folder

**Naming conventions from Figma:**
- Large icons: `Generic Icons Alt={name}.svg` → `{Name}SVG`
- Small icons: `Generic Solid Icons={name}.svg` → `{Name}SVG`
- Examples:
  - `Generic Icons Alt=Quality.svg` → `QualitySVG`
  - `Generic Solid Icons=Bridge Loan.svg` → `BridgeLoanSVG`

### Step 2: Convert Single Icon

```bash
npm run convert-svg <filename.svg> <ComponentName>
```

Example:
```bash
npm run convert-svg "Generic Icons Alt=Quality.svg" Quality
```

This will:
- Convert SVG to React component
- Apply color parameterization
- Fix style attributes
- Create `src/icons/Quality.tsx`

### Step 3: Bulk Convert Multiple Icons

If you have many icons to convert:

1. Export all SVGs to `temp-svgs/` folder
2. Auto-generate the mapping file:
   ```bash
   npm run generate-list
   ```
   This creates `temp-svgs/icons-list.txt` with format:
   ```
   filename.svg|ComponentName|Description
   ```

3. Convert all icons at once:
   ```bash
   npm run bulk-convert
   ```

This will:
- Process all icons in `icons-list.txt`
- Create React components in `src/icons/`
- Auto-update `src/icons/index.ts` with exports

### Step 4: Validate and Build

```bash
# Check TypeScript
npm run typecheck

# Build the library
npm run build
```

## Naming Rules

**From Figma to Component:**
- `Generic Icons Alt=Quality` → `QualitySVG`
- `Generic Solid Icons=Bridge Loan` → `BridgeLoanSVG`
- `Generic Icons Alt=360 Tour` → `Icon360TourSVG` (numbers prefixed)
- `Generic Icons Alt=Q&A` → `QAndASVG` (`&` becomes `And`)
- `Generic Icons Alt=What?` → `WhatSVG` (`?` removed)

**Special character handling:**
- Numbers at start → prefix with "Icon"
- `&` → `And`
- `?` → removed
- Spaces → removed (PascalCase)

## Build System

**Commands:**
- `npm run build` - Build dist/ with tsup (CJS + ESM + types)
- `npm run dev` - Watch mode for development
- `npm run typecheck` - Validate TypeScript without building

**Important:** Always run `typecheck` before building. The build system (tsup) bundles to `dist/` with dual format exports.

## Conversion Scripts

### `scripts/generate-icons-list.js`

Auto-generates `temp-svgs/icons-list.txt` from SVG files in `temp-svgs/` folder.

**Logic:**
- Detects naming pattern (Alt= or Solid Icons=)
- Converts to PascalCase component name
- Handles special characters and number prefixing
- Outputs: `filename.svg|ComponentName|Auto-generated from {filename}`

### `scripts/bulk-convert.js`

Converts all SVGs listed in `icons-list.txt` to React components.

**Transformations:**
- Replaces `fill="#E3F7FB"` → `fill={fill}`
- Replaces `stroke="#3F3F3F"` → `stroke={stroke}`
- Converts style attributes: `style="mix-blend-mode:multiply"` → `style={{ mixBlendMode: "multiply" }}`
- Detects viewBox size (50x50 vs 100x100) for default width/height
- Auto-updates `src/icons/index.ts` with alphabetically sorted exports

### `scripts/convert-svg.js`

Converts a single SVG file.

**Usage:**
```bash
npm run convert-svg <svg-file> <ComponentName>
```

## Testing Icons Locally

1. **Link the package:**
   ```bash
   npm link
   ```

2. **In your Next.js project:**
   ```bash
   npm link @silverassist/icons
   ```

3. **Use the icons:**
   ```tsx
   import { QualitySVG } from '@silverassist/icons';
   
   export default function Page() {
     return <QualitySVG width={50} height={50} fill="#E3F7FB" />;
   }
   ```

## Publishing to NPM

1. **Update version in package.json:**
   ```json
   {
     "version": "0.2.0"
   }
   ```

2. **Login to NPM (if not already):**
   ```bash
   npm login
   ```
   Use your credentials for the `silverassist` organization.

3. **Publish:**
   ```bash
   npm publish --access public
   ```

The `prepublishOnly` script will automatically run the build.

## Version Management

Follow semantic versioning:
- **Patch** (0.1.x): Bug fixes, small tweaks
- **Minor** (0.x.0): New icons added
- **Major** (x.0.0): Breaking changes to component API

## Icon Statistics

- **Total icons**: 168 React components
- **Large icons**: 115 (viewBox "0 0 100 100")
- **Small icons**: 53 (viewBox "0 0 50 50")
- **Build size**: ~1.33 MB (ESM), ~1.35 MB (CJS)
- **TypeScript definitions**: ~27 KB

## Common Issues

### TypeScript errors after adding icons

Run `npm run typecheck` to see errors. Common causes:
- Component name starts with number (prefix with "Icon")
- Style attribute as string instead of object
- Missing export in `src/icons/index.ts`

### Icons not showing correct colors

Check that:
- `fill={fill}` is used in paths, not hardcoded `#E3F7FB`
- `stroke={stroke}` is used in paths, not hardcoded `#3F3F3F`
- Props are properly destructured in component

### Build warnings

If you see warnings about package.json exports, ensure `types` comes before `import` and `require`:
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}
```

## License

Polyform Noncommercial License 1.0.0 - Silver Assist Team

This is NOT MIT. The library is for internal use and SilverAssist projects only.
