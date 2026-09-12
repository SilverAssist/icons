import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/catalog/code-block";
import { IconCard } from "@/components/catalog/icon-card";
import { SectionHeading } from "@/components/catalog/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { counts, icons, meta } from "@/content";

const FEATURED = icons.filter((icon) => !icon.unnamed).slice(0, 10);
const EXAMPLE_SLUG = icons.find((icon) => icon.slug === "check")?.slug ?? icons[0]?.slug;

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="mb-6 font-mono text-xs text-muted-foreground">
            {meta.name}@{meta.version}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Every icon in this package,
            <br />
            with the code to use it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            A reference for the icon components already in <code>{meta.name}</code> — search by
            name, preview at any size or color, and copy the exact import you need.
          </p>

          <CodeBlock code={`npm install ${meta.name}`} className="mt-10 w-full max-w-lg" />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/icons" className={buttonVariants({ size: "default" })}>
              Browse icons <ArrowRight className="size-4" />
            </Link>
            <a
              href={meta.repository || "#"}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              View source
            </a>
          </div>
        </div>

        <div className="relative grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
          <div className="flex flex-col items-center gap-1 py-8">
            <span className="font-mono text-3xl font-semibold">{counts.total}</span>
            <span className="text-xs text-muted-foreground">Total icons</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-8">
            <span className="font-mono text-3xl font-semibold">{counts.named}</span>
            <span className="text-xs text-muted-foreground">Searchable by name</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-8">
            <span className="font-mono text-3xl font-semibold">{counts.unnamed}</span>
            <span className="text-xs text-muted-foreground">Unnamed, direct link only</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          index="01"
          label="The gallery"
          title="Search and preview"
          description="Every named icon rendered at a glance. Filter by name to find the one you need, then open it for the full sandbox."
          action={
            <Link to="/icons" className={buttonVariants({ variant: "outline" })}>
              View all icons <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURED.map((icon) => (
            <IconCard key={icon.slug} icon={icon} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            index="02"
            label="The sandbox"
            title="Preview and copy the code"
            description="Each icon has its own page with live size and color controls. The snippet below updates as you adjust them — copy it directly into your component."
            action={
              EXAMPLE_SLUG ? (
                <Link
                  to={`/icons/${EXAMPLE_SLUG}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Try an example <ArrowRight className="size-4" />
                </Link>
              ) : undefined
            }
          />
          <div className="mt-10 max-w-2xl">
            <CodeBlock
              language="tsx"
              code={[
                'import { CheckSVG } from "@silverassist/icons";',
                "",
                '<CheckSVG width={64} height={64} fill="#003073" />',
              ].join("\n")}
            />
          </div>
        </div>
      </section>
    </>
  );
}
