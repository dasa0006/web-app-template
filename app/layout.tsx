import type { Metadata } from "next";
import { fontVariables } from "../lib/fonts";
import {
  SITE_CONFIG,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../lib/seo";
import "./globals.css";

// ─────────────────────────────────────────────
// Root-level metadata
//
// - `title.template` appends " | Brand" to every page title automatically.
// - `title.default` is used on pages that export NO metadata at all —
//   treat this as a fallback, not an intended state.
// - `metadataBase` is required by Next.js to resolve relative OG image URLs.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,

  // ── Open Graph defaults ──────────────────────────────────────────────────
  // Individual pages override these via buildMetadata(); these are the
  // last-resort values that apply when a page has no metadata export at all.
  openGraph: {
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  // ── Twitter / X defaults ─────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
  },

  // ── Crawler hints ────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification tokens ──────────────────────────────────────────────────
  // Uncomment and fill in once you've verified your property in each console.
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} antialiased`}>
        {children}

        {/*
          ── Site-wide JSON-LD ───────────────────────────────────────────────
          Organization and WebSite schemas belong here, in the root layout,
          because they describe the site as a whole rather than any one page.
          Page-specific schemas (Article, BreadcrumbList, Product, etc.) should
          be injected in the relevant page.tsx using the same pattern.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}