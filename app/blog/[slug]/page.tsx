import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ArrowLeft } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { Media } from "@/components/Media";
import { formatDate, getPost, getPosts, getSite } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts()
    .filter((p) => !p.url)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const site = getSite();

  return (
    <article className="py-16 md:py-24">
      <Container size="prose">
        <Link href="/blog" className="enter inline-flex items-center gap-1.5 text-small text-fg-muted hover:text-fg">
          <ArrowLeft width={16} height={16} /> Writing
        </Link>
        <header className="mt-10">
          <p className="enter text-small text-fg-subtle">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <h1 className="enter mt-4 text-display font-semibold text-balance" style={{ "--i": 1 } as React.CSSProperties}>
            {post.title}
          </h1>
          <p className="enter mt-6 text-lead text-fg-muted" style={{ "--i": 2 } as React.CSSProperties}>
            {post.excerpt}
          </p>
        </header>
      </Container>
      {(post.cover.src || post.cover.prompt) && (
        <Container className="enter mt-14" >
          <Media img={post.cover} ratio="2/1" sizes="100vw" priority />
        </Container>
      )}
      <Container size="prose" className="mt-14">
        <Markdown>{post.body}</Markdown>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: absoluteUrl(`/blog/${post.slug}`),
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
    </article>
  );
}
