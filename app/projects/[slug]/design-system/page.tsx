import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ProjectIdentityNav } from "@/components/ProjectIdentityNav";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { getTokenGroups } from "@/lib/tokens";
import { getProjectWorld, PROJECT_COLOUR_LABELS, PROJECT_COLOUR_ROLES } from "@/lib/project-worlds";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getCaseStudies().filter(study => getProjectWorld(study.slug)).map(study => ({ slug: study.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const world = getProjectWorld((await params).slug);
  return world ? { title: `${world.name} design system`, description: world.thesis } : {};
}
export default async function ProjectDesignSystem({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const world = getProjectWorld(slug);
  if (!study || !world) notFound();
  const tokens = getTokenGroups().flatMap(group => group.tokens);
  const colours = PROJECT_COLOUR_ROLES.flatMap(role => {
    const token = tokens.find(t => t.name === `color-${world.palettePrefix}-${role}`);
    return token?.light && token.dark ? [{ role, token }] : [];
  });
  return <article className="world-system case-world" data-world={slug}>
    <Container className="pt-8 md:pt-10">
      <ProjectIdentityNav slug={slug} active="system" />
      <Link href={`/projects/${slug}`} className="text-small text-fg-muted underline underline-offset-4">Back to the case study</Link>
      <header className="world-system-intro">
        <h1>{world.name}, by design.</h1>
        <p>{world.thesis}</p>
        <p className="text-small">An independent project identity: {world.systemName}.</p>
      </header>
      <nav className="world-system-index" aria-label="Design system sections">
        <a href="#typography">Typography</a><a href="#colour">Colour</a><a href="#foundations">Foundations</a><a href="#interface">Product imagery</a><a href="#principles">Principles</a><a href="#references">References</a>
      </nav>
      <section className="world-system-section" id="typography">
        <h2>A voice you can recognise.</h2>
        <p>{world.voice}</p>
        <div className="world-type-specimen">
          <p>{world.sample}</p>
          <dl><div><dt>Display</dt><dd>{world.displayFamily}</dd></div><div><dt>Utility and reading</dt><dd>{world.utilityFamily}</dd></div><div><dt>Character set</dt><dd>Aa Bb Cc · 0123456789</dd></div><div><dt>Source</dt><dd>Self-hosted, open-licensed fonts</dd></div></dl>
        </div>
      </section>
      <section className="world-system-section" id="colour">
        <h2>A palette with a job to do.</h2>
        <p>Six roles, defined in the central token file and scoped to {world.name}. Each pair shows the light-preference value on the left and the dark-preference value on the right. {slug === "relay" || slug === "afterhours" ? "This identity deliberately keeps a dark ground in both settings." : "The reading surface adapts to your theme preference."}</p>
        <div className="world-colours">{colours.map(({ role, token }) => <div key={role} className="world-colour">
          <div className="world-colour-pair" role="img" aria-label={`${PROJECT_COLOUR_LABELS[role]}: light preference ${token.light}, dark preference ${token.dark}`}><span style={{ backgroundColor: token.light }} /><span style={{ backgroundColor: token.dark }} /></div>
          <h3>{PROJECT_COLOUR_LABELS[role]}</h3><code>--{token.name}</code>
          <div className="world-colour-values"><code>{token.light}</code><code>{token.dark}</code></div>
        </div>)}</div>
      </section>
      <section className="world-system-section" id="foundations">
        <h2>The underlying rhythm.</h2>
        <div className="world-foundations"><div><h3>Spacing</h3><ul>{world.spacing.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Shape and hierarchy</h3><p>{world.shape}.</p><p className="mt-4">Headings use the project’s display face. Labels stay compact, body copy stays within a comfortable reading measure, and focus uses the action colour.</p><p className="mt-4">Controls use native semantics. Motion is reduced when the visitor requests it; long-form reading stays stationary.</p></div></div>
      </section>
      <section className="world-system-section" id="interface">
        <h2>The system, in the product.</h2>
        <p>{world.description}</p>
        <ProjectVisual theme={slug} />
        <div className="artwork-caption"><p>AI-generated interface image; the depicted controls are part of the artwork.</p><a href={world.hero.src} target="_blank" rel="noopener noreferrer">Open full-resolution image</a></div>
        <details className="system-artifact"><summary>Image description and provenance</summary><p className="mt-4">{world.description} The interface was generated for this example project, informed by the product references below. It is not a screenshot of those products or evidence of a launched service. The case study contains a separate local interaction exercise.</p></details>
      </section>
      <section className="world-system-section" id="principles">
        <h2>Decisions that hold it together.</h2>
        <ul className="world-principles">{world.principles.map((principle, index) => <li key={principle}><strong>{principle}</strong><p>{world.principleDetails[index]}</p></li>)}</ul>
      </section>
      <section className="world-system-section" id="references">
        <h2>Grounded in real products.</h2>
        <p>These products informed the patterns and art direction. The {world.name} identity and generated interface are original examples, with no affiliation implied.</p>
        <ul className="world-references">{world.references.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.name}</a><p>{reference.note}</p></li>)}</ul>
      </section>
      <div className="py-12"><Link href={`/projects/${slug}`} className="text-lead underline underline-offset-4">Return to {world.name}</Link></div>
    </Container>
  </article>;
}
