import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { caseStudyMarkdown } from "@/lib/llms";

// Served at /projects/<slug>.md (see the rewrite in next.config.mjs).
export const dynamic = "force-static";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) return new Response("Not found", { status: 404 });
  return new Response(caseStudyMarkdown(study), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
