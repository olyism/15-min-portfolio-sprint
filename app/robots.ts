import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// AI crawlers are welcome: the point is to be found. Add disallow rules if you'd rather not be.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
