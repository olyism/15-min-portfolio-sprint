import ProjectCard from "./ProjectCard";
import type { ProjectItem } from "@/lib/content";

export default function ProjectGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
