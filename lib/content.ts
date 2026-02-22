import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export type ProjectItem = {
  slug: string;
  image: string;
  title: string;
  subheading: string;
  tags: string[];
};

export type BlogItem = {
  title: string;
  date: string;
  excerpt: string;
  url: string;
};

export function getProjects(): ProjectItem[] {
  const filePath = path.join(contentDir, "projects.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ProjectItem[];
}

export function getBlog(): BlogItem[] {
  const filePath = path.join(contentDir, "blog.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogItem[];
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getProjects().find((p) => p.slug === slug);
}
