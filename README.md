# 15-Minute Portfolio Sprint

Go from a blank folder to a deployed portfolio in the time it takes to drink a coffee. Clone this template, swap in your content, and ship.

## What you get

- **Home** — Hero with value proposition, optional “Worked with” logos, and a grid of project case studies
- **Projects** — List of case studies with cards linking to full case study pages
- **Case studies** — Structured pages: The What (hero, name, catchphrase), Problem, Solution, Results, Lessons, optional Gallery
- **Blog** — A single list page (title, date, excerpt, link); links can point to external sites (e.g. Medium, Substack)
- **Contact** — Simple contact page (edit copy and CTA in code)

**Stack**: Next.js (App Router), Tailwind CSS, deploy to Vercel. Content is file-based: Markdown for case studies, JSON for the project grid and blog list. No CMS required.

## Prerequisites

- **Node.js** 18+
- **Vercel account** (free) for deployment

## Get started

1. **Clone** this repo (or use it as a template).
2. **Install** dependencies:
   ```bash
   npm install
   ```
3. **Customize content** (see [Content guide](#content-guide) below).
4. **Run locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).
5. **Deploy to Vercel** (see [Deploy to Vercel](#deploy-to-vercel) below).

## Content guide

| What to edit | Where |
|--------------|--------|
| **Hero headline and value prop** | `components/Hero.tsx` |
| **Logos (“Worked with”)** | `components/Logos.tsx` |
| **Project grid** | `content/projects.json` — one object per project: `slug`, `image`, `title`, `subheading`, `tags` |
| **Blog list** | `content/blog.json` — one object per entry: `title`, `date`, `excerpt`, `url` (external URLs OK) |
| **Case studies** | One Markdown file per project in `content/case-studies/[slug].md`. Use the frontmatter and section headings shown in `content/case-studies/example-project.md`. |
| **Contact copy and CTA** | `app/contact/page.tsx` |
| **Site name and nav** | `components/Header.tsx`, `components/Footer.tsx` |

### Case study structure (Markdown)

Each file in `content/case-studies/` should have:

- **Frontmatter**: `slug`, `heroImage`, `projectName`, `catchphrase`, and optionally `gallery` (array of image URLs).
- **Body**: Sections with `## Problem`, `## Solution`, `## Results`, `## Lessons`. Write in Markdown; the template renders them in order.

See `content/case-studies/example-project.md` for a full example.

### Project grid and slugs

Every entry in `content/projects.json` must have a `slug` that matches a case study file `content/case-studies/[slug].md` if you want the project card to link to a case study page. You can remove or add projects in `projects.json` and add or remove matching `.md` files in `content/case-studies/`.

## Deploy to Vercel

1. Push your repo to GitHub (or connect another Git provider in Vercel).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. Leave **Build Command** as `npm run build` and **Output Directory** as default.
4. Click **Deploy**. Your portfolio will be live at a `*.vercel.app` URL.

Or use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npx vercel
```

## Extend with Spec Kit

This template was built using [Spec Kit](https://github.com/github/spec-kit) (spec-driven development). The `spec/` and `plan/` folders in this repo hold the feature spec and technical plan. If you want to add new pages or change the structure, you can use Spec Kit to regenerate a plan and task list from an updated spec:

1. Install Spec Kit: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
2. In an AI assistant that supports Spec Kit (e.g. with `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`), point it at this repo and your updated spec to generate a new plan and tasks.

## License

Use this template for your own portfolio. If you share your site or remix the template, a credit or link back is appreciated but not required.
