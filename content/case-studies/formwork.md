---
title: "From a design decision to production"
catchphrase: "A component workbench that lets a team test the real behaviour before copying the code."
summary: "A working bridge between tokens, accessible components and everyday product delivery."
role: "Product design engineer"
timeline: "Concept · 6-week delivery proposal"
team: "Proposed: designer, frontend engineer, accessibility partner"
tools: ["React", "TypeScript", "CSS tokens", "Native HTML", "Component contracts"]
tags: ["Design engineering", "Design systems", "Prototyping"]
company: "Formwork"
specialty: "Product design engineering"
theme: "formwork"
skills: ["React prototyping", "Token architecture", "Accessible components", "Developer experience"]
lesson: "A small working artifact can demonstrate more than a screen full of code."
year: 2026
featured: true
order: 3
fictional: true
---

## Problem

### A component library only helps if people can use it correctly.

Formwork is a fictional platform team supporting three product squads. In the scenario, design files and production components share names but differ in behaviour. Teams recreate controls because the documented version lacks loading, error and keyboard states.

The proposed project is deliberately small: prove the path from a design decision to a usable component with one action pattern, then expand only when teams adopt it. The workbench is both a design tool and an implementation contract.

My contribution would span interaction design, token structure, React implementation and documentation. A frontend partner would review API boundaries and integration constraints. This is an opportunity for a designer to make an idea testable in code without claiming to replace engineering expertise.

## Solution

### I connected a live specimen to the same tokens and markup it documents.

The workbench presents a component, its meaningful variations and the exact code for that configuration. Density changes spacing through named tokens; corners switch between supported system values. A label field lets the team test real language instead of relying on a short placeholder.

**Make the browser do the accessible work.** The example uses a native button, visible focus and ordinary form controls. A saving state disables repeated activation and announces the result. It does not reinvent keyboard semantics with a clickable div.

**Design the API around decisions.** Variations describe product needs such as comfortable or compact density. They do not expose arbitrary pixel values that let every squad build a different system. A small supported set is easier to review and maintain than dozens of independent booleans.

**Expose the handoff cost.** The live code sample changes with the controls. It includes the required CSS contract and a copy action that reports success or failure. The prototype is usable directly in this portfolio; no account, design tool or external service is required.

I rejected a gallery of attractive but inert components. The first artifact needs to prove state, semantics and integration, not the number of widgets the team can draw. The local save simulation is intentionally separate from a production persistence layer.

## Impact

### Evaluate adoption through fewer repeated decisions and less rework.

The starter contains a working component experiment, not a deployed design system with adoption metrics. A real pilot would put it in one existing product task and observe the integration.

- **Delivery:** compare time from an approved interaction to a reviewed implementation, including rework.
- **Quality:** record accessibility defects and differences between the intended and shipped states.
- **Adoption:** track whether teams reuse the component after their first assisted integration.
- **Maintenance:** count unsupported overrides and repeated requests for missing states.

Publishing a package is an output. A squad choosing to reuse it on a second feature would be a more meaningful early signal.

## How I used AI

### Code expands a designer’s ability to test; review keeps that expansion trustworthy.

For a real implementation I would use a coding agent for first drafts, repetitive variations and documentation scaffolding. I would retain responsibility for the component contract, behaviour, labels and the decision to include or remove a variation.

AI-generated code needs to be read, run and checked with a keyboard. A passing type check does not prove that loading feedback makes sense or a button’s label describes its action. The useful portfolio story is how a working prototype changed the conversation with the team.

## Lessons

### Build the smallest thing that collapses a costly conversation.

One button with correct semantics, states and an inspectable implementation can be a stronger engineering case study than an entire speculative system. It gives engineers something concrete to critique and designers something real to test.

To make this yours, show the original integration problem and a before-and-after example from an actual team. Keep measured time savings separate from estimates.
