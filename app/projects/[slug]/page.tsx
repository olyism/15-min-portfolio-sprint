import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/markdown";
import CaseStudySections from "@/components/CaseStudySections";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const { frontmatter, sections } = caseStudy;

  return (
    <article className="pb-16">
      <div className="relative aspect-[21/9] w-full bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={frontmatter.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          {frontmatter.projectName}
        </h1>
        <p className="mt-2 text-xl text-neutral-600 dark:text-neutral-400">
          {frontmatter.catchphrase}
        </p>
        <div className="mt-12">
          <CaseStudySections sections={sections} />
        </div>
        {frontmatter.gallery && frontmatter.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {frontmatter.gallery.map((src, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        <p className="mt-12">
          <Link
            href="/projects"
            className="text-neutral-600 dark:text-neutral-400 hover:underline"
          >
            ← Back to projects
          </Link>
        </p>
      </div>
    </article>
  );
}
