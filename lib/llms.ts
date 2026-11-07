import { getCaseStudies, getPosts, getResume, getSite, getVoice, type CaseStudy } from "./content";
import { absoluteUrl } from "./seo";

/** One case study as clean Markdown, for AI tools and the "View as Markdown" link. */
export function caseStudyMarkdown(c: CaseStudy) {
  const site = getSite();
  const meta = [
    c.fictional && "- **Status:** Fictional teaching example. Companies, scenarios and evidence are illustrative; outcomes are proposed, not measured.",
    c.specialty && `- **Specialty:** ${c.specialty}`,
    c.theme && `- **Design system:** ${absoluteUrl(`/projects/${c.slug}/design-system`)}`,
    c.role && `- **Role:** ${c.role}`,
    c.timeline && `- **Timeline:** ${c.timeline}`,
    c.team && `- **Team:** ${c.team}`,
    c.tools.length && `- **Tools:** ${c.tools.join(", ")}`,
    c.tags.length && `- **Tags:** ${c.tags.join(", ")}`,
    `- **Designer:** ${site.name}`,
    `- **URL:** ${absoluteUrl(`/projects/${c.slug}`)}`,
  ].filter(Boolean);
  return `# ${c.title}\n\n> ${c.catchphrase}\n\n${meta.join("\n")}\n\n${c.raw}\n`;
}

function resumeMarkdown() {
  const r = getResume();
  return [
    `## Resume`,
    r.summary,
    `### Experience`,
    ...r.experience.map(
      (j) => `**${j.role}, ${j.company}** (${j.start}–${j.end})\n${j.highlights.map((h) => `- ${h}`).join("\n")}`,
    ),
    `### Skills`,
    ...r.skills.map((s) => `- **${s.group}:** ${s.items.join(", ")}`),
    `### Education`,
    ...r.education.map((e) => `- ${e.qualification}, ${e.school} (${e.year})`),
  ].join("\n\n");
}

/** /llms.txt: a short map of the site for AI tools (llmstxt.org). */
export function llmsTxt() {
  const site = getSite();
  const studies = getCaseStudies();
  const posts = getPosts();
  return `# ${site.name}

> ${site.description}

- Role: ${site.role}${site.location ? `\n- Location: ${site.location}` : ""}${site.availability ? `\n- Availability: ${site.availability}` : ""}
- Contact: ${site.email}
- Website: ${site.url}

## Case studies

${studies.map((c) => `- [${c.title}](${absoluteUrl(`/projects/${c.slug}.md`)}): ${c.summary}`).join("\n")}

## Project design systems

${studies.filter(c => c.theme).map(c => `- [${c.company ?? c.title}](${absoluteUrl(`/projects/${c.slug}/design-system`)}): independent typography, palette, interface imagery and product references`).join("\n")}

## Writing

${posts.map((p) => `- [${p.title}](${p.url ?? absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}

## About

- [Resume](${absoluteUrl("/resume")}): experience, skills and education
- [Design system](${absoluteUrl("/design-system")}): tokens, voice and imagery
- [Everything in one file](${absoluteUrl("/llms-full.txt")})
`;
}

/** /llms-full.txt: every case study and the resume in one Markdown file. */
export function llmsFullTxt() {
  const site = getSite();
  const voice = getVoice();
  return [
    `# ${site.name}: ${site.role}`,
    `> ${site.description}`,
    `${site.intro}\n\nContact: ${site.email} · ${site.url}`,
    voice.traits.length ? `Voice: ${voice.traits.map((t) => t.name).join(", ")}` : "",
    resumeMarkdown(),
    `## Case studies`,
    ...getCaseStudies().map((c) => caseStudyMarkdown(c).replace(/^# /, "### ").replace(/\n## /g, "\n#### ")),
  ]
    .filter(Boolean)
    .join("\n\n");
}
