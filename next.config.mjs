/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images from other sites: add their domain here, e.g.
  // images: { remotePatterns: [{ protocol: "https", hostname: "images.example.com" }] },
  async rewrites() {
    // /projects/my-project.md → a plain Markdown copy of the case study (for AI tools)
    return [{ source: "/projects/:slug.md", destination: "/md/projects/:slug" }];
  },
};

export default nextConfig;
