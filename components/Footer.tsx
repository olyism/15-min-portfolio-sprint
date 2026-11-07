import Link from "next/link";
import type { Site } from "@/lib/content";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="no-print border-t border-border-subtle">
      <div className="mx-auto box-content grid max-w-content gap-10 px-gutter py-14 text-small md:grid-cols-[1fr_auto_auto] md:gap-16">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-1 text-fg-muted">{site.role}</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-accent hover:underline">
            {site.email}
          </a>
        </div>
        <ul className="space-y-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-fg-muted hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {site.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto box-content flex max-w-content flex-wrap justify-between gap-2 px-gutter pb-10 text-caption text-fg-subtle">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        {site.credit && (
          <p>
            Template by{" "}
            <a href="https://olysu.com" target="_blank" rel="noopener" className="hover:text-fg">
              Oly Su
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
