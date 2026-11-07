# Plan: Portfolio Sprint v2, a clean starter that works with AI agents

**Status (2026-11-07):** v2 built. Changes from the plan: `projects.json` was folded into case study frontmatter (one file per project, so there's nothing to keep in sync), and `blog.json` was renamed `blog-links.json`.

**Goal:** A plain, clean portfolio starter in an Apple style, with light and dark modes, that any designer can clone and give their own personality in an afternoon. It has a built-in agent workflow: images → resume → design system and voice → case studies → vibe-code → deploy.

**Out of scope for this plan:** sample portfolios in different styles. That's the next plan.

---

## 0. Decisions (my defaults; say if you want something different)

| # | Decision | Default |
|---|----------|---------|
| D1 | Upgrade the stack | **Yes.** Next.js latest stable (App Router), React 19, Tailwind v4. In v4 the design tokens live in CSS (`@theme`), and the design system page reads from that same source. |
| D2 | Case study section names | **Overview (frontmatter) → Problem → Solution → Impact → Lessons (optional).** This renames `Results` to `Impact` to match your "what / problem / how I solved it / impact" order. The parser still accepts `Results` so older files keep working. |
| D3 | Qantas Holidays case study (uncommitted) | **Leave it out of the template.** It's your real work and belongs in your own portfolio. The template ships 3 neutral sample projects. |
| D4 | Skills folder | **`.agents/skills/`** (the standard place for the skills CLI and `skills-lock.json`), plus a `.claude/skills` symlink so Claude Code finds them too. The uncommitted move to `agent/` gets reverted. Drop `vercel-react-native-skills` because this is a web project. |
| D5 | Theme switching | System preference by default, plus a 3-way toggle (System / Light / Dark). A tiny inline script prevents a flash of the wrong theme. **No `next-themes` dependency.** |
| D6 | Font | Native system font stack (`-apple-system, "SF Pro Display", Inter, system-ui…`). Zero downloads, and it looks native on Apple devices. A one-line swap to any `next/font` font is documented on the design system page. |
| D7 | Images | No `placehold.co`. A `<Placeholder>` div shows its aspect ratio and a **suggested image-generation prompt** right on it, so designers can generate the image and drop it in. |
| D8 | `.cursor/plans/second_brain…plan.md` | **Delete it.** It's about a different repo (the Coffee to Launch monorepo). |
| D9 | Template credit | ✅ **A small footer line on every deployed site:** "Template by Oly Su" → olysu.com. Controlled by `site.json` `credit: true`, so it's easy to turn off. Plus a "Need help?" section in the README. |
| D10 | Main audience | ✅ **Designers new to code.** The README explains every step and lets the agent do the coding. |
| D11 | Supported tools | ✅ **Claude Code, Cursor, Codex and other agents, and chat-only (ChatGPT, Gemini).** |
| D12 | AI-first features | ✅ **AI-readable portfolio + "How I used AI" block + agent-ready repo** (see §6b). The ask-my-portfolio chat is left out. |
| D13 | License | **MIT**, with credit appreciated. |

---

## 1. Cleanup

- Remove the explainer video link from the README.
- Remove the "Extend with Spec Kit" section from the README and every `spec/`, `plan/`, and `tasks/` reference in `AGENTS.md` (the folders are already deleted).
- Remove `placehold.co` from `next.config.mjs`.
- Delete `.cursor/plans/` (D8). Restore `.agents/skills/` and drop the react-native skill (D4).
- Remove the Qantas case study and its `projects.json` entry from the template (D3).

## 2. Foundation: tokens, theme, upgrade

- Upgrade the dependencies (D1). Move `tailwind.config.ts` into CSS (`@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`).
- **`app/tokens.css` is the single source of truth.** It's the one file a designer edits to restyle the whole site:
  - **Color:** `--bg`, `--bg-elevated`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--accent`, `--accent-fg`, each with a light and a dark value (`:root` and `[data-theme="dark"]`, with a `prefers-color-scheme` fallback). The default palette is Apple-neutral: near-white `#fbfbfd` / near-black `#000`, grey ramps, and one blue accent.
  - **Type:** a fluid scale (`--text-hero` uses `clamp()`, from about 48px up to 96px), tight tracking on display sizes, and relaxed line-height on body text.
  - **Spacing:** a 4px base scale, section rhythm (`--section-y`), and container widths.
  - **Radius** (`sm`/`md`/`lg`/`xl`, up to 28px cards), **shadow**, and **motion** (durations, easing, plus a `prefers-reduced-motion` override).
  - Tailwind v4 `@theme` maps these to utilities (`bg-bg`, `text-fg-muted`, `rounded-card`…), so components never hard-code colors.
- `components/ThemeToggle.tsx` plus an inline script in `layout.tsx` (D5).

## 3. Components (small set, compound where useful)

`Container`, `Section`, `Button` (primary / secondary / ghost), `Tag`, `Card`, `Placeholder` (D7), `ProjectCard`, `ProjectGrid`, `PostList`, `Header` (sticky, frosted `backdrop-blur`, collapses to a menu on mobile), `Footer`, `ThemeToggle`, `Reveal` (fade-in on scroll in pure CSS with `animation-timeline: view()` and a graceful fallback; no JS library).

## 4. Pages

| Route | What it shows |
|-------|---------------|
| `/` | Big hero (name, role, one-line value prop, two CTAs), large featured project tiles, a "Worked with" row, the latest 3 posts, and a contact band at the bottom |
| `/projects` | Grid of large cards (Placeholder 4:3, title, one-liner, tags) |
| `/projects/[slug]` | Eyebrow tags, title, catchphrase, a meta row (**Role · Timeline · Team · Tools**, all new optional frontmatter fields), full-width hero, sticky section navigation on desktop, the TL;DR `###` styled as a pull quote, gallery, and a **Next project** link |
| `/blog` | Post list. Entries can be local posts or external links (Medium, Substack) |
| `/blog/[slug]` | **New:** local Markdown posts with reading time |
| `/resume` | **Rendered resume** from `content/resume.json`. Two columns on screen; a print stylesheet gives one column, A4/Letter `@page` margins, hidden nav and footer, and no theme colors. A "Download PDF" button calls `window.print()`. (The copyable prompt moves to `prompts/resume.md`.) |
| `/design-system` | **New:** a live view of `tokens.css`. Color swatches for both themes, type scale, spacing, radius, shadow, motion, every component and its variants, **Voice & tone** (from `content/voice.md`), and **Imagery** (mood board grid and image-prompt style) |
| `/contact` | Large email address with a copy button, social links, availability line, and an optional booking link |
| `not-found` | A styled 404 page |
| Extras | `sitemap.ts`, `robots.ts`, and metadata from `site.json`. Open Graph image through `next/og` (no dependency) |

## 5. Content model (all content lives in `content/`, never in components)

```
content/
  site.json          name, role, tagline, email, socials, nav, footer credit, "worked with" list
  case-studies/*.md  ONE file per project. The file name is the slug/URL. No projects.json to keep in sync.
                     frontmatter: title, catchphrase, summary (card), role, timeline, team, tools, tags,
                     year, featured, order, cover? | coverPrompt?, gallery?[] ({src?, prompt, alt?, caption})
                     body: ## Problem / ## Solution / ## Impact / ## How I used AI? / ## Lessons?,
                     each led by a ### TL;DR
  blog/*.md          title, date, excerpt, cover?, coverPrompt?   (local posts)
  blog-links.json    external links only (title, date, excerpt, url)
  resume.json        basics, summary, experience[], education[], skills[], awards[]
  voice.md           personality, tone sliders, do/don't word lists, sample sentences
public/moodboard/    images designers drop in (read by the design system page)
public/images/       final generated or real images
```

Rule: **when `image`/`src` is missing, render `<Placeholder prompt=…>`.** Designers can ship before they have images.

## 6. Agent kit

- **`AGENTS.md`**, rewritten. It covers stack, content model, token rules ("restyle in `tokens.css`, don't hard-code colors"), case study structure, which skill to use for which step, and a pre-commit check (`npm run build && npm run lint`). Spec Kit is gone.
- **`CLAUDE.md`**: one line, `@AGENTS.md`, so Claude Code reads the same file as Cursor and Codex.
- **Skills (`.agents/skills/`):**
  - `portfolio-case-study-writer`, **updated**: What → Problem → How I solved it → Impact → Lessons, TL;DR-first, outcome framing (saves money / drives revenue / increases efficiency), fills the new meta fields and image prompts, and checks the tone against `content/voice.md`.
  - `portfolio-resume-writer`, **new**: LinkedIn, an old resume, or rough notes → `content/resume.json`. Impact-led bullets, one page.
  - `portfolio-design-system`, **new**: mood board images plus resume plus a few questions → edits `tokens.css` and writes `content/voice.md`. Checks contrast for both themes.
  - Keep `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns`.
- **`prompts/`**: plain copy-paste versions of each skill for people using ChatGPT or Gemini without an agent. Includes `image-generation.md`, which explains how to turn each Placeholder's prompt and your mood board into consistent images.

## 6b. AI-first features (D12)

**AI-readable portfolio.** AI recruiters, AI search and agents can read and shortlist you. No new dependencies.
- `/llms.txt`: who you are, what you do, and links to every case study, post and the resume, following the llms.txt convention. Generated from content at build time.
- `/llms-full.txt`: every case study, the resume and your voice summary as one clean Markdown file.
- JSON-LD on every page: `Person` (site-wide, from `site.json` + `resume.json`), `CreativeWork` (case studies), `BlogPosting` (posts).
- A "View as Markdown" link on case studies, plus semantic HTML and good alt text, so scrapers get structure, not divs.
- The case study skill writes for both audiences: scannable TL;DRs for humans, and explicit outcome statements (metric, role, scope) for machines.

**"How I used AI" block.** An optional `## How I used AI` case study section, rendered as a distinct card listing tools, agent workflow, prompts or evals, and what AI changed (speed, scope, quality). The case study skill asks about it in the interview. One sample project ships with it filled in.

**Agent-ready repo.** This is the headline README feature: "Open this folder in your AI tool and say *'Set up my portfolio'*." `AGENTS.md` has a guided onboarding script. The agent interviews the designer, runs the skills in workflow order, and checks the build. The same path works in Claude Code, Cursor and Codex, and `prompts/` gives the chat-only version.

## 7. README rewrite: "the agent workflow"

Written for designers new to code (D10):
- **"Before you start"** covers installing Node, git, a GitHub account and one AI tool (each with a link and a one-line command), plus how to open a terminal.
- **"Pick your tool"** has tabs or sections for Claude Code, Cursor, Codex and chat-only (D11), each showing the exact first message to send.
- **Glossary** (repo, deploy, token, Markdown, frontmatter) and **"Something broke?"** (a common-errors table, plus "paste the error into your agent").
- Screenshots or GIFs come later, once the site is built.

The workflow steps:

1. **Gather visuals.** Pull images from your existing work (screenshots and artifacts from your current or past companies; blur anything confidential, check your NDA). Build a mood board in `content/moodboard/`. Generate the missing images from the Placeholder prompts with your image model of choice.
2. **Resume first.** Run the resume skill on your LinkedIn or old resume → `/resume`. Print it to PDF.
3. **Design system and voice.** Run the design system skill with your mood board and resume → `tokens.css` + `voice.md`. Check `/design-system`.
4. **Case studies.** Run the case study skill on rough bullets for each project (What → Problem → How → Impact).
5. **Blog and contact.** Fill in `site.json`, add a post or two.
6. **Vibe code.** Ask your agent to give the pages your personality. The tokens and components keep it consistent.
7. **Deploy.** **Vercel** (recommended, zero config), **Netlify** (import the repo; Next.js is detected automatically), Cloudflare Pages via OpenNext, or a static export for any host.

Plus: a content guide table (updated), a "Need help? → [olysu.com](https://olysu.com) · [hi@olysu.com](mailto:hi@olysu.com)" section, and a license (MIT, D13).

## 8. Verify

- `npm run build` and `npm run lint` pass with no warnings.
- Browser check of every route at 375px, 768px, and 1440px, **in both themes**, plus the toggle with no theme flash on reload.
- `/resume` print preview fits on 1 page (A4 and Letter).
- Reduced-motion mode turns off the reveal animations. Keyboard focus is visible. Contrast is AA for every token pair in both themes.
- Lighthouse: Performance, Accessibility, Best Practices, and SEO all at least 95.
- `/llms.txt` and `/llms-full.txt` render and list every case study. JSON-LD passes Google's Rich Results / schema.org validator.
- Fresh-clone test: follow the README from zero in a new folder and confirm the "Set up my portfolio" agent flow reaches a working build.

## Order of work

Steps 1 → 2 → 3 → 4/5 (pages and content together) → 6 → 7 → 8. The skills and README (6–7) don't depend on the page code once the content model (5) is fixed, so they can run in parallel with step 4.

## Next plan (later)

Sample portfolios: 3–4 made-up designers with clearly different styles (e.g. editorial serif, brutalist mono, soft pastel, dark product-engineer). Each one changes only `tokens.css`, `voice.md`, and content, which proves the template adapts easily.
