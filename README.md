# Portfolio Sprint

**A clean, fast portfolio for designers, set up by your AI agent.** Clone it, tell your AI tool *"Set up my portfolio"*, and go from your LinkedIn profile to a live site with your own design system, case studies and resume.

It starts plain and Apple-clean on purpose, so your personality is what stands out.

## What you get

- **Home:** a big headline, featured work, the teams you've worked with, recent writing and a contact band
- **Case studies** in a story order that hiring managers (and their AI tools) can follow: **What → Problem → How I solved it → Impact**, plus an optional **How I used AI** section
- **Resume** that's a real page, and prints to a clean one-page PDF
- **Design system** page that shows your colours, type, spacing and components, plus your **tone of voice** and **image style**, read live from your code
- **Blog** with posts on your site or links to Medium and Substack
- **Contact** page with one-click copy for your email address
- **Light and dark mode**, following the visitor's system setting, with a toggle
- **Readable by AI:** `/llms.txt`, structured data and Markdown copies of every case study, so AI recruiters and search tools get your story straight from you
- **Placeholders that tell you what to make:** every missing image shows a ready-to-use image-generation prompt
- **Agent-ready:** built-in instructions and skills for Claude Code, Cursor and Codex, plus copy-paste prompts for ChatGPT and Gemini

Built with Next.js, Tailwind CSS and Markdown files. No database, no CMS, no monthly fees.

---

## Before you start

You need four things. Each is free.

| What | Why | Get it |
|------|-----|--------|
| **Node.js** (version 20 or newer) | Runs the site on your computer | [nodejs.org](https://nodejs.org): download the LTS version |
| **Git** | Keeps track of your changes | [git-scm.com](https://git-scm.com/downloads), or [GitHub Desktop](https://desktop.github.com) if you prefer buttons |
| **A GitHub account** | Stores your site and connects it to hosting | [github.com](https://github.com/signup) |
| **An AI tool** | Does the coding with you | See [Pick your tool](#pick-your-tool) |

> **New to the terminal?** It's the text window where you type commands. On a Mac, open **Terminal** (press ⌘ Space and type "Terminal"). On Windows, open **PowerShell**. Most AI coding tools have one built in, so you can also just ask the agent to run the commands for you.

## Get the code

1. On this repo's GitHub page, click **Use this template → Create a new repository** (or **Fork**). Name it something like `portfolio`.
2. Copy your new repo to your computer. In GitHub Desktop, use **File → Clone repository**. In a terminal:

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
```

3. Install and start it:

```bash
cd portfolio
```

```bash
npm install
```

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000). That's your site, running on your computer. It updates every time a file changes.

## Pick your tool

Open the project folder in your tool and send the first message below. The agent reads `AGENTS.md` and walks you through every step.

| Tool | How to start | First message |
|------|--------------|---------------|
| **[Claude Code](https://claude.com/claude-code)** (terminal, desktop app or VS Code) | Open the folder, start a session | `Set up my portfolio` |
| **[Cursor](https://cursor.com)** | File → Open Folder, then open the agent chat | `Set up my portfolio` |
| **[Codex](https://github.com/openai/codex)** or another coding agent | Open the folder | `Set up my portfolio` |
| **ChatGPT, Gemini or Claude.ai** (chat only) | Use the prompts in [`prompts/`](prompts/) | Paste a prompt, then copy the result into the file it names |

---

## The workflow

This is the order that works best. Your agent follows the same steps.

### 1. Gather your visuals

- **Start with real work.** Collect screenshots, photos and artifacts from projects at your current and past companies. Blur client names and sensitive data, and check your NDA.
- **Make a mood board.** Drop 5–15 images you love (your work, websites, posters, colours) into `public/moodboard/`. They show up on `/design-system`.
- **Generate the gaps.** Every placeholder on the site shows a prompt. Paste it into your image model of choice. See [`prompts/image-generation.md`](prompts/image-generation.md).

### 2. Write your resume first

Paste your LinkedIn text or old resume into your agent. It writes `content/resume.json` and fills in your name, role and headline in `content/site.json`. Check `/resume`, then click **Download PDF**.

*Why first?* Your resume holds the facts (roles, dates, wins) that everything else reuses.

### 3. Create your design system and voice

Your agent looks at your mood board, asks how you want to come across, and suggests a few directions. Pick one, and it updates:
- `app/tokens.css`: every colour (light and dark), font size, spacing, corner radius, shadow and animation on the site
- `content/voice.md`: your tone of voice, the words you use and avoid, and the style every image should share

Check the result at `/design-system`.

### 4. Write your case studies

Give the agent rough notes about a project. It interviews you, then writes it up in this order:

1. **What:** the project in one line
2. **Problem:** who was stuck, and what it cost
3. **How I solved it:** your key decisions, and why
4. **Impact:** numbers tied to money, time or risk
5. **How I used AI** (optional): what AI made possible, and what you kept doing yourself
6. **Lessons:** what you'd do again or differently

Each section opens with a one-line summary, so it's easy to skim.

### 5. Add writing and contact details

Add a post in `content/blog/`, or link existing articles in `content/blog-links.json`. Check your email and social links in `content/site.json`.

### 6. Vibe code

Now make it yours. Ask for a signature detail: a hero animation, a custom cursor, a playful 404 page, a new section. Because everything uses your tokens, it stays consistent.

### 7. Go live

See [Deploy](#deploy). Then set `url` in `content/site.json` to your live address.

---

## Content guide

Everything you write lives in `content/`. You rarely need to touch code.

| What | Where |
|------|-------|
| Name, role, headline, intro, email, socials, nav, "worked with" list | `content/site.json` |
| Case studies (one file per project; the file name is the URL) | `content/case-studies/*.md` |
| Blog posts on your site | `content/blog/*.md` |
| Blog posts on other sites | `content/blog-links.json` |
| Resume | `content/resume.json` |
| Voice, tone and image style | `content/voice.md` |
| Colours, fonts, spacing, radius, shadows, motion | `app/tokens.css` |
| Mood board images | `public/moodboard/` |
| Your finished images | `public/images/` |

**Images:** while a case study has `coverPrompt: "…"`, the site shows a placeholder with that prompt. When your image is ready, save it in `public/images/` and change the line to `cover: /images/your-image.jpg`.

**Hide something:** start a file name with `_` (e.g. `_draft-project.md`) and it won't appear on the site.

**Footer credit:** set `"credit": false` in `site.json` to remove the "Template by Oly Su" line. Keeping it is appreciated.

---

## Deploy

Your site is a Next.js app with almost every page pre-built, so most hosts work. Pick one:

### Vercel (recommended, about 2 minutes)

1. Push your code to GitHub (in GitHub Desktop: **Commit**, then **Push**).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project** and pick your repo.
3. Click **Deploy**. You'll get a `your-name.vercel.app` address. Add your own domain under **Settings → Domains**.

### Netlify (just as easy)

1. Push your code to GitHub.
2. Go to [netlify.com](https://www.netlify.com), click **Add new site → Import an existing project**, and pick your repo.
3. Netlify detects Next.js automatically. Click **Deploy**.

### Others

Cloudflare, Render, Railway and most Node hosts run Next.js too. Ask your agent: *"Help me deploy this to [host]"*.

Every time you push a change to GitHub, your site updates by itself.

---

## Why "readable by AI" matters

More and more recruiters, clients and search tools use AI to find and summarise people. This template gives them clean facts instead of making them guess:

- **`/llms.txt`**: a short map of you and your work, following the [llms.txt](https://llmstxt.org) convention
- **`/llms-full.txt`**: your resume and every case study in one file
- **`/projects/<name>.md`**: a plain Markdown copy of each case study (linked as "View as Markdown")
- **Structured data** (schema.org) on every page: who you are, what you made, what you wrote

You don't have to do anything. It's all generated from your content.

---

## Glossary

| Word | Meaning |
|------|---------|
| **Repo** (repository) | Your project folder, tracked by Git and stored on GitHub |
| **Commit / push** | Save a snapshot of your changes / send it to GitHub |
| **Deploy** | Put your site on the internet |
| **Token** | A named design value, like `--color-accent`. Change it once and it updates everywhere |
| **Markdown** | Plain text with simple formatting: `## Heading`, `**bold**`, `- list item` |
| **Frontmatter** | The settings block between `---` lines at the top of a Markdown file |
| **Agent** | An AI tool that can read and edit your files and run commands |

## Something broke?

| You see | Try |
|---------|-----|
| `command not found: npm` | Install Node.js (see [Before you start](#before-you-start)), then open a new terminal window |
| `Port 3000 is in use` | Another copy is running. Close it, or use the address the terminal shows (e.g. `localhost:3001`) |
| A page shows an error after editing a `.md` file | Check the frontmatter: text with a `:` in it needs quotes, and lists use `[a, b]` or `- item` |
| Anything else | Copy the whole error and paste it into your agent: *"I got this error, please fix it"* |

---

## Need help?

Stuck, or want a hand making your portfolio shine? Get in touch: **[olysu.com](https://olysu.com)** · **[hi@olysu.com](mailto:hi@olysu.com)**

## License

MIT. Use it for your own portfolio, remix it, share it. A credit or link back is appreciated but not required.
