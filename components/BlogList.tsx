import type { BlogItem } from "@/lib/content";

export default function BlogList({ entries }: { entries: BlogItem[] }) {
  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {entries.map((entry, i) => (
        <li key={i} className="py-6">
          <a
            href={entry.url}
            target={entry.url.startsWith("http") ? "_blank" : undefined}
            rel={entry.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block group"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
              {entry.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {entry.date}
            </p>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {entry.excerpt}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
