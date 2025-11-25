# SilverAssist Icons Library

> React icon components for SilverAssist applications

## Installation

```bash
npm install @silverassist/icons
```

## Usage

```tsx
import { QualitySVG, HealthcareSVG, CommunicationSVG } from '@silverassist/icons';

export default function MyComponent() {
  return (
    <div>
      {/* Use with default props */}
      <QualitySVG />
      
      {/* Customize size and colors */}
      <HealthcareSVG 
        width={50} 
        height={50} 
        fill="#E3F7FB" 
        stroke="#0066cc" 
      />
      
      {/* Works with Tailwind and other props */}
      <CommunicationSVG 
        className="hover:scale-110 transition-transform"
        onClick={() => console.log('Clicked!')}
      />
    </div>
  );
}
```

## Component API

All icons accept standard SVG props via `React.ComponentProps<"svg">`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `100` or `50` | Icon width |
| `height` | `number` | `100` or `50` | Icon height |
| `fill` | `string` | `"#E3F7FB"` | Fill color |
| `stroke` | `string` | `"#3F3F3F"` | Stroke color |
| `className` | `string` | - | CSS classes |
| `onClick` | `function` | - | Click handler |

Plus any other standard SVG attributes.

## Available Icons

**168 icons available** including:

QualitySVG, ChoiceSVG, HealthcareSVG, CommunicationSVG, GovernmentSVG, LegalSVG, FinanceSVG, SafetySVG, TransportationSVG, EducationSVG, and many more.

For the complete list of icons, see the TypeScript autocomplete in your editor.

## TypeScript Support

Full TypeScript support with type definitions included.

```tsx
import type { ComponentProps } from 'react';
import { QualitySVG } from '@silverassist/icons';

// All SVG props are typed
const props: ComponentProps<typeof QualitySVG> = {
  width: 100,
  height: 100,
  fill: '#E3F7FB',
  stroke: '#3F3F3F'
};
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development instructions.

## License

Polyform Noncommercial License 1.0.0 - Silver Assist Team
