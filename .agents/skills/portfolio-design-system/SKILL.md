---
name: portfolio-design-system
description: Create the designer's own design system and voice for their portfolio by editing app/tokens.css (colour, type, spacing, radius, shadow, motion) and content/voice.md (tone of voice and image style), based on their mood board, existing work and personality. Use when the user wants to restyle, rebrand or personalise the portfolio, define their tone of voice, or set an image style.
---

# Portfolio design system

The template ships as a neutral, Apple-like starting point. This skill gives it the designer's personality **through tokens**, so every page changes at once and stays consistent.

## Gather (ask a few questions at a time)

1. **Mood board:** look at the images in `public/moodboard/` (ask them to drop in 5–15 references: their own work, sites, posters, photos, colours). Describe back what you see: palette, contrast, type feel, shapes, density.
2. **Personality:** three adjectives for how they want to come across, and three they want to avoid.
3. **Audience:** who should feel at home here (e.g. startup founders, enterprise hiring managers, editorial clients)?
4. **Resume:** read `content/resume.json` for their domain and seniority.

## Propose before editing

Offer **two or three short directions** (name, one-line idea, palette, type pairing, radius and motion feel). Let them pick or mix. Then edit.

## Edit `app/tokens.css`

- Keep **every token name**, since components depend on them. Change values only. Add new tokens if needed; don't delete any.
- Colours: always `light-dark(LIGHT, DARK)`. Design both themes. Dark isn't an inverted light theme: lift surfaces slightly (`bg-elevated` lighter than `bg`) and soften the accent.
- **Contrast:** `fg` and `fg-muted` on `bg`, `bg-subtle` and `bg-elevated` must meet WCAG AA (4.5:1). `fg-subtle` should be at least 4.5:1 on `bg`. Check with a quick script, and report the ratios.
- Fonts: the default is the system stack. For a custom font, use `next/font/google` in `app/layout.tsx`, expose it as a CSS variable, and point `--font-sans` (or a new `--font-display`) at it.
- Update the comments after each token (they're shown on `/design-system`).

## Edit `content/voice.md`

- `traits`: 3 traits, each with a one-line *how*, not just an adjective.
- `sliders`: 3–5 tone sliders, with values from 0 to 1.
- `imageStyle`: one sentence that's added to every image prompt on the site. Cover subject treatment, light, colour, composition and mood, plus "no text, no logos".
- Body: how I write, words I use, words I avoid, and a short paragraph in their voice.

## Check

- `npm run build`, then look at `/design-system` and `/` in **both themes** (use the toggle) at phone and desktop widths.
- Suggest the next step: regenerate images with the new `imageStyle`, or "vibe code" a signature detail (hero treatment, a custom cursor, a type flourish) using the tokens.
