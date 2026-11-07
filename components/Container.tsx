import { cn } from "@/lib/cn";

/** Centred page column with responsive side padding. */
export function Container({
  children,
  className,
  size = "content",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "content" | "prose";
}) {
  return (
    <div
      className={cn(
        "mx-auto box-content px-gutter",
        size === "prose" ? "max-w-reading" : "max-w-content",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A big vertical block of the page. */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-section", className)}>
      {children}
    </section>
  );
}

/** Small label + title (+ optional link) at the top of a section. */
export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14", className)}>
      <div>
        {eyebrow && <p className="mb-3 text-caption font-medium tracking-wide text-fg-subtle uppercase">{eyebrow}</p>}
        <h2 className="text-title font-semibold text-balance">{title}</h2>
      </div>
      {action}
    </div>
  );
}
