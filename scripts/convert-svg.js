#!/usr/bin/env node

/**
 * SVG to React Component Converter
 *
 * This script converts SVG files from Figma into React components
 * following the Silver Icons format.
 *
 * Usage:
 *   1. Export your icon as SVG from Figma
 *   2. Place the SVG file in the 'temp-svgs/' folder
 *   3. Run: npm run convert-svg <filename.svg> <IconName>
 *   4. The component will be created in src/icons/
 *
 * Example:
 *   npm run convert-svg quality.svg Quality
 */

const fs = require("fs");
const path = require("path");
const {
  addIconToIndex,
  convertAttributesToCamelCase,
  generateDescriptionFromComponentName,
  generateComponentTemplate,
  getDefaultFillColor,
  getViewBox,
  getDefaultSize,
  replaceColorsWithProps,
  convertStylesToJSX,
  indentSvgContent,
  extractSvgInnerContent,
  usesStroke,
} = require("./utils");

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node convert-svg.js <svg-file> <IconName>");
  console.error("Example: node convert-svg.js quality.svg Quality");
  process.exit(1);
}

const [svgFile, iconName] = args;
const svgPath = path.join(__dirname, "../temp-svgs", svgFile);
const outputPath = path.join(__dirname, "../src/icons", `${iconName}.tsx`);

// Read SVG file
if (!fs.existsSync(svgPath)) {
  console.error(`Error: SVG file not found: ${svgPath}`);
  console.error("Make sure to place your SVG in the temp-svgs/ folder");
  process.exit(1);
}

const svgContent = fs.readFileSync(svgPath, "utf-8");

// Extract SVG inner content
let innerSvg;
try {
  innerSvg = extractSvgInnerContent(svgContent);
} catch {
  console.error("Error: Invalid SVG file");
  process.exit(1);
}

// Detect icon size and get viewBox/defaultSize
const viewBox = getViewBox(svgContent);
const defaultSize = getDefaultSize(svgContent);
const defaultFill = getDefaultFillColor(svgContent);
const includeStroke = usesStroke(svgContent);

// Replace default colors with props
innerSvg = replaceColorsWithProps(innerSvg);

// Convert kebab-case attributes to camelCase for React
innerSvg = convertAttributesToCamelCase(innerSvg);

// Convert inline styles to JSX format
innerSvg = convertStylesToJSX(innerSvg);

// Indent the SVG content
const indentedSvg = indentSvgContent(innerSvg);

// Generate React component using centralized template
const componentTemplate = generateComponentTemplate(
  iconName,
  generateDescriptionFromComponentName(iconName),
  indentedSvg,
  defaultSize,
  viewBox,
  defaultFill,
  includeStroke
);

// Write component file
fs.writeFileSync(outputPath, componentTemplate, "utf-8");
console.log(`✓ Created ${iconName}.tsx`);

// Update index.ts with new export
const outputDir = path.join(__dirname, "../src/icons");
console.log("\n📝 Updating index.ts...");
addIconToIndex(outputDir, iconName);
console.log("✓ Added export to index.ts");

// Format with Prettier
const { execSync } = require("child_process");
try {
  console.log("\n🎨 Formatting with Prettier...");
  execSync(`npx prettier --write "${outputPath}"`, { stdio: "inherit" });
  console.log("✓ File formatted");
} catch {
  console.warn("⚠ Prettier formatting failed, but file was created");
}

console.log("\nNext steps:");
console.log("1. Review the generated component");
console.log("2. Run: npm run build");
console.log("3. Test the icon in your app");
