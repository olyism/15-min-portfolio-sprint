import { ProjectIdentityNav } from "@/components/ProjectIdentityNav";
import { getProjectWorld, type ProjectImage } from "@/lib/project-worlds";
import Image from "next/image";
import showcase from "@/content/showcase.json";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ProjectPlayground } from "@/components/ProjectPlayground";
import { getProjectDemo } from "@/lib/project-demos";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ArrowLeft, ArrowRight, Sparkle } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { Media } from "@/components/Media";
import { TagList } from "@/components/Tag";
import { cn } from "@/lib/cn";
import { getCaseStudies, getCaseStudy, getSite, type CaseStudySection } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.fictional ? "Fictional teaching example. " : ""}${c.summary}`,
    alternates: { types: { "text/markdown": `/projects/${c.slug}.md` } },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const all = getCaseStudies();
  const next = all[(all.findIndex((c) => c.slug === slug) + 1) % all.length];
  const site = getSite();
  const demo = getProjectDemo(study.theme);
  const world = getProjectWorld(study.slug);
  const meta = [
    ["Role", study.role],
    ["Timeline", study.timeline],
    ["Team", study.team],
    ["Tools", study.tools.join(", ")],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article data-world={demo ? study.theme : undefined} className={demo ? "case-world" : undefined}>
      <Container className="case-opening pt-8 md:pt-10">
        {world && <ProjectIdentityNav slug={study.slug} />}
        <div className="enter flex items-center justify-between gap-4 text-small">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
            <ArrowLeft width={16} height={16} /> Work
          </Link>
          <a href={`/projects/${study.slug}.md`} className="no-print text-fg-subtle hover:text-fg" title="A plain-text copy for AI tools">
            View as Markdown
          </a>
        </div>
        <header className="case-intro mt-10 max-w-4xl">
          <TagList tags={study.tags} className="enter" />
          <h1 className="enter mt-6 text-display font-semibold text-balance" style={{ "--i": 1 } as React.CSSProperties}>
            {study.title}
          </h1>
          <p className="enter mt-6 text-lead text-fg-muted text-pretty" style={{ "--i": 2 } as React.CSSProperties}>
            {study.catchphrase}
          </p>
        </header>
        {study.fictional && <p className="case-disclosure mt-8">{showcase.caseNotice}</p>}
        {meta.length > 0 && (
          <dl
            className="enter mt-12 grid grid-cols-2 gap-6 border-t border-border-subtle pt-8 md:grid-cols-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-caption font-medium tracking-wide text-fg-subtle uppercase">{k}</dt>
                <dd className="mt-1.5 text-small">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <div id="project-preview" className="case-artwork enter mt-14 scroll-mt-24" style={{ "--i": 4 } as React.CSSProperties}>
          {demo && study.theme ? <ProjectVisual theme={study.theme} priority /> : <Media img={study.cover} ratio="16/9" sizes="100vw" priority />}
        </div>
        {world && <div className="artwork-caption"><p>{world.hero.caption}</p><a href={world.hero.src} target="_blank" rel="noopener noreferrer">View full-resolution image</a></div>}
      </Container>

      {demo && study.theme && <Container className="pt-10">
        <nav className="case-jump" aria-label="Explore this case study">
          <a href="#try-it">{study.theme === "relay" ? "Play the investigation" : "Interactive exercise"}</a>
          <Link href={`/projects/${study.slug}/design-system`}>Explore the design system</Link>
          {study.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}
        </nav>
        <div className="case-learning mt-10">
          <h2 className="text-heading font-medium">{showcase.learningTitle}</h2>
          <ul>{study.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          <p>{study.lesson}</p>
        </div>
        <div className="mt-10"><ProjectPlayground theme={study.theme} demo={demo} /></div>
      </Container>}

      <Container className="py-section">
        <div className="grid gap-12 lg:grid-cols-[12rem_1fr] lg:gap-20">
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-border-subtle text-small">
              {study.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-fg-muted hover:border-fg hover:text-fg">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-reading space-y-24">
            {study.sections.map((s) => (
              <CaseSection key={s.id} section={s} image={world?.sectionImages?.[s.id]} />
            ))}
          </div>
        </div>
      </Container>

      {study.gallery.length > 0 && (
        <Container className="pb-section">
          <div className="grid gap-8 md:grid-cols-2">
            {study.gallery.map((img, i) => (
              <figure key={i} className={cn("reveal", study.gallery.length % 2 === 1 && i === 0 && "md:col-span-2")}>
                <Media img={img} ratio={study.gallery.length % 2 === 1 && i === 0 ? "16/9" : "4/3"} />
                {img.caption && <figcaption className="mt-3 text-small text-fg-subtle">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Container>
      )}

      {next && next.slug !== slug && (
        <Container className="pb-section">
          <Link href={`/projects/${next.slug}`} className="group reveal block border-t border-border-subtle pt-10">
            <p className="text-caption font-medium tracking-wide text-fg-subtle uppercase">Next project</p>
            <p className="mt-3 flex items-center gap-3 text-display font-semibold">
              {next.title}
              <ArrowRight width={36} height={36} className="transition-transform duration-(--duration-base) group-hover:translate-x-2" />
            </p>
            <p className="mt-3 max-w-2xl text-fg-muted">{next.summary}</p>
          </Link>
        </Container>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          headline: study.catchphrase,
          abstract: `${study.fictional ? "Fictional teaching example. " : ""}${study.summary}`,
          ...(study.fictional ? { genre: "Fictional portfolio teaching example" } : {}),
          url: absoluteUrl(`/projects/${study.slug}`),
          creator: { "@type": "Person", name: site.name, jobTitle: study.role ?? site.role },
          keywords: [...study.tags, ...study.tools].join(", "),
          ...(study.year ? { dateCreated: String(study.year) } : {}),
        }}
      />
    </article>
  );
}

function CaseSection({ section, image }: { section: CaseStudySection; image?: ProjectImage }) {
  const ai = section.id === "how-i-used-ai";
  return (
    <section
      id={section.id}
      className={cn("case-section reveal scroll-mt-28", ai && "rounded-card bg-bg-subtle p-8 ring-1 ring-border-subtle md:p-10")}
    >
      <h2 className="flex items-center gap-2 text-caption font-semibold tracking-wide text-accent uppercase">
        {ai && <Sparkle width={16} height={16} />}
        {section.title}
      </h2>
      {section.tldr && <p className="mt-4 text-title font-semibold text-balance">{section.tldr}</p>}
      {image && <figure className="case-section-image"><a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${section.title}`}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 768px) 90vw, 672px" /></a><figcaption>{image.caption}</figcaption></figure>}
      {section.body && <Markdown className="mt-8">{section.body}</Markdown>}
    </section>
  );
}
