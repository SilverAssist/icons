import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-32 text-center sm:px-6">
      <span className="font-mono text-sm text-muted-foreground">404</span>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        That icon doesn't exist, or the slug changed when the catalog was regenerated.
      </p>
      <Link to="/" className={buttonVariants()}>
        Back home
      </Link>
    </div>
  );
}
