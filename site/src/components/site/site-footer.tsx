import { Shapes } from "lucide-react";
import { CodeBlock } from "@/components/catalog/code-block";
import { meta } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Shapes className="size-5 text-accent-blue" />
          {meta.name}
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">{meta.description}</p>
        <CodeBlock code={`npm install ${meta.name}`} className="mt-4 max-w-sm" />

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {meta.name}@{meta.version}
          </span>
          <a
            href={meta.repository || "#"}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {meta.repository?.replace("https://", "")}
          </a>
        </div>
      </div>
    </footer>
  );
}
