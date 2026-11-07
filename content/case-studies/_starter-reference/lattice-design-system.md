---
# Sample project: replace with your own.
title: Lattice design system
catchphrase: A design system six teams adopted in two quarters, because it was faster to use than to ignore.
summary: Tokens to React components, built for adoption. UI build time down 35%.
role: Design system lead
timeline: 2024 · 6 months
team: 2 designers, 2 front-end engineers
tools: [Figma variables, Style Dictionary, React, Storybook]
tags: [Design systems, Design engineering]
year: 2024
featured: true
order: 2
coverPrompt: "An elegant grid of rounded UI components and colour swatches floating on a soft grey background, isometric, minimal, premium"
gallery:
  - prompt: "Colour token swatches arranged in neat rows, light and dark versions side by side, flat lay"
    caption: One token, two themes
---

## Problem

### Six product teams were rebuilding the same button, each a little differently.

Northwind had grown through acquisitions. That meant four front-end stacks, three shades of "brand blue" and no shared components. Each new feature cost about a week of UI work before any real product work started, and the product looked like four different companies.

## Solution

### I treated the design system as a product with customers, not as a style guide.

I interviewed one engineer and one designer from each team and asked a single question: *what makes you rebuild something instead of reusing it?* The answers were speed and trust, not looks.

- **Tokens first.** One source of truth in code, exported to Figma variables, so design and code can't drift apart.
- **Ten components, not a hundred.** We shipped the ten that covered 80% of the screens and said no to the rest.
- **Adoption as the metric.** A weekly dashboard tracked component usage across repos. It was public, and a little competitive.

## Impact

### Six teams adopted Lattice in two quarters, and UI build time fell 35%.

- **Increased efficiency:** a new feature's UI went from about 5 days to about 3.
- **Saved money:** we retired 3 duplicate component libraries, which cut roughly 1,200 hours of maintenance a year.
- **Quality:** accessibility issues found in audits went down 60%, because the fixes live in the components.

## Lessons

### Adoption is a sales problem, not a craft problem.

The prettiest component in the system had the lowest usage, because its API was awkward. Next time I'd pair with engineers on API design before the visuals.
