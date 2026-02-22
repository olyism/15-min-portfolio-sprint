import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/lib/content";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    >
      <div className="aspect-video relative bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {project.subheading}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
