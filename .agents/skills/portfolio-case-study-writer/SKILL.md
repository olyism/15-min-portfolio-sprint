---
name: portfolio-case-study-writer
description: Write compelling portfolio case studies from rough notes, bullet points or old drafts, using the story order What → Problem → How I solved it → Impact (→ How I used AI → Lessons). Use when the user wants to add a project, write or improve a case study, turn notes into a case study, or make their work appeal to hiring managers, clients and AI screening tools. Outputs a Markdown file in content/case-studies/.
---

# Portfolio case study writer

Turn rough notes into a case study that a hiring manager can skim in 60 seconds and an AI screening tool can summarise accurately. Show **outcome-based, AI-ready** work: how the designer's judgment and understanding of the technology **saved money, drove revenue or increased efficiency**.

## Before you write

1. Read `content/voice.md`. Match its traits, tone sliders and word lists. If it's still the sample, write in a clear, confident, plain-English voice.
2. Look at one existing file in `content/case-studies/` to match the format.

## Interview (ask only what's missing, a few questions at a time)

- **What:** project name, company or client (or "a fintech startup" if under NDA), your role, timeline, team, tools.
- **Problem:** who was stuck? What did it cost the business (money, time, risk, churn)? What were the constraints?
- **How you solved it:** 2–4 key decisions and *why*. What did you try that didn't work? What did you say no to?
- **Impact:** numbers. If they don't have exact numbers, ask for ranges, proxies (tickets, time saved, adoption) or qualitative proof (quotes, awards, launches). Never invent metrics. Mark any estimate as an estimate.
- **AI (optional but encouraged):** did AI tools, agents or models play a part in the process or the product? What changed because of them (speed, scope, quality)? What did they keep doing themselves?
- **Lessons:** what would they do again, or differently?
- **Images:** what visuals exist (screens, photos, diagrams)? Remind them to remove anything confidential.

## Output

Create `content/case-studies/<slug>.md`. The file name becomes the URL (`/projects/<slug>`), so use short kebab-case.

```markdown
---
title: Short, specific title (≤ 6 words)
catchphrase: One sentence on the outcome and how. Shown under the title.
summary: Card line, about 12 words, ending in the headline number.
role: Lead product designer
timeline: 2025 · 10 weeks
team: 1 PM, 3 engineers
tools: [Figma, Claude Code]
tags: [Product design, Growth]
year: 2025
featured: true        # show on the home page
order: 1              # 1 = first
coverPrompt: "Image-generation prompt for the hero image (describe subject, setting, light)"
# cover: /images/my-project.jpg   ← use instead of coverPrompt once there's a real image
gallery:
  - prompt: "Prompt for a supporting image"
    caption: What this image shows
  # - src: /images/my-project-2.jpg
  #   alt: Describe the image for screen readers
  #   caption: …
---

## Problem

### One-line TL;DR: the stakes, in plain words.

Body…

## Solution

### One-line TL;DR: the key move you made.

Body, with the key decisions as a short list…

## Impact

### One-line TL;DR with the headline number.

- **Drove revenue:** …
- **Saved money:** …
- **Increased efficiency:** …

## How I used AI

### One-line TL;DR: what AI made possible.

Body (optional section; delete if not relevant)…

## Lessons

### One-line TL;DR: the takeaway.

Body…
```

Rules the site depends on:
- `##` headings become sections, in order. `Problem`, `Solution`, `Impact`, `How I used AI` and `Lessons` are the standard set (`Results` still works as an older name for `Impact`). `How I used AI` gets a special highlighted card.
- The first `### line` in each section is shown as its large TL;DR. Keep it under about 20 words.
- No `projects.json` to update. The project appears in the grid automatically.

## Quality bar

- **Story over process.** Decisions and trade-offs, not "we did a double diamond".
- **You in the frame.** "I" for your work, "we" for the team's. Be honest about which is which.
- **Outcomes up front.** Each TL;DR should make sense on its own. AI tools often quote only these lines.
- **Scannable.** Short paragraphs, lists for impact, about 600–900 words in total.
- **Machine-readable facts.** State role, scope and metrics explicitly, not just by implication, so `/llms.txt` and AI summaries get them right.

See [references/best-practices.md](references/best-practices.md) for patterns and anti-patterns.

## After writing

- Run `npm run build` to check the file parses.
- Suggest 1–3 image prompts that match `imageStyle` in `content/voice.md`.
- Offer a tighter version of the catchphrase if the first one runs over one line.
