---
name: portfolio-resume-writer
description: Turn a LinkedIn profile, an old resume or rough notes into a one-page, impact-led resume in content/resume.json, shown at /resume and printable to PDF. Use when the user wants to create, update or tighten their resume, or is starting to set up their portfolio (do the resume first; the case studies and design system build on it).
---

# Portfolio resume writer

The resume comes first in the setup flow. It's the fastest way to collect the facts (roles, dates, wins) that the case studies, `site.json` and `/llms.txt` reuse.

## Input

Ask the user to paste any of these (more is better):
- LinkedIn: the About and Experience sections copied as text. A PDF export also works. Don't try to fetch LinkedIn URLs, because they need a login.
- An existing resume (text or PDF).
- Rough notes: roles, dates, proudest wins, numbers they remember.

Also ask: **what roles are you targeting?** (e.g. "senior product designer at an AI startup", "design engineering consulting"). Tailor the emphasis to that.

## Write `content/resume.json`

Keep the existing shape exactly:

```json
{
  "summary": "2–3 sentences: who you are, years and domains, what you're best known for.",
  "experience": [
    { "company": "", "role": "", "start": "2023", "end": "Present", "location": "", "highlights": ["", ""] }
  ],
  "skills": [{ "group": "Design", "items": [] }, { "group": "Engineering", "items": [] }, { "group": "AI", "items": [] }],
  "education": [{ "school": "", "qualification": "", "year": "" }],
  "awards": [{ "title": "", "detail": "", "year": "" }]
}
```

Rules:
- **Impact-led bullets:** verb + what you did + measurable result. "Redesigned onboarding; time-to-value fell from 4 days to 40 minutes." Never invent numbers. Ask, or use honest proxies.
- **2–4 bullets** for recent roles, 1–2 for older ones. Most recent first. Drop roles older than about 12 years unless they matter.
- **One page:** the whole thing should fit on one printed page. Check `/resume` → Download PDF.
- **AI skills are a real group.** List the tools and practices they actually use (agents, prompt and eval design, image models), not buzzwords.
- Follow the voice in `content/voice.md` if it has been personalised.

## Then update the rest of the site from the same facts

- `content/site.json`: `name`, `role`, `location`, `description` (one sentence an AI tool could quote), `headline`, `intro`, `email`, `socials`, `workedWith` (companies from the resume, if they're happy to name them).
- Suggest 2–3 projects from the resume that would make strong case studies, and hand over to the **portfolio-case-study-writer** skill.
