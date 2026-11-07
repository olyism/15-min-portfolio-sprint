# Make these examples yours

The seven new case studies are teaching examples. Each represents a different specialist perspective, not a claim that the sample persona has held every role. Replace the invented company, proposed team, scenario and evidence with your own work before using a story as a professional claim.

## Content

Each project lives in `content/case-studies/<slug>.md`. Its filename becomes the URL. The existing section structure is preserved. Optional fields added for the showcase:

- `company`, `specialty`: the company and discipline being demonstrated.
- `theme`: `relay`, `tandem`, `formwork`, `common-ground`, `plainly`, `waypoint` or `afterhours`.
- `fictional`: set to true for invented examples; it also labels Markdown and machine-readable summaries.
- `skills`, `lesson`: the short teaching section above the narrative.

Removing `theme` restores the starter's ordinary cover-image presentation, so a real case study can use `cover` and `gallery` as before. Keep `fictional: true` until the content actually describes your work. The previous three samples are preserved under `content/case-studies/_starter-reference/` and are excluded from project loading.

## Visual systems

The shared shell stays in the original tokens and components. Project palettes, type families, spacing and shapes are defined in `app/tokens.css`. The project-scoped aliases and layouts live in `app/project-worlds.css`, under `data-world`. Every palette supports light and dark themes. `/design-system` lists the tokens.

`components/ProjectVisual.tsx` provides the editable HTML/CSS specimens. `content/project-demos.json` supplies their copy and invented data. `components/ProjectPlayground.tsx` supplies the small local interactions. Use the existing themes as examples; a new visual world needs its own scoped tokens and specimen layout.

## Working examples and boundaries

- Relay: six deterministic policy fixtures, plus inspectable proposed prompt, context, graph, MCP and harness contracts. JSON is also served at `/artifacts/relay-system.json`. No model or MCP service is connected.
- Tandem: request and withdraw sample shift cover; the original assignment stays visible.
- Formwork: adjust a native button, test loading/success feedback, and copy its markup. The copied specimen uses the repository's CSS and tokens; it is not a standalone component package.
- Common Ground: navigate synthetic evidence, interpretations and next research actions.
- Plainly: compare content variants and their example confirmation states.
- Waypoint: compare capacity trade-offs with illustrative effort units.
- Afterhours: choose a screening and seat, then review the selection. No reservation or payment occurs.

All demo state is local to the mounted page and resets on reload. No dependencies or credentials were added. Image generation prompts, font licenses and asset provenance are documented in `docs/SHOWCASE-ASSETS.md`.

## Impeccable

Installed project-locally at `.agents/skills/impeccable/`. The existing `.claude/skills` link exposes the same skill to Claude Code. New skills are available to Codex on the next turn. The launcher may need executable permission or can be invoked with `sh .agents/skills/impeccable/scripts/impeccable`. Its engine cache needs a writable location and network access on first use. Automatic hooks were not enabled; the guidance and detector were applied manually.

## Checks

Use `npm run build && npm run lint`. If the environment blocks Turbopack's local CSS helper, `npm run build -- --webpack` uses Next.js's supported alternative compiler. Do not change the production app simply to work around a restricted development environment.

## Independent project systems and generated artwork

Each project now has its own style-guide route, such as `/projects/relay/design-system`, linked from the project-level navigation. The shared `/design-system` page indexes all seven.

- `content/project-worlds.json` defines the identity, source links, principles, image descriptions and image dimensions.
- `lib/project-worlds.ts` provides the typed lookup used by the pages and image renderer.
- `components/ProjectVisual.tsx` now renders the generated screenshot image; it no longer reconstructs the application in HTML/CSS.
- `components/ProjectIdentityNav.tsx` links a project’s case study and its design system.
- `app/projects/[slug]/design-system/page.tsx` presents the actual scoped colour pairs, typography and image provenance.
- `public/images/projects/` contains the seven generated UI images.
- `content/artifacts/project-image-briefs.json` preserves the exact generation briefs.

The existing interactive exercises still live separately in `ProjectPlayground.tsx`. They demonstrate a small behaviour; they do not turn the screenshot into a working production app. Earlier descriptions of editable visual specimens above refer to the original starter pass; the current visual artifacts are generated images, with editable identity data and tokens surrounding them.
