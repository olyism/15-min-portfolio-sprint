import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";
import { Media } from "./Media";
import { TagList } from "./Tag";

/** A project tile. `size="large"` spans the full width with a wider image. */
export function ProjectCard({
  project,
  size = "default",
  headingLevel = "h3",
}: {
  project: CaseStudy;
  size?: "default" | "large";
  headingLevel?: "h2" | "h3";
}) {
  const large = size === "large";
  const Heading = headingLevel;
  return (
    <Link href={`/projects/${project.slug}`} className="group reveal block">
      <div className="overflow-hidden rounded-card shadow-card transition-shadow duration-(--duration-base) group-hover:shadow-lift">
        <div className="transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.025]">
          <Media
            img={project.cover}
            ratio={large ? "16/8" : "4/3"}
            sizes={large ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            showPrompt={large}
            className="rounded-none"
          />
        </div>
      </div>
      <div className={cn("mt-5 flex flex-col gap-2", large && "md:flex-row md:items-start md:justify-between md:gap-10")}>
        <div className="max-w-2xl">
          <Heading className={cn("font-semibold", large ? "text-title" : "text-heading")}>
            {project.title}
            <ArrowRight className="ml-1.5 inline-block -translate-x-1 opacity-0 transition-all duration-(--duration-base) group-hover:translate-x-0 group-hover:opacity-100" />
          </Heading>
          <p className="mt-1.5 text-fg-muted">{project.summary}</p>
        </div>
        <TagList tags={project.tags} className={cn("mt-2", large && "md:mt-1 md:justify-end")} />
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: CaseStudy[] }) {
  return (
    <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} headingLevel="h2" />
      ))}
    </div>
  );
}
