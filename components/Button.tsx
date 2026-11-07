import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "bg-bg-elevated text-fg ring-1 ring-border ring-inset hover:bg-bg-subtle",
  ghost: "text-accent hover:bg-accent-subtle",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-pill px-5 text-small font-medium whitespace-nowrap",
    "transition-[opacity,background-color,transform] duration-(--duration-fast) ease-(--ease-out) active:scale-[0.97]",
    styles[variant],
    className,
  );

/** A link styled as a button. External links open in a new tab. */
export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
