import type { Metadata } from "next";
import { CopyButton } from "@/components/ActionButtons";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowUpRight } from "@/components/icons";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Get in touch." };

export default function ContactPage() {
  const site = getSite();
  return (
    <Container className="py-20 md:py-32">
      <p className="enter text-caption font-medium tracking-wide text-fg-subtle uppercase">Contact</p>
      <h1 className="enter mt-6 max-w-4xl text-hero font-semibold text-balance" style={{ "--i": 1 } as React.CSSProperties}>
        Let&apos;s talk about what you&apos;re building.
      </h1>
      <p className="enter mt-8 max-w-xl text-lead text-fg-muted" style={{ "--i": 2 } as React.CSSProperties}>
        Hiring, a project or just a question: email is best. I reply within two working days.
        {site.availability && <> {site.availability}.</>}
      </p>

      <div className="enter mt-14 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ "--i": 3 } as React.CSSProperties}>
        <a href={`mailto:${site.email}`} className="text-title font-semibold break-all text-accent hover:underline">
          {site.email}
        </a>
        <CopyButton text={site.email} label="Copy email" className="sm:ml-4" />
      </div>
      {site.bookingUrl && (
        <div className="mt-6">
          <Button href={site.bookingUrl}>Book a call</Button>
        </div>
      )}

      <ul className="enter mt-20 grid gap-px overflow-hidden rounded-lg bg-border-subtle sm:grid-cols-3" style={{ "--i": 4 } as React.CSSProperties}>
        {site.socials.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-bg px-6 py-6 transition-colors hover:bg-bg-subtle"
            >
              <span className="font-medium">{s.label}</span>
              <ArrowUpRight className="text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
