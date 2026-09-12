import { useMemo, useState } from "react";
import { CodeBlock } from "@/components/catalog/code-block";
import { getIconComponent } from "@/lib/icon-modules";
import type { IconMeta } from "@/content/types";

function buildSnippet(icon: IconMeta, size: number, fill: string, stroke: string) {
  const props = [`width={${size}}`, `height={${size}}`, `fill="${fill}"`];
  if (icon.hasStroke) props.push(`stroke="${stroke}"`);

  return [
    `import { ${icon.componentName} } from "@silverassist/icons";`,
    "",
    `<${icon.componentName} ${props.join(" ")} />`,
  ].join("\n");
}

export function IconSandbox({ icon }: { icon: IconMeta }) {
  const [size, setSize] = useState(icon.defaultWidth);
  const [fill, setFill] = useState(icon.defaultFill);
  const [stroke, setStroke] = useState(icon.defaultStroke ?? "#3F3F3F");

  const Icon = getIconComponent(icon.componentName);
  const snippet = useMemo(() => buildSnippet(icon, size, fill, stroke), [icon, size, fill, stroke]);

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-white/10 bg-black/20 p-8">
        {Icon ? (
          <Icon width={size} height={size} fill={fill} {...(icon.hasStroke ? { stroke } : {})} />
        ) : null}
      </div>

      <div className="flex flex-col gap-5 sm:w-56">
        <label className="flex flex-col gap-2 text-sm">
          <span className="flex items-center justify-between text-muted-foreground">
            Size <span className="font-mono text-foreground">{size}px</span>
          </span>
          <input
            type="range"
            min={16}
            max={240}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="accent-accent-blue"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">Fill</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fill}
              onChange={(e) => setFill(e.target.value)}
              className="size-9 rounded-md border border-white/10 bg-transparent"
            />
            <span className="font-mono text-xs text-muted-foreground">{fill}</span>
          </div>
        </label>

        {icon.hasStroke && (
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Stroke</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={stroke}
                onChange={(e) => setStroke(e.target.value)}
                className="size-9 rounded-md border border-white/10 bg-transparent"
              />
              <span className="font-mono text-xs text-muted-foreground">{stroke}</span>
            </div>
          </label>
        )}
      </div>

      <CodeBlock code={snippet} language="tsx" className="sm:col-span-2" />
    </div>
  );
}
