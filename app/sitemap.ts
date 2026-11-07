import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects", "/blog", "/resume", "/design-system", "/contact"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p) })),
    ...getCaseStudies().map((c) => ({ url: absoluteUrl(`/projects/${c.slug}`) })),
    ...getPosts()
      .filter((p) => !p.url)
      .map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.date })),
  ];
}
