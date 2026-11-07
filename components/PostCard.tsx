import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";
import { ArrowUpRight } from "./icons";

/** One row in a list of posts. External posts open in a new tab. */
export function PostRow({ post }: { post: Post }) {
  const external = Boolean(post.url);
  const inner = (
    <>
      <p className="text-caption text-fg-subtle md:w-44 md:shrink-0 md:pt-1.5">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {!external && post.readingMinutes > 0 && <span> · {post.readingMinutes} min</span>}
      </p>
      <div className="min-w-0 flex-1">
        <h3 className="text-heading font-semibold group-hover:text-accent">
          {post.title}
          {external && <ArrowUpRight className="ml-1 inline-block align-[-2px] text-fg-subtle" />}
        </h3>
        <p className="mt-1.5 text-fg-muted">{post.excerpt}</p>
      </div>
    </>
  );
  const cls = "group reveal flex flex-col gap-2 border-t border-border-subtle py-8 md:flex-row md:gap-8";
  return external ? (
    <a href={post.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={`/blog/${post.slug}`} className={cls}>
      {inner}
    </Link>
  );
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="border-b border-border-subtle">
      {posts.map((p) => (
        <PostRow key={p.slug} post={p} />
      ))}
    </div>
  );
}
