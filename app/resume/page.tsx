import type { Metadata } from "next";
import { PrintButton } from "@/components/ActionButtons";
import { Container } from "@/components/Container";
import { getResume, getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Resume", description: "Experience, skills and education." };

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-border-subtle pb-2 text-caption font-semibold tracking-wide text-fg-subtle uppercase">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const site = getSite();
  const r = getResume();
  const host = site.url.replace(/^https?:\/\//, "");

  return (
    <Container className="py-16 md:py-24 print:py-0">
      <div className="no-print enter mb-10 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-bg-subtle px-5 py-4">
        <p className="text-small text-fg-muted">This page is set up for printing. Choose &ldquo;Save as PDF&rdquo; in the print dialog.</p>
        <PrintButton />
      </div>

      <div className="print-plain rounded-card bg-bg-elevated p-8 shadow-card ring-1 ring-border-subtle md:p-14">
        <header className="avoid-break flex flex-col gap-6 border-b border-border-subtle pb-8 md:flex-row md:items-end md:justify-between print:flex-row print:items-end print:justify-between">
          <div>
            <h1 className="text-display font-semibold print:text-[2.6rem]">{site.name}</h1>
            <p className="mt-2 text-lead text-fg-muted">{site.role}</p>
          </div>
          <ul className="space-y-1 text-small text-fg-muted md:text-right print:text-right">
            {site.location && <li>{site.location}</li>}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
            </li>
            <li>
              <a href={site.url} className="hover:text-fg">{host}</a>
            </li>
          </ul>
        </header>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_15rem] md:gap-16 print:grid-cols-[1fr_13rem] print:gap-10">
          <div className="space-y-10">
            <section>
              <Heading>Profile</Heading>
              <p className="text-fg-muted text-pretty">{r.summary}</p>
            </section>
            <section>
              <Heading>Experience</Heading>
              <ol className="space-y-8">
                {r.experience.map((job) => (
                  <li key={job.company + job.start} className="avoid-break">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-semibold">
                        {job.role} <span className="font-normal text-fg-muted">· {job.company}</span>
                      </h3>
                      <p className="text-small text-fg-subtle tabular-nums">
                        {job.start} – {job.end}
                      </p>
                    </div>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-small text-fg-muted marker:text-fg-subtle">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-10">
            <section>
              <Heading>Skills</Heading>
              <div className="space-y-5">
                {r.skills.map((g) => (
                  <div key={g.group}>
                    <h3 className="text-small font-semibold">{g.group}</h3>
                    <p className="mt-1 text-small text-fg-muted">{g.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <Heading>Education</Heading>
              {r.education.map((e) => (
                <div key={e.school} className="mb-4 text-small">
                  <p className="font-semibold">{e.qualification}</p>
                  <p className="text-fg-muted">
                    {e.school}, {e.year}
                  </p>
                </div>
              ))}
            </section>
            {r.awards && r.awards.length > 0 && (
              <section>
                <Heading>Awards</Heading>
                {r.awards.map((a) => (
                  <div key={a.title} className="mb-4 text-small">
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-fg-muted">
                      {[a.detail, a.year].filter(Boolean).join(", ")}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </aside>
        </div>
      </div>
    </Container>
  );
}
