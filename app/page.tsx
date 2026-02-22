import { getProjects } from "@/lib/content";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import ProjectGrid from "@/components/ProjectGrid";

export default function HomePage() {
  const projects = getProjects();
  return (
    <div>
      <Hero />
      <Logos />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Selected work
          </h2>
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
