# Portfolio Sprint: agent guide

This repo is a portfolio template for designers, many of whom are **new to code**. You (the AI agent) do the coding. Explain what you're doing in plain language, avoid jargon, and check your work in the browser.

## "Set up my portfolio"

When the user says something like *"set up my portfolio"*, *"help me get started"* or *"make this mine"*, run this flow. Do one step at a time, confirm before moving on, and keep the dev server running (`npm run dev` → http://localhost:3000) so they can watch the site change.

0. **Check the setup.** Run `node -v` (needs 20+) and `npm install`. If something's missing, give them the exact install link or command.
1. **Visuals.** Ask them to drop 5–15 images into `public/moodboard/`: screenshots of their own work (remind them to blur anything confidential and check their NDA), plus references they love. These feed step 3.
2. **Resume.** Use the `portfolio-resume-writer` skill. Ask them to paste their LinkedIn text or old resume → `content/resume.json` + `content/site.json`. Show them `/resume` and the Download PDF button.
3. **Design system and voice.** Use the `portfolio-design-system` skill → `app/tokens.css` + `content/voice.md`. Show them `/design-system` in both themes.
4. **Case studies.** Use the `portfolio-case-study-writer` skill, one project at a time → `content/case-studies/*.md`. Delete the sample projects once they have their own.
5. **Blog and contact.** Turn their notes into a post in `content/blog/`, or link existing articles in `content/blog-links.json`. Check `/contact`.
6. **Images.** List every placeholder prompt (`coverPrompt` and gallery `prompt`s, plus `imageStyle`) so they can generate images. Save results to `public/images/` and swap `coverPrompt` → `cover: /images/…`.
7. **Vibe code.** Offer 2–3 ideas for a signature touch that fits their voice. Build the one they pick, using tokens.
8. **Deploy.** Run `npm run build` and fix any errors. Walk them through Vercel or Netlify (see README). Set `url` in `site.json` to the live address.

## Stack

- Next.js (App Router, static pages), React 19, TypeScript, Tailwind CSS v4.
- Content is files: Markdown (`gray-matter` for frontmatter, `react-markdown` + `remark-gfm` to render) and JSON. No CMS, no database.
- No UI libraries. Icons are inline SVG in `components/icons.tsx`.

## Where things live

| What | File |
|------|------|
| Design tokens (all colours, type, spacing, radius, shadow, motion) | `app/tokens.css` |
| Global styles, print styles, prose styles | `app/globals.css` |
| Name, role, headline, email, socials, nav, footer credit | `content/site.json` |
| Case studies (one file = one project; the file name is the URL) | `content/case-studies/*.md` |
| Blog posts on this site | `content/blog/*.md` |
| Blog posts on other sites | `content/blog-links.json` |
| Resume | `content/resume.json` |
| Voice, tone and image style | `content/voice.md` |
| Mood board images | `public/moodboard/` |
| Final images | `public/images/` |
| Content loading and types | `lib/content.ts` |
| `/llms.txt`, Markdown copies, JSON-LD | `lib/llms.ts`, `lib/seo.ts`, `app/llms.txt/`, `app/md/` |

## Rules

- **Style with tokens, never hard-coded values.** Use `bg-bg`, `text-fg-muted`, `rounded-card`, `text-title` and so on. Never use `#hex`, `text-gray-500` or `rounded-[13px]` in components. Need a new value? Add a token to `app/tokens.css` (with a comment) and it shows up on `/design-system` automatically.
- **Colours are `light-dark(light, dark)` pairs.** Check every change in both themes.
- **Content stays in `content/`.** Don't put copy in components unless it's interface text.
- **Missing images are fine.** `<Media>` shows a placeholder with the generation prompt until `src` is set.
- **Case study structure:** frontmatter + `##` sections (Problem, Solution, Impact, optional How I used AI, Lessons), each led by a `###` one-line TL;DR. Details are in `.agents/skills/portfolio-case-study-writer/SKILL.md`.
- **Accessibility:** semantic HTML, visible focus, alt text on real images, AA contrast, and respect for reduced motion.
- **Keep it lean.** Don't add dependencies unless the user asks or there's no reasonable alternative.
- **Before saying "done":** `npm run build && npm run lint` pass, and you've looked at the changed pages at phone and desktop widths.

## Skills

Skills live in `.agents/skills/` (Claude Code also sees them through the `.claude/skills` link):
- `portfolio-resume-writer`: LinkedIn or old resume → `resume.json` + `site.json`
- `portfolio-design-system`: mood board + personality → `tokens.css` + `voice.md`
- `portfolio-case-study-writer`: rough notes → case study (What → Problem → How → Impact)
- `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns`: general quality references

Tools without skills support can read the same steps in `prompts/`.
