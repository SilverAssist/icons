#!/usr/bin/env node

/**
 * Bulk SVG to React Component Converter
 * 
 * Reads icons-list.txt and converts all SVG files to React components
 * 
 * Format of icons-list.txt:
 * filename.svg|ComponentName|Description
 */

const fs = require('fs');
const path = require('path');
const { 
  convertAttributesToCamelCase, 
  generateComponentTemplate,
  getViewBox,
  getDefaultSize,
  replaceColorsWithProps,
  convertStylesToJSX,
  indentSvgContent,
  extractSvgInnerContent
} = require('./utils');

const tempSvgsDir = path.join(__dirname, '../temp-svgs');
const iconsListPath = path.join(tempSvgsDir, 'icons-list.txt');
const outputDir = path.join(__dirname, '../src/icons');

if (!fs.existsSync(iconsListPath)) {
  console.error('Error: icons-list.txt not found in temp-svgs/');
  console.error('\nCreate a file with format:');
  console.error('filename.svg|ComponentName|Description');
  process.exit(1);
}

const iconsList = fs.readFileSync(iconsListPath, 'utf-8');
const lines = iconsList.split('\n').filter(line => line.trim() && !line.startsWith('#'));

let successCount = 0;
let errorCount = 0;
const createdIcons = [];

console.log(`Found ${lines.length} icons to convert\n`);

lines.forEach((line, index) => {
  const [filename, componentName, description] = line.split('|').map(s => s.trim());
  
  if (!filename || !componentName) {
    console.error(`⚠ Skipping line ${index + 1}: Invalid format`);
    errorCount++;
    return;
  }
  
  const svgPath = path.join(tempSvgsDir, filename);
  
  if (!fs.existsSync(svgPath)) {
    console.error(`⚠ SVG not found: ${filename}`);
    errorCount++;
    return;
  }
  
  try {
    convertSvgToComponent(svgPath, componentName, description || `${componentName} icon`);
    createdIcons.push(componentName);
    successCount++;
    console.log(`✓ ${componentName}SVG created`);
  } catch (error) {
    console.error(`✗ Error converting ${filename}:`, error.message);
    errorCount++;
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Conversion complete!`);
console.log(`Success: ${successCount} | Errors: ${errorCount}`);
console.log(`${'='.repeat(50)}\n`);

if (successCount > 0) {
  console.log('Next steps:');
  console.log('1. npm run typecheck');
  console.log('2. npm run build');
  console.log('3. Test your icons!');
}

/**
 * Convert a single SVG file to a React component
 * @param {string} svgPath - Absolute path to the SVG file
 * @param {string} componentName - PascalCase component name
 * @param {string} description - Human-readable description of the icon
 * @throws {Error} If SVG format is invalid
 */
function convertSvgToComponent(svgPath, componentName, description) {
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  
  // Extract SVG inner content
  let innerSvg = extractSvgInnerContent(svgContent);
  
  // Detect icon size and get viewBox/defaultSize
  const viewBox = getViewBox(svgContent);
  const defaultSize = getDefaultSize(svgContent);
  
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
    componentName,
    description,
    indentedSvg,
    defaultSize,
    viewBox
  );
  
  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  fs.writeFileSync(outputPath, componentTemplate, 'utf-8');
}
