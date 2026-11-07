import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects", "/blog", "/resume", "/design-system", "/contact"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p) })),
    ...getCaseStudies().flatMap((c) => [{ url: absoluteUrl(`/projects/${c.slug}`) }, ...(c.theme ? [{ url: absoluteUrl(`/projects/${c.slug}/design-system`) }] : [])]),
    ...getPosts()
      .filter((p) => !p.url)
      .map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.date })),
  ];
}
