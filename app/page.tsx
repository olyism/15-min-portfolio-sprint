import { Button } from "@/components/Button";
import { Container, Section, SectionHeader } from "@/components/Container";
import { ArrowRight } from "@/components/icons";
import { PostList } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { getCaseStudies, getPosts, getSite } from "@/lib/content";

export default function HomePage() {
  const site = getSite();
  const projects = getCaseStudies();
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured.length ? featured : projects;
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Container className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="enter flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-fg-muted">
          {site.availability && (
            <span className="inline-flex items-center gap-2 rounded-pill bg-bg-subtle px-3 py-1 font-medium text-fg">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-positive" />
              </span>
              {site.availability}
            </span>
          )}
          <span>{site.location}</span>
        </div>
        <h1 className="enter mt-8 max-w-5xl text-hero font-semibold text-balance" style={{ "--i": 1 } as React.CSSProperties}>
          {site.headline}
        </h1>
        <p className="enter mt-8 max-w-2xl text-lead text-fg-muted text-pretty" style={{ "--i": 2 } as React.CSSProperties}>
          {site.intro}
        </p>
        <div className="enter mt-10 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
          <Button href="/projects">
            View work <ArrowRight />
          </Button>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </Container>

      {/* Featured work */}
      {lead && (
        <Container className="pb-section">
          <h2 className="sr-only">Selected work</h2>
          <div className="enter" style={{ "--i": 4 } as React.CSSProperties}>
            <ProjectCard project={lead} size="large" />
          </div>
          {rest.length > 0 && (
            <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {rest.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
          <div className="mt-16 flex justify-center">
            <Button href="/projects" variant="secondary">
              All projects <ArrowRight />
            </Button>
          </div>
        </Container>
      )}

      {/* Worked with */}
      {site.workedWith.length > 0 && (
        <section className="border-y border-border-subtle bg-bg-subtle py-16">
          <Container>
            <p className="text-center text-caption font-medium tracking-wide text-fg-subtle uppercase">
              Teams I&apos;ve worked with
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {site.workedWith.map((name) => (
                <li key={name} className="text-heading font-semibold tracking-tight text-fg-subtle">
                  {name}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Writing"
              title="Notes on design, code and AI"
              action={
                <Button href="/blog" variant="ghost">
                  All writing <ArrowRight />
                </Button>
              }
            />
            <PostList posts={posts} />
          </Container>
        </Section>
      )}

      <ContactBand email={site.email} />
    </>
  );
}

function ContactBand({ email }: { email: string }) {
  return (
    <Container className="pb-section">
      <div className="reveal rounded-card bg-fg px-8 py-16 text-center text-bg md:px-16 md:py-24">
        <h2 className="mx-auto max-w-3xl text-display font-semibold text-balance">Have a fuzzy problem? Let&apos;s make it clear.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lead opacity-70">
          I&apos;m taking on a small number of projects. Tell me what you&apos;re working on.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex h-11 items-center gap-2 rounded-pill bg-bg px-5 text-small font-medium text-fg transition-opacity hover:opacity-85"
          >
            {email}
          </a>
        </div>
      </div>
    </Container>
  );
}
