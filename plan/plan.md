# Implementation Plan: Designer Portfolio Template

**Branch**: `designer-portfolio-template` | **Date**: 2025-02-22 | **Spec**: [spec/spec.md](../spec/spec.md)
**Input**: Feature specification from spec/spec.md

## Summary

Build a designer portfolio template as a Next.js (App Router) application with Tailwind CSS, content from Markdown (case studies) and JSON (project grid, blog list), and deploy to Vercel. The template ships with Spec Kit spec/plan artifacts and placeholder content so designers can clone, customize, and deploy in ~15 minutes.

## Technical Context

**Language/Version**: Node 18+, TypeScript
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, gray-matter (Markdown frontmatter), react-markdown or native parsing for case study body
**Storage**: File-based only — no database. Content in `content/` (Markdown + JSON).
**Testing**: Manual / optional Vitest for libs
**Target Platform**: Vercel (serverless); static or dynamic routes as needed
**Project Type**: Web application (static-friendly with dynamic routes for case studies)
**Performance Goals**: Fast LCP; minimal JS for content-heavy pages
**Constraints**: No headless CMS; content editable via files only
**Scale/Scope**: Single designer portfolio; tens of projects and blog entries

## Project Structure

### Documentation (this template)

```text
designer-portfolio-template/
├── spec/
│   └── spec.md           # This feature spec
├── plan/
│   └── plan.md           # This file
├── tasks/
│   └── tasks.md          # Optional: task list for implementation
└── [Next.js app at repo root]
```

### Source Code (repository root)

```text
designer-portfolio-template/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home: hero, logos, project grid
│   ├── globals.css
│   ├── projects/
│   │   ├── page.tsx                # Projects list
│   │   └── [slug]/page.tsx         # Case study dynamic route
│   ├── blog/
│   │   └── page.tsx                # Blog list
│   ├── resume/
│   │   └── page.tsx                # Resume: copyable prompt template (no rendered resume)
│   └── contact/
│       └── page.tsx                # Contact page
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Logos.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── CaseStudySections.tsx       # Renders Problem, Solution, Results, Lessons, Gallery
│   └── BlogList.tsx
├── content/
│   ├── projects.json               # [{ slug, image, title, subheading, tags }]
│   ├── blog.json                   # [{ title, date, excerpt, url }]
│   └── case-studies/
│       └── example-project.md       # Example case study (full structure)
├── lib/
│   ├── content.ts                  # Load projects.json, blog.json, case study list + by slug
│   └── markdown.ts                 # Parse case study .md (frontmatter + sections)
├── public/
│   └── [placeholder images]
├── spec/
├── plan/
├── package.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

**Structure Decision**: Single Next.js app. Content under `content/`; no separate backend. Case studies loaded at build time or on demand (getStaticParams + getStaticProps or App Router equivalent).

## Content Model

### projects.json

```json
[
  {
    "slug": "example-project",
    "image": "/images/project-hero.jpg",
    "title": "Project Name",
    "subheading": "Short descriptor",
    "tags": ["UI design", "Growth", "ReactJS"]
  }
]
```

### blog.json

```json
[
  {
    "title": "Article Title",
    "date": "2025-01-15",
    "excerpt": "Short summary.",
    "url": "https://medium.com/..."
  }
]
```

### Case study Markdown (content/case-studies/[slug].md)

```yaml
---
slug: example-project
heroImage: /images/project-hero.jpg
projectName: Project Name
catchphrase: Acceleration activation from hours to minutes
gallery:
  - /images/g1.jpg
  - /images/g2.jpg
---

## Problem

Markdown body for Problem section.

## Solution

Markdown body for Solution section.

## Results

Markdown body for Results section.

## Lessons

Markdown body for Lessons/Reflection section.
```

Sections (Problem, Solution, Results, Lessons) are parsed from the body (e.g. by ## headings); hero and catchphrase from frontmatter. Gallery optional in frontmatter.

## Routes

| Route | Source | Notes |
|-------|--------|-------|
| `/` | app/page.tsx + projects.json + copy in JSX | Hero, logos, project grid |
| `/projects` | app/projects/page.tsx + projects.json | Grid/list of case studies |
| `/projects/[slug]` | app/projects/[slug]/page.tsx + content/case-studies/*.md | Full case study page |
| `/blog` | app/blog/page.tsx + blog.json | List of blog entries |
| `/resume` | app/resume/page.tsx | Copyable prompt template (LinkedIn/resume/free text → AI); no resume content rendered |
| `/contact` | app/contact/page.tsx | Copy in JSX; optional form |

## Deployment

- **Vercel**: Connect repo; build command `npm run build`; output Next.js. No env required for basic template.
- **Optional**: `vercel.json` for redirects/headers if needed.

## Constitution Check

N/A — template project; no org constitution. Code quality: clear components, minimal dependencies, Tailwind for styling.
