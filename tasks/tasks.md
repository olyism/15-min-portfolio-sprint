# Tasks: Designer Portfolio Template

**Source**: [spec/spec.md](../spec/spec.md) + [plan/plan.md](../plan/plan.md)

## Task list

1. **Next.js app with Tailwind** — Initialize Next.js (App Router), TypeScript, Tailwind CSS in designer-portfolio-template root.
2. **Content layer** — Create `content/projects.json`, `content/blog.json`, and `lib/content.ts` to load them; create `content/case-studies/` and `lib/markdown.ts` to parse case study Markdown (frontmatter + sections).
3. **Layout and nav** — Create `app/layout.tsx` with Header and Footer; add navigation links (Home, Projects, Blog, Contact).
4. **Home page** — Create Hero (value prop), Logos section, ProjectGrid using projects.json; wire to `app/page.tsx`.
5. **Projects list** — Create `app/projects/page.tsx` that lists all projects from projects.json with ProjectCard components.
6. **Case study page** — Create `app/projects/[slug]/page.tsx` that loads case study by slug, renders The What (hero, name, catchphrase), Problem, Solution, Results, Lessons, optional Gallery from Markdown.
7. **Blog list** — Create `app/blog/page.tsx` that renders blog entries from blog.json (title, date, excerpt, link; external links open in new tab).
8. **Contact page** — Create `app/contact/page.tsx` with placeholder copy and CTA (e.g. mailto or link).
9. **Placeholder content** — Add 1–2 example projects to projects.json, 1 example case study .md, 1–2 blog entries to blog.json; ensure hero/contact copy is clearly editable in components.
10. **Vercel and README** — Add deploy instructions; write README with 15-Minute Portfolio Sprint positioning, get started, content guide, deploy to Vercel, optional “Extend with Spec Kit”.
