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
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-opacity': 'strokeOpacity',
    'stroke-width': 'strokeWidth',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-style': 'fontStyle',
    'font-weight': 'fontWeight',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
  };
  
  let result = svg;
  
  // Replace each kebab-case attribute with its camelCase equivalent
  for (const [kebab, camel] of Object.entries(attributeMap)) {
    const regex = new RegExp(kebab, 'g');
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
 * Generate a human-readable description from icon name
 * @param {string} name - Icon name
 * @returns {string} Description
 */
function generateDescription(name) {
  // Clean up the name for description
  return name
    .replace(/&/g, 'and')
    .replace(/\?/g, '')
    .trim();
}

/**
 * Generate a description from PascalCase component name
 * @param {string} componentName - PascalCase component name
 * @returns {string} Description
 */
function generateDescriptionFromComponentName(componentName) {
  // Convert PascalCase to readable description
  const words = componentName.replace(/([A-Z])/g, ' $1').trim();
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
 * Get the viewBox value based on icon size
 * @param {string} svgContent - Complete SVG content string
 * @returns {string} ViewBox value ('0 0 50 50' or '0 0 100 100')
 */
function getViewBox(svgContent) {
  return isSmallIcon(svgContent) ? '0 0 50 50' : '0 0 100 100';
}

/**
 * Get the default size based on icon viewBox
 * @param {string} svgContent - Complete SVG content string
 * @returns {number} Default size (50 or 100)
 */
function getDefaultSize(svgContent) {
  return isSmallIcon(svgContent) ? 50 : 100;
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
  result = result.replace(/fill="#E3F7FB"/gi, 'fill={fill}');
  result = result.replace(/fill="#e3f7fb"/gi, 'fill={fill}');
  
  // Replace stroke colors (case-insensitive)
  result = result.replace(/stroke="#3F3F3F"/gi, 'stroke={stroke}');
  result = result.replace(/stroke="#3f3f3f"/gi, 'stroke={stroke}');
  
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
}

/**
 * Indent SVG content for proper formatting in React component
 * @param {string} svg - SVG content string
 * @param {number} spaces - Number of spaces to indent (default: 6)
 * @returns {string} Indented SVG content
 */
function indentSvgContent(svg, spaces = 6) {
  const indent = ' '.repeat(spaces);
  return svg.split('\n')
    .map(line => line.trim() ? indent + line : '')
    .join('\n');
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
    throw new Error('Invalid SVG format');
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
 * @returns {string} Complete React component code
 */
function generateComponentTemplate(componentName, description, innerSvg, defaultSize = 100, viewBox = '0 0 100 100') {
  return `import React from 'react';

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
${innerSvg}
    </svg>
  );
}
`;
}

module.exports = {
  convertAttributesToCamelCase,
  convertStylesToJSX,
  convertToComponentName,
  extractSvgInnerContent,
  generateComponentTemplate,
  generateDescription,
  generateDescriptionFromComponentName,
  getDefaultSize,
  getViewBox,
  indentSvgContent,
  isSmallIcon,
  replaceColorsWithProps,
};
