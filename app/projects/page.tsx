import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectGrid } from "@/components/ProjectCard";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Work", description: "Selected case studies." };

export default function ProjectsPage() {
  const projects = getCaseStudies();
  return (
    <Container className="py-20 md:py-28">
      <header className="enter mb-16 max-w-3xl md:mb-24">
        <h1 className="text-display font-semibold">Work</h1>
        <p className="mt-5 text-lead text-fg-muted">
          Selected projects: the problem, what I did and what changed.
        </p>
      </header>
      <ProjectGrid projects={projects} />
    </Container>
  );
}
