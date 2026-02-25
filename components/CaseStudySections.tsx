import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CaseStudySection } from "@/lib/markdown";

export default function CaseStudySections({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            {section.title}
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {section.body}
            </ReactMarkdown>
          </div>
        </section>
      ))}
    </div>
  );
}
