import showcase from "@/content/showcase.json";
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
        <h1 className="text-display font-semibold">{showcase.workTitle}</h1>
        <p className="mt-5 text-lead text-fg-muted">
          {showcase.workIntro}
        </p>
      </header>
      <p className="showcase-notice mb-12">{showcase.notice}</p>
      <ProjectGrid projects={projects} />
    </Container>
  );
}
