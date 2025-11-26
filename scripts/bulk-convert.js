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
const { convertAttributesToCamelCase } = require('./utils');

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

// Update index.ts with all new icons
if (createdIcons.length > 0) {
  updateIndexFile(createdIcons);
}

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
  const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!svgMatch) {
    throw new Error('Invalid SVG format');
  }
  
  let innerSvg = svgMatch[1].trim();
  
  // Detect if this is a small icon (50x50) or large icon (100x100)
  const isSmallIcon = svgContent.includes('viewBox="0 0 50 50"');
  const viewBox = isSmallIcon ? '0 0 50 50' : '0 0 100 100';
  const defaultSize = isSmallIcon ? 50 : 100;
  
  // Replace default colors with props
  innerSvg = innerSvg.replace(/fill="#E3F7FB"/gi, 'fill={fill}');
  innerSvg = innerSvg.replace(/stroke="#3F3F3F"/gi, 'stroke={stroke}');
  
  // Replace other common color variations if they match the defaults
  innerSvg = innerSvg.replace(/fill="#e3f7fb"/gi, 'fill={fill}');
  innerSvg = innerSvg.replace(/stroke="#3f3f3f"/gi, 'stroke={stroke}');
  
  // Convert kebab-case attributes to camelCase for React
  innerSvg = convertAttributesToCamelCase(innerSvg);
  
  // Fix inline style attributes (convert to JSX object notation)
  innerSvg = innerSvg.replace(/style="([^"]+)"/gi, (match, styleContent) => {
    // Convert CSS string to React style object
    const styleObj = styleContent.split(';')
      .filter(s => s.trim())
      .map(s => {
        const [prop, value] = s.split(':').map(x => x.trim());
        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${camelProp}: "${value}"`;
      })
      .join(', ');
    return `style={{ ${styleObj} }}`;
  });
  
  // Indent the SVG content
  const indentedSvg = innerSvg.split('\n')
    .map(line => line.trim() ? '      ' + line : '')
    .join('\n');
  
  const componentTemplate = `import React from 'react';

/**
 * ${componentName} icon component
 * ${description}
 */
export default function ${componentName}SVG(props: React.ComponentProps<"svg">) {
  const { width = ${defaultSize}, height = ${defaultSize}, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
${indentedSvg}
    </svg>
  );
}
`;
  
  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  fs.writeFileSync(outputPath, componentTemplate, 'utf-8');
}

/**
 * Update the index.ts file with new icon exports
 * Reads existing exports, adds new ones, sorts alphabetically
 * @param {string[]} newIcons - Array of component names to add
 */
function updateIndexFile(newIcons) {
  const indexPath = path.join(outputDir, 'index.ts');
  
  // Read existing exports
  let existingExports = [];
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf-8');
    existingExports = content.match(/export.*from.*['"]\.\/.*['"]/g) || [];
  }
  
  // Add new exports
  const allExports = [...new Set([
    ...existingExports,
    ...newIcons.map(name => `export { default as ${name}SVG } from './${name}';`)
  ])];
  
  // Sort alphabetically
  allExports.sort();
  
  const indexContent = `// Export all icons - Auto-generated
${allExports.join('\n')}

// Total icons: ${allExports.length}
// Generated from Figma SilverAssist Library
`;
  
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log(`\n✓ Updated index.ts with ${allExports.length} total icons`);
}
