import { useMemo, useState } from "react";
import { IconCard } from "@/components/catalog/icon-card";
import { Input } from "@/components/ui/input";
import { icons } from "@/content";

const NAMED_ICONS = icons.filter((icon) => !icon.unnamed);

export function IconsIndex() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return NAMED_ICONS;
    const q = query.toLowerCase();
    return NAMED_ICONS.filter((icon) => icon.displayName.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Icons
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{NAMED_ICONS.length} icons</h1>
        <p className="mt-3 text-muted-foreground">
          Every component exported from <code>@silverassist/icons</code>. Pick one to preview it at
          any size or color and copy the import.
        </p>
      </div>

      <Input
        placeholder="Search icons…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-8 max-w-xs"
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {filtered.map((icon) => (
          <IconCard key={icon.slug} icon={icon} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">
            No icons match "{query}".
          </p>
        )}
      </div>
    </div>
  );
}
