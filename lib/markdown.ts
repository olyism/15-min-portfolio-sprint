import fs from "fs";
import path from "path";
import matter from "gray-matter";

const caseStudiesDir = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyFrontmatter = {
  slug: string;
  heroImage: string;
  projectName: string;
  catchphrase: string;
  gallery?: string[];
};

export type CaseStudySection = {
  id: string;
  title: string;
  body: string;
};

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter;
  sections: CaseStudySection[];
};

const SECTION_HEADINGS = ["Problem", "Solution", "Results", "Lessons"];

function parseSections(body: string): CaseStudySection[] {
  const sections: CaseStudySection[] = [];
  const lines = body.trim().split("\n");
  let current: { title: string; lines: string[] } | null = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const title = match[1].trim();
      if (SECTION_HEADINGS.includes(title)) {
        if (current) {
          sections.push({
            id: current.title.toLowerCase().replace(/\s+/g, "-"),
            title: current.title,
            body: current.lines.join("\n").trim(),
          });
        }
        current = { title, lines: [] };
        continue;
      }
    }
    if (current) {
      current.lines.push(line);
    }
  }
  if (current) {
    sections.push({
      id: current.title.toLowerCase().replace(/\s+/g, "-"),
      title: current.title,
      body: current.lines.join("\n").trim(),
    });
  }
  return sections;
}

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(caseStudiesDir)) return [];
  return fs
    .readdirSync(caseStudiesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(caseStudiesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as CaseStudyFrontmatter;
  const sections = parseSections(content);
  return { frontmatter, sections };
}
