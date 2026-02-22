import { getProjects } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Projects
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-10">
          Case studies and selected work.
        </p>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
