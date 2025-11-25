#!/usr/bin/env node

/**
 * Auto-generate icons-list.txt from SVG files in temp-svgs/
 * 
 * Processes files with formats:
 * - Generic Icons Alt={name}.svg → Large icons (100x100)
 * - Generic Solid Icons={name}.svg → Small icons (50x50)
 */

const fs = require('fs');
const path = require('path');

const tempSvgsDir = path.join(__dirname, '../temp-svgs');
const outputFile = path.join(tempSvgsDir, 'icons-list.txt');

// Read all SVG files
const files = fs.readdirSync(tempSvgsDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

console.log(`Found ${files.length} SVG files\n`);

const lines = [];
const largeIcons = [];
const smallIcons = [];

files.forEach(filename => {
  let componentName, description, iconType;
  
  // Check if it's a Large icon
  const largeMatch = filename.match(/^Generic Icons Alt=(.+)\.svg$/);
  if (largeMatch) {
    const name = largeMatch[1];
    componentName = convertToComponentName(name);
    description = generateDescription(name);
    iconType = 'large';
    largeIcons.push({ filename, componentName, description });
    return;
  }
  
  // Check if it's a Small icon
  const smallMatch = filename.match(/^Generic Solid Icons=(.+)\.svg$/);
  if (smallMatch) {
    const name = smallMatch[1];
    componentName = convertToComponentName(name);
    description = generateDescription(name);
    iconType = 'small';
    smallIcons.push({ filename, componentName, description });
    return;
  }
  
  console.warn(`⚠ Skipping unrecognized format: ${filename}`);
});

// Generate icons-list.txt content
let content = '# Auto-generated icons list\n';
content += '# Format: filename.svg|ComponentName|Description\n';
content += '#\n';
content += `# Total: ${largeIcons.length + smallIcons.length} icons\n`;
content += `# Large: ${largeIcons.length} | Small: ${smallIcons.length}\n`;
content += '#\n\n';

// Large Icons section
content += '# ========================================\n';
content += '# LARGE ICONS (100x100)\n';
content += '# ========================================\n\n';

largeIcons.forEach(({ filename, componentName, description }) => {
  content += `${filename}|${componentName}|${description}\n`;
});

content += '\n';

// Small Icons section
content += '# ========================================\n';
content += '# SMALL ICONS (50x50)\n';
content += '# NOTE: These need viewBox="0 0 50 50"\n';
content += '# ========================================\n\n';

smallIcons.forEach(({ filename, componentName, description }) => {
  content += `${filename}|${componentName}|${description}\n`;
});

// Write the file
fs.writeFileSync(outputFile, content, 'utf-8');

console.log(`✓ Generated icons-list.txt`);
console.log(`  Large icons: ${largeIcons.length}`);
console.log(`  Small icons: ${smallIcons.length}`);
console.log(`  Total: ${largeIcons.length + smallIcons.length}\n`);
console.log('Next step: npm run bulk-convert');

/**
 * Convert Figma name to PascalCase component name
 */
function convertToComponentName(name) {
  let componentName = name
    // Replace & with And
    .replace(/\s*&\s*/g, ' And ')
    // Remove ? and other special chars
    .replace(/[?]/g, '')
    // Split by spaces, hyphens, or other separators
    .split(/[\s\-_]+/)
    // Capitalize each word
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    // Join together
    .join('')
    // Handle numbers (keep them as-is)
    .replace(/(\d+)/g, '$1');
  
  // If name starts with a number, prefix with "Icon"
  if (/^\d/.test(componentName)) {
    componentName = 'Icon' + componentName;
  }
  
  return componentName;
}

/**
 * Generate a description from the icon name
 */
function generateDescription(name) {
  // Clean up the name for description
  return name
    .replace(/&/g, 'and')
    .replace(/\?/g, '')
    .trim();
}
