# Feature Specification: Designer Portfolio Website

**Feature Branch**: `designer-portfolio-template`
**Created**: 2025-02-22
**Status**: Approved
**Input**: A designer portfolio template that lets designers go from clone to deployed site in ~15 minutes. Strong value-prop home, project case studies, blog list, resume prompt template, contact. Built with Spec Kit (SDD), Next.js, Tailwind, Vercel.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor lands on home and sees value (Priority: P1)

A potential employer or client visits the site and immediately sees who the designer is, what they offer, and social proof (logos). They can scan a grid of project case studies and click through to read full case studies.

**Why this priority**: First impression and discoverability of work are the primary goals of a portfolio.

**Independent Test**: Can be fully tested by loading the home page and verifying hero (value prop), logos section, and project grid with links to case study pages.

**Acceptance Scenarios**:

1. **Given** the site is deployed, **When** a visitor opens the home page, **Then** they see a hero with a clear value proposition and the designer’s name.
2. **Given** the home page, **When** the visitor scrolls, **Then** they see a “Worked with” or “Featured in” logos section (if configured).
3. **Given** the home page, **When** the visitor views the projects section, **Then** they see a grid of project cards (image, title, subheading, tags) linking to individual case study pages.

---

### User Story 2 - Visitor reads a case study (Priority: P1)

A visitor clicks a project and lands on a case study page with a consistent, compelling structure: hero (project name, catchphrase), problem, solution, results, lessons, and optional gallery.

**Why this priority**: Case studies are the core evidence of the designer’s impact and process.

**Independent Test**: Can be fully tested by opening any `/projects/[slug]` page and verifying all sections render from Markdown content.

**Acceptance Scenarios**:

1. **Given** a case study slug, **When** the visitor opens `/projects/[slug]`, **Then** they see The What (hero image, project name, catchphrase).
2. **Given** the case study page, **When** the visitor scrolls, **Then** they see Problem, Solution, Results, and Lessons/Reflection sections with content from the case study Markdown.
3. **Given** a case study with a gallery, **When** the page loads, **Then** the optional Gallery section is visible.

---

### User Story 3 - Visitor browses projects list and blog (Priority: P2)

A visitor can open a Projects page that lists all case studies (same grid or list as on home). They can open a Blog page that lists articles with title, date, excerpt, and link (external links allowed).

**Why this priority**: Supports navigation and credibility (blog/thought leadership).

**Independent Test**: Can be fully tested by visiting `/projects` and `/blog` and verifying list content from JSON/Markdown.

**Acceptance Scenarios**:

1. **Given** the site has projects, **When** the visitor opens `/projects`, **Then** they see a list or grid of all case studies with links to case study pages.
2. **Given** the site has blog entries, **When** the visitor opens `/blog`, **Then** they see a list of entries (title, date, excerpt, link); links may be external.

---

### User Story 4 - Visitor finds contact (Priority: P2)

A visitor can reach the designer via a Contact page or section (form or CTA such as email/LinkedIn).

**Why this priority**: Conversion and hiring/collaboration depend on clear contact.

**Independent Test**: Can be fully tested by opening `/contact` and verifying contact copy and CTA or form.

**Acceptance Scenarios**:

1. **Given** the site is deployed, **When** the visitor opens `/contact`, **Then** they see contact information or a clear CTA (e.g. email, form, or link to calendar).

---

### User Story 5 - Designer uses resume prompt template (Priority: P2)

A designer (or anyone customizing the template) can open the Resume page and copy a prompt template to run in an AI assistant (e.g. Cursor, ChatGPT). The prompt guides them to provide context such as a LinkedIn profile URL, existing resume text, or free-form notes, and asks the AI to draft resume content suitable for the web.

**Why this priority**: Supports content creation without adding a CMS; the page is instructions and copy-paste only (no rendered resume on the page).

**Independent Test**: Can be fully tested by opening `/resume` and verifying the prompt template is visible and copyable (e.g. via a copy button).

**Acceptance Scenarios**:

1. **Given** the site is deployed, **When** a visitor opens `/resume`, **Then** they see instructions and a copyable prompt template.
2. **Given** the Resume page, **When** the user copies the prompt, **Then** the template includes guidance for providing context (LinkedIn, existing resume, or free text) and a clear place to paste that context before running the prompt in an AI assistant.

---

### Edge Cases

- What happens when a case study slug does not exist? Show a 404 or friendly “not found” page.
- What happens when `projects.json` or `blog.json` is empty? Show empty state or hide section.
- How does the system handle external blog links? Open in new tab or same tab (recommend new tab).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST serve a home page with hero (value prop), optional logos, and a grid of project case studies.
- **FR-002**: System MUST serve a Projects list page at `/projects` showing all case studies.
- **FR-003**: System MUST serve dynamic case study pages at `/projects/[slug]` with content from Markdown (The What, Problem, Solution, Results, Lessons, optional Gallery).
- **FR-004**: System MUST serve a Blog list page at `/blog` with entries (title, date, excerpt, url); url may be external.
- **FR-005**: System MUST serve a Contact page at `/contact` with editable copy and CTA or form.
- **FR-006**: System MUST serve a Resume page at `/resume` with a copyable prompt template that guides the user to provide context (LinkedIn profile, existing resume, or free text) for use in an AI assistant; the page does not render resume content.
- **FR-007**: System MUST read case studies from Markdown files (frontmatter + body sections).
- **FR-008**: System MUST read project grid metadata from JSON (image, title, subheading, tags).
- **FR-009**: System MUST read blog list from JSON (title, date, excerpt, url).

### Key Entities

- **Case study**: A single project story. Attributes: slug, heroImage, projectName, catchphrase, problem (Markdown), solution (Markdown), results (Markdown), lessons (Markdown), gallery (optional array of image URLs or section).
- **Project grid item**: Card metadata. Attributes: slug (links to case study), image, title, subheading, tags (e.g. UI design, Growth, ReactJS).
- **Blog entry**: List item. Attributes: title, date, excerpt, url (internal or external).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A designer can clone the template repo, replace placeholder content (copy, images, projects.json, blog.json, case study .md files), and deploy to Vercel in under 15 minutes.
- **SC-002**: All pages (home, projects, project/[slug], blog, resume, contact) load and render without errors.
- **SC-003**: Case study pages render the full content structure (The What, Problem, Solution, Results, Lessons, optional Gallery) from a single Markdown file per project.
