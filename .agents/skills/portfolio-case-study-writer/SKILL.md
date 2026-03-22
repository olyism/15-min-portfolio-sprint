---
name: portfolio-case-study-writer
description: Write compelling portfolio case studies from rough bullet points or drafts for designer portfolios. Use when the user wants to create or refine a case study, convert bullet points into a case study, add a new project to their portfolio, showcase design work for consulting clients or hiring managers, or apply industry best practice to portfolio case studies. Case studies should demonstrate AI-ready, outcome-based skills (save money, drive revenue, increase efficiency) through ingenuity and technology understanding. Use for any portfolio using the standard case study format (Problem, Solution, Results, Lessons). Output is Markdown for content/case-studies/ and content/projects.json.
---

# Portfolio Case Study Writer

Turn rough bullet points or drafts into compelling case studies for **designer portfolios** that resonate with **potential consulting or coaching clients** and **hiring managers at top companies**. Case studies should showcase skills and capabilities that are **AI ready** and **outcome-based**: they demonstrate how your work saves money, drives revenue, or increases efficiency through ingenuity and a real understanding of the technology. Works for any design discipline: product design, UX, design engineering, visual design, research, and mixed roles.

## Output format

This skill targets the standard portfolio template structure (e.g. 15-Minute Portfolio Sprint, or any clone using the same content shape):

- **File**: `content/case-studies/[slug].md` (relative to the project root)
- **Frontmatter**: `slug`, `heroImage`, `projectName`, `catchphrase`, optional `gallery` (array of image URLs)
- **Sections** (exact `##` headings): `## Problem`, `## Solution`, `## Results`, `## Lessons`. Within each section: a **### compelling TL;DR one-liner** that sums up the section and value prop, then the detailed body—so the audience can scan first and read in detail as needed.
- **Optional**: `gallery` in frontmatter for visuals. Body is Markdown; typically rendered with react-markdown + remark-gfm + prose styling.

Add or update the project in `content/projects.json` (slug, image, title, subheading, tags) so the case study appears in the project grid.

## Workflow

1. **Gather input**: User provides rough bullet points, notes, or an existing draft. If unclear, ask for: project name, your role, problem/context, what you did, outcomes (metrics or qualitative), and one or two lessons.
2. **Map to structure**: Distil into Problem (clear stakes, user/business pain), Solution (your approach, key decisions, and why—not a step-by-step recipe), Results (impact with numbers or evidence), Lessons (reflective takeaways that show judgment).
3. **Draft**: Write in first person or “we” as appropriate. Lead with story and insights, not process jargon. Make your role and thinking visible.
4. **Align with project positioning** (optional): If the project has an AGENTS.md, README, or similar with positioning or brand (e.g. “design + engineering”, “AI/ML design”), reflect that when relevant. Don’t force it into every case study.
5. **Surface AI-ready, outcome-based value**: When drafting, make it clear how the work ties to business outcomes—saving money, driving revenue, or increasing efficiency—and how your ingenuity and understanding of the technology made that possible. This is what makes the portfolio compelling to both clients and AI-augmented hiring workflows.
6. **Output**: Valid frontmatter + the four sections. Suggest a short, punchy `catchphrase` for the hero.

## Quality principles (industry best practice)

- **Story over process**: Narrative and decisions drive the case study. Avoid generic methodology (e.g. “we did double diamond”) unless it’s essential to the story.
- **Insights over steps**: Emphasize what you learned, what changed, and why—including pivots or failed ideas—not a linear list of activities.
- **Outcome-focused**: Tie decisions to results. Prefer concrete impact (metrics, adoption, risk reduced) over vague “improved UX.”
- **You in the frame**: Hiring managers and clients need to see *your* contribution: strategy, trade-offs, collaboration under constraints, ownership.
- **Concise and scannable**: Short paragraphs, clear subheads if a section is long, bullet lists for results. Respect reader time. Each section leads with a compelling TL;DR one-liner so readers can grasp the value prop at a glance, then dive into detail if they want.

For more patterns and examples, see [references/best-practices.md](references/best-practices.md).

## AI-ready, outcome-based framing

Case studies should read as evidence of **AI-ready** skills: the kind of work that clearly maps to business outcomes and can be understood and valued by both humans and AI-assisted evaluation (e.g. recruiting tools, RFP scoring). When writing or refining a case study:

- **Outcome categories**: Explicitly tie results to at least one of: **saving money** (e.g. reduced support load, fewer one-off integrations, lower operational cost), **driving revenue** (e.g. conversion lift, new revenue streams, partner launches), or **increasing efficiency** (e.g. time-to-value, throughput, scalability).
- **Ingenuity and technology**: Show how your judgment and understanding of the technology (APIs, platform models, tools, constraints) led to the outcome—not just "we shipped a feature" but "we designed the right contract so the platform could scale without rework."
- **Demonstrable**: Use concrete proof (metrics, named partners, before/after, handover or deprecation) so the outcome is credible and scannable.

This framing makes the portfolio stronger for consulting pitches, hiring managers, and any process that uses AI to shortlist or summarize candidates.

## Tone and audience

- **Consulting/coaching clients**: Show you can own ambiguity, validate quickly, and deliver impact with limited resources. They’re asking “Can you do this for us?”
- **Hiring managers**: Show scope (strategy, research, execution, collaboration), bar for quality, and ability to operate at their level. They’re asking “Can you do this role here?”

Keep tone professional, confident, and specific—no hype or filler.
