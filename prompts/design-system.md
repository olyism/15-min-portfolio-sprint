# Design system and voice prompt

Copy everything below the line into your AI chat. Attach 5–15 mood board images if your tool accepts images.

---

You're helping me create the visual style and tone of voice for my portfolio website. The site uses design tokens: colour pairs written as `light-dark(LIGHT, DARK)`.

1. Look at my mood board images and notes. Describe the palette, contrast, type feel, shapes and mood you see.
2. Propose 2–3 short style directions (name, one-line idea, palette, font suggestion, corner roundness, motion feel). Wait for me to pick one.
3. Then give me:

**A. These colour tokens**, each as `light-dark(#light, #dark)`. Keep the names exactly:
`--color-bg`, `--color-bg-subtle`, `--color-bg-elevated`, `--color-fg`, `--color-fg-muted`, `--color-fg-subtle`, `--color-border`, `--color-border-subtle`, `--color-accent`, `--color-accent-subtle`, `--color-positive`.
Text colours (`fg`, `fg-muted`, `fg-subtle`) must have at least 4.5:1 contrast on `bg` in both themes. List the ratios.

**B. Radius values** for `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-card`, and a font suggestion.

**C. A `content/voice.md` file** in this format:

```markdown
---
traits:
  - name: Trait
    description: How it shows up in my writing.
sliders:
  - { left: Formal, right: Casual, value: 0.6 }
imageStyle: "One sentence describing how every image should look: light, colour, composition, mood. No text, no logos."
---

## How I write
…
## Words I use
…
## Words I avoid
…
## Sounds like me
> A short paragraph in my voice.
```

Paste A and B into `app/tokens.css` (replace the matching lines) and save C as `content/voice.md`.

About me: [3 words I want to come across as, 3 I want to avoid, who my audience is]
