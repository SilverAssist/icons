/**
 * Shared utilities for SVG to React conversion scripts
 */

/**
 * Convert kebab-case SVG attributes to camelCase for React
 * @param {string} svg - SVG content string
 * @returns {string} SVG with camelCase attributes
 */
function convertAttributesToCamelCase(svg) {
  // Map of SVG attributes that need to be converted from kebab-case to camelCase
  const attributeMap = {
    "clip-path": "clipPath",
    "clip-rule": "clipRule",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "stroke-width": "strokeWidth",
    "text-anchor": "textAnchor",
    "text-decoration": "textDecoration",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-style": "fontStyle",
    "font-weight": "fontWeight",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
  };

  let result = svg;

  // Replace each kebab-case attribute with its camelCase equivalent
  for (const [kebab, camel] of Object.entries(attributeMap)) {
    const regex = new RegExp(kebab, "g");
    result = result.replace(regex, camel);
  }

  return result;
}

/**
 * Convert Figma name to PascalCase component name
 * @param {string} name - Original name from Figma
 * @returns {string} PascalCase component name
 */
function convertToComponentName(name) {
  let componentName = name
    // Replace & with And
    .replace(/\s*&\s*/g, " And ")
    // Remove ? and other special chars
    .replace(/[?]/g, "")
    // Split by spaces, hyphens, or other separators
    .split(/[\s\-_]+/)
    // Capitalize each word
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    // Join together
    .join("")
    // Handle numbers (keep them as-is)
    .replace(/(\d+)/g, "$1");

  // If name starts with a number, prefix with "Icon"
  if (/^\d/.test(componentName)) {
    componentName = "Icon" + componentName;
  }

  return componentName;
}

/**
 * Generate a human-readable description from icon name
 * @param {string} name - Icon name
 * @returns {string} Description
 */
function generateDescription(name) {
  // Clean up the name for description
  return name.replace(/&/g, "and").replace(/\?/g, "").trim();
}

/**
 * Generate a description from PascalCase component name
 * @param {string} componentName - PascalCase component name
 * @returns {string} Description
 */
function generateDescriptionFromComponentName(componentName) {
  // Convert PascalCase to readable description
  const words = componentName.replace(/([A-Z])/g, " $1").trim();
  return `${words} icon`;
}

/**
 * Detect if SVG is a small icon (50x50) or large icon (100x100)
 * @param {string} svgContent - Complete SVG content string
 * @returns {boolean} True if small icon (50x50), false if large (100x100)
 */
function isSmallIcon(svgContent) {
  return svgContent.includes('viewBox="0 0 50 50"');
}

/**
 * Get the viewBox value from SVG content
 * @param {string} svgContent - Complete SVG content string
 * @returns {string} ViewBox value extracted from SVG or default '0 0 100 100'
 */
function getViewBox(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    return viewBoxMatch[1];
  }
  return isSmallIcon(svgContent) ? "0 0 50 50" : "0 0 100 100";
}

/**
 * Get the default size based on icon size
 * @param {string} svgContent - Complete SVG content string
 * @returns {number} Default size extracted from width/height or based on viewBox
 */
function getDefaultSize(svgContent) {
  // Try to extract width from SVG
  const widthMatch = svgContent.match(/width="(\d+)"/);
  if (widthMatch) {
    return parseInt(widthMatch[1], 10);
  }

  // Fallback to viewBox-based detection
  return isSmallIcon(svgContent) ? 50 : 100;
}

/**
 * Detect if SVG uses small icon dark fill (#003073)
 * @param {string} svg - SVG content string
 * @returns {boolean} True if SVG uses fill="#003073"
 */
function usesSmallIconFill(svg) {
  return /fill="#003073"/i.test(svg);
}

/**
 * Detect if SVG uses white color instead of default fill color
 * Only returns true if SVG has fill="white" AND does NOT have fill="#E3F7FB"
 * @param {string} svg - SVG content string
 * @returns {boolean} True if SVG uses ONLY white fill (no #E3F7FB)
 */
function usesWhiteFill(svg) {
  const hasWhite = /fill="white"/i.test(svg);
  const hasDefaultFill = /fill="#E3F7FB"/i.test(svg);
  const hasSmallIconFill = usesSmallIconFill(svg);
  return hasWhite && !hasDefaultFill && !hasSmallIconFill;
}

/**
 * Detect if SVG uses stroke
 * @param {string} svg - SVG content string
 * @returns {boolean} True if SVG has stroke attribute
 */
function usesStroke(svg) {
  return /stroke="#3F3F3F"/i.test(svg);
}

/**
 * Get the default fill color based on SVG content
 * @param {string} svg - SVG content string
 * @returns {string} Default fill color (#003073 for small icons, #FFFFFF for white-only, #E3F7FB otherwise)
 */
function getDefaultFillColor(svg) {
  if (usesSmallIconFill(svg)) return "#003073";
  if (usesWhiteFill(svg)) return "#FFFFFF";
  return "#E3F7FB";
}

/**
 * Replace default color values with React props
 * Replaces fill and stroke attributes with prop references
 * @param {string} svg - SVG content string
 * @returns {string} SVG with color props replaced
 */
function replaceColorsWithProps(svg) {
  let result = svg;

  // Replace fill colors (case-insensitive)
  result = result.replace(/fill="#E3F7FB"/gi, "fill={fill}");
  result = result.replace(/fill="#e3f7fb"/gi, "fill={fill}");

  // Replace small icon fill color (#003073)
  if (usesSmallIconFill(svg)) {
    result = result.replace(/fill="#003073"/gi, "fill={fill}");
    result = result.replace(/fill="#003073"/gi, "fill={fill}");
  }

  // Replace white fills (only if white is used in the SVG and not small icon)
  if (usesWhiteFill(svg)) {
    result = result.replace(/fill="white"/gi, "fill={fill}");
  }

  // Replace stroke colors when used as stroke attribute (case-insensitive)
  result = result.replace(/stroke="#3F3F3F"/gi, "stroke={stroke}");
  result = result.replace(/stroke="#3f3f3f"/gi, "stroke={stroke}");

  // Replace stroke color when used as fill attribute (case-insensitive)
  // This handles cases where the stroke color (#3F3F3F) is used in fill
  result = result.replace(/fill="#3F3F3F"/gi, "fill={stroke}");
  result = result.replace(/fill="#3f3f3f"/gi, "fill={stroke}");

  return result;
}

/**
 * Convert inline style attributes to JSX style objects
 * Converts CSS string notation to React style object notation
 * @param {string} svg - SVG content string
 * @returns {string} SVG with JSX-compatible style attributes
 */
function convertStylesToJSX(svg) {
  return svg.replace(/style="([^"]+)"/gi, (match, styleContent) => {
    // Convert CSS string to React style object
    const styleObj = styleContent
      .split(";")
      .filter((s) => s.trim())
      .map((s) => {
        const [prop, value] = s.split(":").map((x) => x.trim());
        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${camelProp}: "${value}"`;
      })
      .join(", ");
    return `style={{ ${styleObj} }}`;
  });
}

/**
 * Indent SVG content for proper formatting in React component
 * @param {string} svg - SVG content string
 * @param {number} spaces - Number of spaces to indent (default: 6)
 * @returns {string} Indented SVG content
 */
function indentSvgContent(svg, spaces = 6) {
  const indent = " ".repeat(spaces);
  return svg
    .split("\n")
    .map((line) => (line.trim() ? indent + line : ""))
    .join("\n");
}

/**
 * Extract inner SVG content from a complete SVG file
 * @param {string} svgContent - Complete SVG file content
 * @returns {string} Inner SVG content (without <svg> wrapper)
 * @throws {Error} If SVG format is invalid
 */
function extractSvgInnerContent(svgContent) {
  const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!svgMatch) {
    throw new Error("Invalid SVG format");
  }
  return svgMatch[1].trim();
}

/**
 * Generate React component template for an icon
 * @param {string} componentName - PascalCase component name
 * @param {string} description - Human-readable description of the icon
 * @param {string} innerSvg - SVG content (already processed, indented)
 * @param {number} defaultSize - Default width/height (50 or 100)
 * @param {string} viewBox - ViewBox attribute value
 * @param {string} defaultFill - Default fill color (defaults to #E3F7FB, or #FFFFFF for white icons, or #003073 for small icons)
 * @param {boolean} includeStroke - Whether to include stroke prop (default: true, false for small icons with #003073)
 * @returns {string} Complete React component code
 */
function generateComponentTemplate(
  componentName,
  description,
  innerSvg,
  defaultSize = 100,
  viewBox = "0 0 100 100",
  defaultFill = "#E3F7FB",
  includeStroke = true
) {
  // Build destructuring based on whether stroke is needed
  const destructuring = includeStroke
    ? `const {
    width = ${defaultSize},
    height = ${defaultSize},
    fill = "${defaultFill}",
    stroke = "#3F3F3F",
  } = props;`
    : `const {
    width = ${defaultSize},
    height = ${defaultSize},
    fill = "${defaultFill}",
  } = props;`;

  return `import React from 'react';

/**
 * ${componentName} icon component
 * ${description}
 */
export default function ${componentName}SVG(props: React.ComponentProps<"svg">) {
  ${destructuring}
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
${innerSvg}
    </svg>
  );
}
`;
}

/**
 * Update the index file with all icon exports
 * Regenerates the entire index.ts file with all icons (used by bulk-convert)
 * @param {string} outputDir - Absolute path to the icons output directory
 * @param {string[]} iconNames - Array of icon component names (without SVG suffix)
 */
function updateIndexFile(outputDir, iconNames) {
  const fs = require("fs");
  const path = require("path");
  const indexPath = path.join(outputDir, "index.ts");

  // Sort icon names alphabetically
  const sortedNames = [...iconNames].sort();

  // Generate export statements
  const exports = sortedNames
    .map((name) => `export { default as ${name}SVG } from "./${name}";`)
    .join("\n");

  const content = `// Export all icons - Auto-generated
${exports}

// Total icons: ${sortedNames.length}
// Generated from Figma SilverAssist Library
`;

  fs.writeFileSync(indexPath, content, "utf-8");
}

/**
 * Add a single icon export to the index file
 * Adds the export in alphabetical order without duplicating (used by convert-svg)
 * @param {string} outputDir - Absolute path to the icons output directory
 * @param {string} iconName - Icon component name (without SVG suffix)
 */
function addIconToIndex(outputDir, iconName) {
  const fs = require("fs");
  const path = require("path");
  const indexPath = path.join(outputDir, "index.ts");

  // Read existing content or create new file
  let existingExports = [];
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, "utf-8");
    // Extract existing export lines
    const exportMatches = content.matchAll(/export \{ default as (\w+)SVG \} from/g);
    existingExports = Array.from(exportMatches, (m) => m[1]);
  }

  // Add new icon if not already present
  if (!existingExports.includes(iconName)) {
    existingExports.push(iconName);
  }

  // Regenerate index with all exports
  updateIndexFile(outputDir, existingExports);
}

module.exports = {
  addIconToIndex,
  convertAttributesToCamelCase,
  convertStylesToJSX,
  convertToComponentName,
  extractSvgInnerContent,
  generateComponentTemplate,
  generateDescription,
  generateDescriptionFromComponentName,
  getDefaultFillColor,
  getDefaultSize,
  getViewBox,
  indentSvgContent,
  isSmallIcon,
  replaceColorsWithProps,
  updateIndexFile,
  usesSmallIconFill,
  usesStroke,
  usesWhiteFill,
};
