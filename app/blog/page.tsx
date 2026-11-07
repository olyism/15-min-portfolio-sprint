import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PostList } from "@/components/PostCard";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Resources", description: "Notes on design, code and AI." };

export default function BlogPage() {
  return (
    <Container className="py-20 md:py-28">
      <header className="enter mb-16 max-w-3xl">
        <h1 className="text-display font-semibold">Resources</h1>
        <p className="mt-5 text-lead text-fg-muted">Notes on design, code and working with AI.</p>
      </header>
      <PostList posts={getPosts()} />
    </Container>
  );
}
