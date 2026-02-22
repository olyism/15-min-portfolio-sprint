import type { CaseStudySection } from "@/lib/markdown";

function markdownToHtml(text: string): string {
  return text
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3 class="text-lg font-semibold mt-4 mb-2">${block.slice(4)}</h3>`;
      }
      if (block.startsWith("**") && block.endsWith("**")) {
        return `<p class="font-medium">${block.slice(2, -2)}</p>`;
      }
      return `<p class="mb-2">${block.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

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
          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(section.body),
            }}
          />
        </section>
      ))}
    </div>
  );
}
