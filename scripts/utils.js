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

module.exports = {
  convertAttributesToCamelCase,
  convertToComponentName,
  generateDescription,
  generateDescriptionFromComponentName,
};
