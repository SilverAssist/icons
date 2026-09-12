import { Link } from "react-router-dom";
import { getIconComponent } from "@/lib/icon-modules";
import type { IconMeta } from "@/content/types";

export function IconCard({ icon }: { icon: IconMeta }) {
  const Icon = getIconComponent(icon.componentName);

  return (
    <Link
      to={`/icons/${icon.slug}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-5 text-center transition hover:border-white/20 hover:bg-card"
    >
      <div className="flex size-16 items-center justify-center">
        {Icon ? <Icon width={40} height={40} /> : null}
      </div>
      <span className="line-clamp-2 text-sm text-muted-foreground transition group-hover:text-foreground">
        {icon.displayName}
      </span>
    </Link>
  );
}
