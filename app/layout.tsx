import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { themeScript } from "@/components/ThemeToggle";
import { getSite } from "@/lib/content";
import { personSchema } from "@/lib/seo";

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-pill bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header name={site.name} nav={site.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer site={site} />
        <JsonLd data={personSchema()} />
      </body>
    </html>
  );
}
