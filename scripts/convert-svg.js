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

const fs = require('fs');
const path = require('path');
const { convertAttributesToCamelCase, generateDescriptionFromComponentName } = require('./utils');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node convert-svg.js <svg-file> <IconName>');
  console.error('Example: node convert-svg.js quality.svg Quality');
  process.exit(1);
}

const [svgFile, iconName] = args;
const svgPath = path.join(__dirname, '../temp-svgs', svgFile);
const outputPath = path.join(__dirname, '../src/icons', `${iconName}.tsx`);

// Read SVG file
if (!fs.existsSync(svgPath)) {
  console.error(`Error: SVG file not found: ${svgPath}`);
  console.error('Make sure to place your SVG in the temp-svgs/ folder');
  process.exit(1);
}

const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Extract SVG inner content (everything between <svg> tags)
const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
if (!svgMatch) {
  console.error('Error: Invalid SVG file');
  process.exit(1);
}

let innerSvg = svgMatch[1].trim();

// Replace fill="#E3F7FB" with {fill}
innerSvg = innerSvg.replace(/fill="#E3F7FB"/gi, 'fill={fill}');
// Replace stroke="#3F3F3F" with {stroke}
innerSvg = innerSvg.replace(/stroke="#3F3F3F"/gi, 'stroke={stroke}');

// Convert kebab-case attributes to camelCase for React
innerSvg = convertAttributesToCamelCase(innerSvg);

// Indent the SVG content
const indentedSvg = innerSvg.split('\n').map(line => '      ' + line).join('\n');

// Generate React component
const componentTemplate = `import React from 'react';

/**
 * ${iconName} icon component
 * ${generateDescriptionFromComponentName(iconName)}
 */
export default function ${iconName}SVG(props: React.ComponentProps<"svg">) {
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
${indentedSvg}
    </svg>
  );
}
`;

// Write component file
fs.writeFileSync(outputPath, componentTemplate, 'utf-8');
console.log(`✓ Created ${iconName}.tsx`);

// Update index.ts
updateIndexFile(iconName);

/**
 * Update the index.ts file with a new icon export
 * @param {string} newIcon - Component name to add to exports
 */
function updateIndexFile(newIcon) {
  const indexPath = path.join(__dirname, '../src/icons/index.ts');
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  // Add export if not already present
  const exportLine = `export { default as ${newIcon}SVG } from './${newIcon}';`;
  if (!indexContent.includes(exportLine)) {
    // Add before the "More icons" comment
    const lines = indexContent.split('\n');
    const insertIndex = lines.findIndex(line => line.includes('More icons'));
    if (insertIndex > 0) {
      lines.splice(insertIndex, 0, exportLine);
      indexContent = lines.join('\n');
    } else {
      indexContent += '\n' + exportLine;
    }
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`✓ Updated index.ts`);
  }
}

console.log('\nNext steps:');
console.log('1. Review the generated component');
console.log('2. Run: npm run build');
console.log('3. Test the icon in your app');
