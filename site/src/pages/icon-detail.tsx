import { Navigate, useParams } from "react-router-dom";
import { IconSandbox } from "@/components/catalog/icon-sandbox";
import { icons } from "@/content";

export function IconDetail() {
  const { slug } = useParams();
  const icon = icons.find((i) => i.slug === slug);

  if (!icon) return <Navigate to="/icons" replace />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Icon
      </span>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{icon.displayName}</h1>
      <p className="mt-3 text-muted-foreground">
        Import <code className="font-mono">{icon.componentName}</code> from{" "}
        <code className="font-mono">@silverassist/icons</code>. Adjust size and color below, then
        copy the snippet.
      </p>

      <div className="mt-10 rounded-xl border border-white/10 bg-card/60 p-6">
        <IconSandbox icon={icon} />
      </div>
    </div>
  );
}
