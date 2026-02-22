# Designer Portfolio Template — Agent context

This project is the **15-Minute Portfolio Sprint** template: a Next.js + Tailwind + Vercel portfolio for designers. Designers clone the repo, replace placeholder content, and deploy in ~15 minutes.

## Scope

- **Stack**: Next.js (App Router), Tailwind CSS, gray-matter for Markdown. Deploy target: Vercel.
- **Content**: `content/projects.json` (project grid), `content/blog.json` (blog list), `content/case-studies/*.md` (case studies). Home and Contact copy live in components/pages.
- **Spec Kit**: The template was built using spec-driven development. `spec/spec.md` and `plan/plan.md` are the source of truth for behaviour and structure; `tasks/tasks.md` lists implementation tasks.

## Conventions

- Keep the template minimal so designers can “vibe” their own look. Avoid heavy design or extra dependencies unless necessary.
- Case study structure: The What (hero, name, catchphrase), Problem, Solution, Results, Lessons, optional Gallery. Enforced in Markdown frontmatter and `##` sections.
- External images: Placeholder content may use `placehold.co`; production content can use local images in `public/` or configure `next.config.mjs` `images.remotePatterns` for other domains.

## When editing

- Adding a new page or route: align with `spec/spec.md` and `plan/plan.md`; update the plan if the IA changes.
- Changing case study structure: update `lib/markdown.ts` (section headings), `content/case-studies/example-project.md`, and the spec/plan.
- Content schema: document any new JSON or frontmatter fields in the README “Content guide” and in `plan/plan.md`.
