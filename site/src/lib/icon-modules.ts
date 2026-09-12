import type { ComponentProps, ComponentType } from "react";

type IconComponent = ComponentType<ComponentProps<"svg">>;

// Loads every icon component directly from the package source (../../../src/icons,
// resolved relative to this file) rather than from the published npm package — the site
// always reflects what's in this branch, including icons not yet released.
const modules = import.meta.glob<Record<string, IconComponent>>("../../../src/icons/*.tsx", {
  eager: true,
});

const componentsByName = new Map<string, IconComponent>();
for (const mod of Object.values(modules)) {
  for (const [exportName, component] of Object.entries(mod)) {
    componentsByName.set(exportName, component);
  }
}

export function getIconComponent(componentName: string): IconComponent | undefined {
  return componentsByName.get(componentName);
}
