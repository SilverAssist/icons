import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border border-border bg-background hover:bg-muted hover:text-foreground",
  ghost: "hover:bg-muted hover:text-foreground",
};

const SIZES = {
  default: "h-9 px-4",
  icon: "size-9",
};

interface ButtonVariantProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

export function buttonVariants({ variant = "default", size = "default" }: ButtonVariantProps = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

interface ButtonProps extends ComponentProps<"button">, ButtonVariantProps {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
