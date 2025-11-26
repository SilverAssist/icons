#!/usr/bin/env tsx

/**
 * Icon Template Generator
 * This script helps generate new icon components following the project standards
 */

import * as fs from "fs";
import * as path from "path";

const ICON_TEMPLATE = (
  name: string,
  description: string,
  svgContent: string
) => `import React from 'react';

/**
 * ${name} icon component
 * ${description}
 */
export default function ${name}SVG(props: React.ComponentProps<"svg">) {
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
      ${svgContent}
    </svg>
  );
}
`;

function generateIcon(name: string, description: string, svgContent: string) {
  const iconsDir = path.join(__dirname, "../src/icons");
  const filePath = path.join(iconsDir, `${name}.tsx`);

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const content = ICON_TEMPLATE(name, description, svgContent);
  fs.writeFileSync(filePath, content, "utf-8");

  console.log(`✓ Created ${name}.tsx`);
  return name;
}

// Update the index file with all icons
function updateIndexFile(iconNames: string[]) {
  const indexPath = path.join(__dirname, "../src/icons/index.ts");
  const exports = iconNames
    .map((name) => `export { default as ${name}SVG } from './${name}';`)
    .join("\n");

  const content = `// Export all icons
${exports}

// Icons generated from Figma SilverAssist Library
`;

  fs.writeFileSync(indexPath, content, "utf-8");
  console.log(`✓ Updated index.ts with ${iconNames.length} icons`);
}

// Example usage
if (require.main === module) {
  console.log("Icon Generator - Use this template to create new icons\n");
  console.log("Example:");
  console.log('generateIcon("MyIcon", "Description here", "<path d=\\"...\\"/>");');
}

export { generateIcon, updateIndexFile };
