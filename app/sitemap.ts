import { SITE_CONFIG } from "@/lib/seo";
import type { MetadataRoute } from "next";

// ─────────────────────────────────────────────
// Sitemap
//
// Next.js serves this at /sitemap.xml automatically.
//
// Pattern:
//  1. List all static routes in STATIC_ROUTES.
//  2. Fetch dynamic routes (blog posts, product pages, etc.) and spread them
//     in. Each entry can carry its own `lastModified`, `changeFrequency`,
//     and `priority` to help crawlers schedule efficiently.
//
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// ─────────────────────────────────────────────

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: `${SITE_CONFIG.url}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  },
  // ── Add your static marketing pages below ──
  // {
  //   url: `${SITE_CONFIG.url}/pricing`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.8,
  // },
  // {
  //   url: `${SITE_CONFIG.url}/about`,
  //   lastModified: new Date(),
  //   changeFrequency: "yearly",
  //   priority: 0.5,
  // },
  // {
  //   url: `${SITE_CONFIG.url}/contact`,
  //   lastModified: new Date(),
  //   changeFrequency: "yearly",
  //   priority: 0.4,
  // },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Fetch dynamic routes ──────────────────────────────────────────────
  // Uncomment and adapt once you have a CMS or database:
  //
  // const posts = await getPosts(); // your data-fetching function
  // const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
  //   url: `${SITE_CONFIG.url}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));
  //
  // return [...STATIC_ROUTES, ...blogRoutes];

  return STATIC_ROUTES;
}
