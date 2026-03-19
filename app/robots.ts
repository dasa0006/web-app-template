import { SITE_CONFIG } from "@/lib/seo";
import type { MetadataRoute } from "next";

// ─────────────────────────────────────────────
// Robots
//
// Next.js serves this at /robots.txt automatically.
//
// Key decisions baked in:
//  • Production → allow all crawlers, point to sitemap.
//  • Non-production (preview, staging, local) → block all crawlers entirely.
//    This prevents staging content from being indexed and polluting search
//    results or confusing crawlers before launch.
//
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// ─────────────────────────────────────────────

const isProduction =
  process.env.NEXT_PUBLIC_SITE_URL === SITE_CONFIG.url &&
  process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Block every crawler on non-production environments.
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow paths that should never appear in search results.
        disallow: [
          "/api/", // API routes
          "/_next/", // Next.js internals
          // "/admin/", // Add authenticated-only paths here
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    // Optional: declare a crawl-delay for aggressive bots
    // host: SITE_CONFIG.url,
  };
}
