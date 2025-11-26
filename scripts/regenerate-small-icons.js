#!/usr/bin/env node

/**
 * Regenerate Small Icons Script
 *
 * This script regenerates all icons that use the small icon pattern (fill="#003073")
 * to ensure they use the correct template without stroke variable.
 */

const fs = require("fs");
const path = require("path");
const {
  convertAttributesToCamelCase,
  generateComponentTemplate,
  generateDescriptionFromComponentName,
  getDefaultFillColor,
  getViewBox,
  getDefaultSize,
  replaceColorsWithProps,
  convertStylesToJSX,
  indentSvgContent,
  usesStroke,
} = require("./utils");

const iconsDir = path.join(__dirname, "../src/icons");

// Read all icon files
const iconFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts");

let regeneratedCount = 0;
let skippedCount = 0;

console.log("🔍 Scanning for small icons with fill='#003073'...\n");

iconFiles.forEach((file) => {
  const filePath = path.join(iconsDir, file);
  const content = fs.readFileSync(filePath, "utf-8");

  // Check if this file uses the small icon fill color
  if (!content.includes('fill="#003073"')) {
    skippedCount++;
    return;
  }

  console.log(`📝 Regenerating ${file}...`);

  try {
    // Extract the SVG from the existing component
    const svgMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    if (!svgMatch) {
      console.error(`  ✗ Could not extract SVG from ${file}`);
      return;
    }

    const fullSvg = svgMatch[0];
    let innerSvg = svgMatch[1].trim();

    // Get component name from filename (remove .tsx)
    const componentName = file.replace(".tsx", "");

    // Detect icon properties
    const viewBox = getViewBox(fullSvg);
    const defaultSize = getDefaultSize(fullSvg);
    const defaultFill = getDefaultFillColor(fullSvg);
    const includeStroke = usesStroke(fullSvg);

    // Clean up the inner SVG (remove indentation for reprocessing)
    innerSvg = innerSvg.replace(/^\s+/gm, "");

    // Replace colors with props
    innerSvg = replaceColorsWithProps(innerSvg);

    // Convert attributes
    innerSvg = convertAttributesToCamelCase(innerSvg);
    innerSvg = convertStylesToJSX(innerSvg);

    // Indent the SVG content
    const indentedSvg = indentSvgContent(innerSvg);

    // Generate new component
    const componentTemplate = generateComponentTemplate(
      componentName,
      generateDescriptionFromComponentName(componentName),
      indentedSvg,
      defaultSize,
      viewBox,
      defaultFill,
      includeStroke
    );

    // Write the regenerated component
    fs.writeFileSync(filePath, componentTemplate, "utf-8");
    console.log(`  ✓ Regenerated with fill="${defaultFill}", stroke=${includeStroke}`);
    regeneratedCount++;
  } catch (error) {
    console.error(`  ✗ Error regenerating ${file}:`, error.message);
  }
});

console.log(`\n${"=".repeat(60)}`);
console.log(`Regeneration complete!`);
console.log(`Regenerated: ${regeneratedCount} | Skipped: ${skippedCount}`);
console.log(`${"=".repeat(60)}\n`);

if (regeneratedCount > 0) {
  console.log("🎨 Formatting regenerated files...");
  const { execSync } = require("child_process");
  try {
    execSync("npm run format", { stdio: "inherit" });
    console.log("✓ All files formatted\n");
  } catch {
    console.warn("⚠ Prettier formatting failed\n");
  }

  console.log("Next steps:");
  console.log("1. npm run typecheck");
  console.log("2. Review changes with git diff");
}
