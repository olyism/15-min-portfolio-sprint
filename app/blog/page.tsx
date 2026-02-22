import { getBlog } from "@/lib/content";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const entries = getBlog();
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Blog
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-10">
          Articles and writing. Links may point to external sites.
        </p>
        <BlogList entries={entries} />
      </div>
    </div>
  );
}
