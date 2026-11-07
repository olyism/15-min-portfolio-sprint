import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf-8")) as T;
}

function readMarkdownDir(dir: string) {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf-8"));
      return { slug: file.replace(/\.md$/, ""), data, content };
    });
}

/* ───────────── Site ───────────── */

export type Social = { label: string; url: string };

export type Site = {
  name: string;
  role: string;
  location?: string;
  url: string;
  description: string;
  headline: string;
  intro: string;
  email: string;
  availability?: string;
  bookingUrl?: string;
  socials: Social[];
  nav: { label: string; href: string }[];
  workedWith: string[];
  credit: boolean;
};

export function getSite(): Site {
  return readJson<Site>("site.json");
}

/* ───────────── Images ───────────── */

/** An image you have (src) or one you still need to make (prompt). */
export type Img = { src?: string; prompt?: string; alt?: string; caption?: string };

/* ───────────── Case studies ───────────── */

export type CaseStudySection = {
  id: string;
  title: string;
  /** The ### line at the top of the section, shown as a one-line summary. */
  tldr?: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  catchphrase: string;
  summary: string;
  role?: string;
  timeline?: string;
  team?: string;
  tools: string[];
  tags: string[];
  year?: string | number;
  featured: boolean;
  order: number;
  cover: Img;
  gallery: Img[];
  sections: CaseStudySection[];
  raw: string;
};

/** Section heading → nav label. "Results" is accepted as an older name for "Impact". */
const SECTION_ALIASES: Record<string, string> = { Results: "Impact" };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSections(body: string): CaseStudySection[] {
  const sections: CaseStudySection[] = [];
  let current: { title: string; lines: string[] } | null = null;
  const flush = () => {
    if (!current) return;
    let text = current.lines.join("\n").trim();
    let tldr: string | undefined;
    const m = text.match(/^###\s+(.+)\n?/);
    if (m) {
      tldr = m[1].trim();
      text = text.slice(m[0].length).trim();
    }
    sections.push({ id: slugify(current.title), title: current.title, tldr, body: text });
  };
  for (const line of body.split("\n")) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      flush();
      const title = SECTION_ALIASES[m[1]] ?? m[1];
      current = { title, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  flush();
  return sections;
}

function toImg(v: unknown, prompt?: unknown): Img {
  if (typeof v === "string") return { src: v };
  if (v && typeof v === "object") return v as Img;
  return { prompt: typeof prompt === "string" ? prompt : undefined };
}

export function getCaseStudies(): CaseStudy[] {
  return readMarkdownDir("case-studies")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title ?? data.projectName ?? slug,
      catchphrase: data.catchphrase ?? "",
      summary: data.summary ?? data.catchphrase ?? "",
      role: data.role,
      timeline: data.timeline,
      team: data.team,
      tools: data.tools ?? [],
      tags: data.tags ?? [],
      year: data.year,
      featured: Boolean(data.featured),
      order: data.order ?? 99,
      cover: toImg(data.cover ?? data.heroImage, data.coverPrompt),
      gallery: (data.gallery ?? []).map((g: unknown) => toImg(g)),
      sections: parseSections(content),
      raw: content.trim(),
    }))
    .sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((c) => c.slug === slug) ?? null;
}

/* ───────────── Blog ───────────── */

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Set for posts that live on another site (Medium, Substack…). */
  url?: string;
  cover: Img;
  body: string;
  readingMinutes: number;
};

export function getPosts(): Post[] {
  const local: Post[] = readMarkdownDir("blog").map(({ slug, data, content }) => ({
    slug,
    title: data.title ?? slug,
    date: String(data.date ?? ""),
    excerpt: data.excerpt ?? "",
    cover: toImg(data.cover, data.coverPrompt),
    body: content.trim(),
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 230)),
  }));
  const external: Post[] = readJson<Omit<Post, "slug" | "cover" | "body" | "readingMinutes">[]>(
    "blog-links.json",
  ).map((p) => ({ ...p, slug: slugify(p.title), cover: {}, body: "", readingMinutes: 0 }));
  return [...local, ...external].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug && !p.url) ?? null;
}

export function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" });
}

/* ───────────── Resume ───────────── */

export type Resume = {
  summary: string;
  experience: {
    company: string;
    role: string;
    start: string;
    end: string;
    location?: string;
    highlights: string[];
  }[];
  skills: { group: string; items: string[] }[];
  education: { school: string; qualification: string; year: string }[];
  awards?: { title: string; detail?: string; year?: string }[];
};

export function getResume(): Resume {
  return readJson<Resume>("resume.json");
}

/* ───────────── Voice & imagery ───────────── */

export type Voice = {
  traits: { name: string; description: string }[];
  sliders: { left: string; right: string; value: number }[];
  imageStyle: string;
  body: string;
};

export function getVoice(): Voice {
  const { data, content } = matter(fs.readFileSync(path.join(contentDir, "voice.md"), "utf-8"));
  return {
    traits: data.traits ?? [],
    sliders: data.sliders ?? [],
    imageStyle: data.imageStyle ?? "",
    body: content.trim(),
  };
}

/** Image files dropped into public/moodboard/ */
export function getMoodboard(): string[] {
  const dir = path.join(process.cwd(), "public", "moodboard");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f))
    .map((f) => `/moodboard/${f}`);
}
