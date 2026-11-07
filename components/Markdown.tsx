import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";

/** Renders Markdown with the site's reading styles. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose prose-site max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
