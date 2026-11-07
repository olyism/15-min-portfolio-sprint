import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight, Sparkle } from "@/components/icons";
import { Markdown } from "@/components/Markdown";
import { Placeholder } from "@/components/Media";
import { Tag } from "@/components/Tag";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getMoodboard, getVoice } from "@/lib/content";
import { getTokenGroups, type Token } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Design system",
  description: "The tokens, components, voice and imagery behind this site.",
};

const SECTIONS = ["Colour", "Typography", "Spacing", "Radius", "Elevation", "Motion", "Components", "Voice", "Imagery"];

export default function DesignSystemPage() {
  const groups = Object.fromEntries(getTokenGroups().map((g) => [g.name, g.tokens]));
  const voice = getVoice();
  const moodboard = getMoodboard();

  return (
    <>
      <Container className="pt-20 pb-12 md:pt-28">
        <p className="enter text-caption font-medium tracking-wide text-fg-subtle uppercase">Design system</p>
        <h1 className="enter mt-6 max-w-4xl text-display font-semibold text-balance" style={{ "--i": 1 } as React.CSSProperties}>
          The building blocks of this site.
        </h1>
        <p className="enter mt-6 max-w-2xl text-lead text-fg-muted" style={{ "--i": 2 } as React.CSSProperties}>
          Every value on this page is read from <Code>app/tokens.css</Code>. Change it there, or ask your AI agent to, and the
          whole site updates. Words and imagery come from <Code>content/voice.md</Code>.
        </p>
        <div className="enter mt-8 flex items-center gap-3 text-small text-fg-muted" style={{ "--i": 3 } as React.CSSProperties}>
          Preview in <ThemeToggle />
        </div>
      </Container>

      <nav
        aria-label="Design system sections"
        className="no-print sticky top-16 z-40 border-y border-border-subtle bg-bg/80 backdrop-blur-xl"
      >
        <Container>
          <ul className="-mx-2 flex gap-1 overflow-x-auto py-2 text-small [scrollbar-width:none]">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a href={`#${s.toLowerCase()}`} className="block rounded-pill px-3 py-1.5 whitespace-nowrap text-fg-muted hover:bg-bg-subtle hover:text-fg">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="space-y-32 py-20 md:py-28">
        {/* Colour */}
        <Block id="colour" title="Colour" lead="Each colour has a light and a dark value. Utility classes use the name, e.g. bg-bg-subtle or text-fg-muted.">
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(groups.Colour ?? [])
              .filter((t) => t.light)
              .map((t) => (
                <Swatch key={t.name} token={t} />
              ))}
          </div>
        </Block>

        {/* Typography */}
        <Block id="typography" title="Typography" lead="A fluid scale: big sizes shrink smoothly on small screens. Apply with text-hero, text-display, text-title…">
          <div className="divide-y divide-border-subtle border-y border-border-subtle">
            {(groups.Typography ?? [])
              .filter((t) => t.name.startsWith("text-"))
              .map((t) => (
                <div key={t.name} className="grid grid-cols-1 [&>*]:min-w-0 gap-3 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                  <TokenLabel token={t} cls={t.name} />
                  <p
                    className="truncate font-semibold"
                    style={{
                      fontSize: `var(--${t.name})`,
                      lineHeight: `var(--${t.name}--line-height, 1.5)`,
                      letterSpacing: `var(--${t.name}--letter-spacing, 0)`,
                      fontWeight: ["text-body", "text-small", "text-caption", "text-lead"].includes(t.name) ? 400 : 600,
                    }}
                  >
                    Design that ships
                  </p>
                </div>
              ))}
          </div>
          <div className="mt-8 grid grid-cols-1 [&>*]:min-w-0 gap-4 md:grid-cols-2">
            {(groups.Typography ?? [])
              .filter((t) => t.name.startsWith("font-"))
              .map((t) => (
                <div key={t.name} className="rounded-lg bg-bg-subtle p-6">
                  <TokenLabel token={t} cls={t.name} />
                  <p className="mt-4 text-title" style={{ fontFamily: `var(--${t.name})` }}>
                    Aa Bb Cc 0123
                  </p>
                </div>
              ))}
          </div>
        </Block>

        {/* Spacing */}
        <Block id="spacing" title="Spacing" lead="Everything is built on a 4px base unit. p-4 is 16px, gap-8 is 32px.">
          <div className="space-y-3">
            {[1, 2, 3, 4, 6, 8, 12, 16, 24, 32].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <code className="w-14 shrink-0 font-mono text-caption text-fg-subtle">{n}</code>
                <div className="h-3 rounded-sm bg-accent" style={{ width: `calc(var(--spacing) * ${n})` }} />
                <span className="text-caption text-fg-subtle">{n * 4}px</span>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-4 md:grid-cols-2">
            {(groups.Spacing ?? [])
              .filter((t) => t.name !== "spacing")
              .map((t) => (
                <div key={t.name} className="rounded-lg bg-bg-subtle p-6">
                  <TokenLabel token={t} />
                </div>
              ))}
          </div>
        </Block>

        {/* Radius */}
        <Block id="radius" title="Radius" lead="Rounder corners feel softer and friendlier. Sharper ones feel precise and technical.">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {(groups.Radius ?? []).map((t) => (
              <div key={t.name}>
                <div className="aspect-square border border-border bg-bg-subtle" style={{ borderRadius: `var(--${t.name})` }} />
                <div className="mt-3">
                  <TokenLabel token={t} cls={`rounded-${t.name.replace("radius-", "")}`} />
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* Elevation */}
        <Block id="elevation" title="Elevation" lead="Soft shadows, used sparingly. Cards lift on hover.">
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-8 md:grid-cols-2">
            {(groups.Elevation ?? []).map((t) => (
              <div key={t.name} className="rounded-card bg-bg-elevated p-8" style={{ boxShadow: `var(--${t.name})` }}>
                <TokenLabel token={t} cls={t.name} />
              </div>
            ))}
          </div>
        </Block>

        {/* Motion */}
        <Block id="motion" title="Motion" lead="Quick and calm. Hover over a row to see each curve. Animations turn off when the visitor prefers reduced motion.">
          <div className="space-y-3">
            {(groups.Motion ?? [])
              .filter((t) => t.name.startsWith("ease-"))
              .map((t) => (
                <div key={t.name} className="group rounded-lg bg-bg-subtle p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <TokenLabel token={t} />
                  </div>
                  <div className="relative mt-4 h-8">
                    <div
                      className="absolute top-0 left-0 size-8 rounded-pill bg-accent transition-[left] group-hover:left-[calc(100%-2rem)]"
                      style={{ transitionTimingFunction: `var(--${t.name})`, transitionDuration: "var(--duration-slow)" }}
                    />
                  </div>
                </div>
              ))}
            <div className="grid grid-cols-1 [&>*]:min-w-0 gap-3 md:grid-cols-3">
              {(groups.Motion ?? [])
                .filter((t) => t.name.startsWith("duration-"))
                .map((t) => (
                  <div key={t.name} className="rounded-lg bg-bg-subtle p-5">
                    <TokenLabel token={t} />
                  </div>
                ))}
            </div>
          </div>
        </Block>

        {/* Components */}
        <Block id="components" title="Components" lead="A small set in components/. Build new pages by combining these.">
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-2">
            <Demo name="Button" file="components/Button.tsx">
              <div className="flex flex-wrap gap-3">
                <Button href="#components">
                  Primary <ArrowRight />
                </Button>
                <Button href="#components" variant="secondary">
                  Secondary
                </Button>
                <Button href="#components" variant="ghost">
                  Ghost
                </Button>
              </div>
            </Demo>
            <Demo name="Tag" file="components/Tag.tsx">
              <div className="flex flex-wrap gap-2">
                <Tag>Product design</Tag>
                <Tag>Design systems</Tag>
                <Tag>AI prototyping</Tag>
              </div>
            </Demo>
            <Demo name="ThemeToggle" file="components/ThemeToggle.tsx">
              <ThemeToggle />
            </Demo>
            <Demo name="Link" file="app/globals.css">
              <p className="text-fg-muted">
                Body text with an <a href="#components" className="text-accent underline underline-offset-3">inline link</a> and{" "}
                <strong className="text-fg">bold emphasis</strong>.
              </p>
            </Demo>
            <Demo name="Placeholder" file="components/Media.tsx" className="md:col-span-2">
              <Placeholder ratio="21/9" prompt="Your image prompt appears here. Generate the image, add it to public/images/ and set src." />
            </Demo>
          </div>
        </Block>

        {/* Voice */}
        <Block id="voice" title="Voice & tone" lead="How the words should sound. AI writing skills read this before drafting anything.">
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-4 md:grid-cols-3">
            {voice.traits.map((t) => (
              <div key={t.name} className="rounded-card bg-bg-subtle p-8">
                <p className="text-heading font-semibold">{t.name}</p>
                <p className="mt-2 text-fg-muted">{t.description}</p>
              </div>
            ))}
          </div>
          {voice.sliders.length > 0 && (
            <div className="mt-10 space-y-6 rounded-card border border-border-subtle p-8">
              {voice.sliders.map((s) => (
                <div key={s.left}>
                  <div className="flex justify-between text-small">
                    <span className={s.value < 0.5 ? "font-semibold" : "text-fg-muted"}>{s.left}</span>
                    <span className={s.value >= 0.5 ? "font-semibold" : "text-fg-muted"}>{s.right}</span>
                  </div>
                  <div className="relative mt-2 h-1.5 rounded-pill bg-bg-subtle" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(s.value * 100)} aria-label={`${s.left} to ${s.right}`}>
                    <div className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-fg shadow-card" style={{ left: `${s.value * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Markdown className="mt-12 max-w-reading">{voice.body}</Markdown>
        </Block>

        {/* Imagery */}
        <Block id="imagery" title="Imagery" lead="The look every image should share. This style is added to every image prompt on the site.">
          {voice.imageStyle && (
            <blockquote className="flex gap-4 rounded-card bg-accent-subtle p-8 text-lead">
              <Sparkle className="mt-1 shrink-0 text-accent" />
              <span>{voice.imageStyle}</span>
            </blockquote>
          )}
          <h3 className="mt-14 mb-6 text-heading font-semibold">Mood board</h3>
          {moodboard.length > 0 ? (
            <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {moodboard.map((src) => (
                <Image key={src} src={src} alt="" width={800} height={600} className="h-auto w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              <p className="mb-6 text-fg-muted">
                Drop screenshots, references and photos into <Code>public/moodboard/</Code> and they&apos;ll show here.
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {["4/5", "1/1", "4/3", "1/1", "4/3", "4/5"].map((r, i) => (
                  <Placeholder key={i} ratio={r} label="Mood board" showPrompt={false} />
                ))}
              </div>
            </>
          )}
        </Block>
      </Container>
    </>
  );
}

function Block({ id, title, lead, children }: { id: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="text-title font-semibold">{title}</h2>
      <p className="mt-3 mb-10 max-w-2xl text-fg-muted">{lead}</p>
      {children}
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-sm bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg">{children}</code>;
}

function TokenLabel({ token, cls }: { token: Token; cls?: string }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-caption font-medium text-fg">--{token.name}</p>
      {token.note && <p className="mt-1 text-caption text-fg-muted">{token.note}</p>}
      <p className="mt-1 truncate font-mono text-caption text-fg-subtle" title={token.value}>
        {cls ? `${cls} · ` : ""}
        {token.value}
      </p>
    </div>
  );
}

function Swatch({ token }: { token: Token }) {
  const cls = token.name.replace("color-", "");
  return (
    <div className="overflow-hidden rounded-lg ring-1 ring-border-subtle">
      <div className="grid h-24 grid-cols-2">
        <div className="flex items-end p-3" style={{ background: token.light }}>
          <span className="rounded-sm bg-white/80 px-1.5 py-0.5 font-mono text-[11px] text-black">{token.light}</span>
        </div>
        <div className="flex items-end p-3" style={{ background: token.dark }}>
          <span className="rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">{token.dark}</span>
        </div>
      </div>
      <div className="bg-bg-elevated p-4">
        <p className="font-mono text-caption font-medium">{cls}</p>
        {token.note && <p className="mt-0.5 text-caption text-fg-muted">{token.note}</p>}
      </div>
    </div>
  );
}

function Demo({ name, file, children, className }: { name: string; file: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-border-subtle p-6 md:p-8 ${className ?? ""}`}>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semibold">{name}</p>
        <code className="min-w-0 font-mono text-caption break-all text-fg-subtle">{file}</code>
      </div>
      {children}
    </div>
  );
}
