# Silver Icons - Copilot Instructions

## Important: GitHub CLI Usage

**CRITICAL:** All `gh` commands MUST be piped through `cat` to prevent terminal control character issues:

```bash
# ✅ Correct
gh run view 12345 | cat
gh pr list | cat
gh release create v1.0.0 | cat

# ❌ Wrong
gh run view 12345
gh pr list
gh release create v1.0.0
```

Without `| cat`, the command output may hang or show progress spinners that interfere with command execution.

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

**Conversion transformations:**
- Color props: `fill="#E3F7FB"` → `fill={fill}`, `stroke="#3F3F3F"` → `stroke={stroke}`
- Attribute casing: All SVG attributes converted to camelCase (e.g., `clip-path` → `clipPath`, `stroke-width` → `strokeWidth`)
- Style objects: `style="..."` → `style={{ ... }}`


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
scripts/             # SVG conversion utilities
  utils.js           # Shared utilities (naming, attribute conversion)
  generate-icons-list.js  # Auto-generates icons-list.txt from Figma exports
  bulk-convert.js    # Batch converter using utils.js
  convert-svg.js     # Single icon converter using utils.js
temp-svgs/           # Drop zone for Figma SVG exports (gitignored)
.github/             # GitHub configuration and copilot instructions
CONTRIBUTING.md      # Technical documentation for developers
README.md            # User-facing documentation
```

**Index file management:** The `scripts/bulk-convert.js` auto-updates `src/icons/index.ts` with alphabetically sorted exports.

**Important:** `temp-svgs/` is gitignored to keep development files out of version control.

**Shared utilities:** All conversion scripts use `scripts/utils.js` for consistent naming and attribute conversion. This ensures a single source of truth for:
- SVG attribute kebab-case → camelCase conversion
- Figma name → PascalCase component name conversion
- Description generation

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

## Coding Standards

### Documentation

**All documentation MUST be in English.**

**JavaScript files:** Use JSDoc standard with type definitions
```javascript
/**
 * Convert kebab-case SVG attributes to camelCase for React
 * @param {string} svg - SVG content string
 * @returns {string} SVG with camelCase attributes
 */
function convertAttributesToCamelCase(svg) {
  // implementation
}
```

**TypeScript files:** Use TSDoc with proper type annotations
```typescript
/**
 * Quality icon component
 * Represents quality and excellence
 */
export default function QualitySVG(props: React.ComponentProps<"svg">) {
  // implementation
}
```

### Naming Conventions

**Files:**
- React components: `PascalCase.tsx` (e.g., `Quality.tsx`, `Healthcare.tsx`)
- Utility scripts: `kebab-case.js` (e.g., `convert-svg.js`, `bulk-convert.js`)
- Shared utilities: `camelCase.js` (e.g., `utils.js`)

**Variables and Functions:**
- Variables: `camelCase` (e.g., `iconName`, `svgContent`, `defaultSize`)
- Functions: `camelCase` (e.g., `convertToComponentName`, `generateDescription`)
- Constants: `UPPER_SNAKE_CASE` or `camelCase` for config (e.g., `DEFAULT_FILL`, `tempSvgsDir`)
- React Components: `PascalCase` (e.g., `QualitySVG`, `HealthcareSVG`)

**Function Parameters:**
- Use descriptive `camelCase` names (e.g., `svgPath`, `componentName`, `description`)
- Always document types in JSDoc for JavaScript files

**Examples:**
```javascript
// Good
const svgContent = fs.readFileSync(svgPath, 'utf-8');
const componentName = convertToComponentName(name);
function generateDescription(iconName) { /* ... */ }

// Bad
const svg_content = fs.readFileSync(svg_path, 'utf-8');
const ComponentName = convert_to_component_name(name);
function GenerateDescription(icon_name) { /* ... */ }
```

### Code Style

**JavaScript/Node.js scripts:**
- Use `const` and `let`, never `var`
- Single quotes for strings: `'hello'` not `"hello"`
- Template literals for interpolation: `` `${name} icon` ``
- Semicolons required
- 2-space indentation
- Use `require()` for imports (CommonJS)

**TypeScript components:**
- Use `import` statements (ES Modules)
- Proper type annotations for all props
- No `any` types - use specific types
- Double quotes for JSX attributes
- Template literals for dynamic content

**Comments:**
- Use JSDoc for all exported functions
- Inline comments for complex logic
- Keep comments concise and in English

## Publishing to npm Registry

**Package is published to the public npm registry under the `@silverassist` scope.**

### Prerequisites
1. npm account with access to `@silverassist` organization
2. `NPM_TOKEN` configured as GitHub secret for automated publishing (granular token with 90-day expiration)
3. Build must pass: `npm run build`

### Configuration

The project is configured to publish to npm:
- `package.json` has `publishConfig.access` set to `"public"` (required for scoped packages)
- GitHub Actions workflow (`.github/workflows/publish.yml`) automates publishing
- Uses `NPM_TOKEN` secret for authentication

### Manual Publishing

**Authentication:**
```bash
npm login
# Username: your-npm-username
# Password: your-npm-password
# Email: your-email
```

**Publish process:**
```bash
# Increment version first
npm version patch  # 0.1.0 → 0.1.1 (bug fixes)
npm version minor  # 0.1.0 → 0.2.0 (new features)
npm version major  # 0.1.0 → 1.0.0 (breaking changes)

# Publish (prepublishOnly script runs build automatically)
npm publish
```

### Automated Publishing (Recommended)

The package is automatically published via GitHub Actions when:
1. A new release is created on GitHub
2. The workflow is manually triggered via workflow_dispatch

**Setup NPM_TOKEN secret:**
1. Create npm granular access token: `npm token create --type granular --scope @silverassist --expiration 90d`
2. Or via web: https://www.npmjs.com/settings/YOUR_USERNAME/tokens (select "Granular Access Token")
3. Add to GitHub Secrets: https://github.com/SilverAssist/icons/settings/secrets/actions
4. Name: `NPM_TOKEN`, Value: your token
5. Important: Enable "Bypass 2FA" and set appropriate org permissions

The workflow:
- Checks out code
- Sets up Node.js with npm registry
- Runs `npm ci` to install dependencies
- Runs type checking (`npm run typecheck`)
- Builds the package (`npm run build`)
- Publishes to npm using `NPM_TOKEN`

### Package Installation

Users can install directly from npm:

```bash
npm install @silverassist/icons
```

Then import icons:
```tsx
import { QualitySVG, HealthcareSVG } from '@silverassist/icons';
```

### Important Notes
- Package is published to public npm registry (npmjs.com)
- No authentication needed for users to install (public package)
- Only `dist/` and `README.md` are published (see `files` in package.json)
- `prepublishOnly` script ensures build runs before publishing
- Version must be incremented for each publish
- License: Polyform Noncommercial License 1.0.0 (NOT MIT)
