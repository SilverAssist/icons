import { Shapes } from "lucide-react";
import { NavLink } from "react-router-dom";
import { meta } from "@/content";
import { cn } from "@/lib/utils";

const NAV_LINKS = [{ to: "/icons", label: "Icons" }];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <Shapes className="size-5 text-accent-blue" />
          <span>{meta.name}</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground",
                  isActive && "bg-white/5 text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={meta.repository || "#"}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
