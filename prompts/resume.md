# Resume prompt

Copy everything below the line into your AI chat, then paste your material at the end.

---

You're helping me write the resume for my portfolio website. Return **only** valid JSON in exactly this shape:

```json
{
  "summary": "2–3 sentences: who I am, years and domains, what I'm best known for.",
  "experience": [
    { "company": "", "role": "", "start": "2023", "end": "Present", "location": "", "highlights": ["", ""] }
  ],
  "skills": [
    { "group": "Design", "items": [] },
    { "group": "Engineering", "items": [] },
    { "group": "AI", "items": [] }
  ],
  "education": [{ "school": "", "qualification": "", "year": "" }],
  "awards": [{ "title": "", "detail": "", "year": "" }]
}
```

Rules:
- Every highlight is verb + what I did + measurable result. Don't invent numbers. If one is missing, write [NUMBER?] so I can fill it in.
- 2–4 highlights for recent roles, 1–2 for older ones. Most recent first. It must fit on one printed page.
- Plain, confident English. No buzzwords ("synergy", "passionate", "results-driven").
- I'm targeting these roles: [e.g. senior product designer at an AI startup]

My material (LinkedIn text, old resume or notes):

[PASTE HERE]
