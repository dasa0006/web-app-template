import type { Metadata } from "next";

// ─────────────────────────────────────────────
// 1. Site-wide constants — edit once, used everywhere
// ─────────────────────────────────────────────

export const SITE_CONFIG = {
  /** Canonical origin — no trailing slash */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  name: "Your Brand",
  description:
    "One clear sentence that describes what your product does and who it helps.",
  /** Shown in Twitter cards and some search snippets */
  twitterHandle: "@yourbrand",
  /** Default OG / Twitter share image (1200×630) */
  ogImage: "/og-default.png",
  locale: "en_US",
} as const;

// ─────────────────────────────────────────────
// 2. Metadata factory
//
//    Usage — in any page.tsx:
//
//    export const metadata = buildMetadata({
//      title: "Pricing",
//      description: "Simple, transparent pricing for every team size.",
//      path: "/pricing",
//    });
//
//    Or with generateMetadata for dynamic routes:
//
//    export async function generateMetadata({ params }): Promise<Metadata> {
//      const post = await getPost(params.slug);
//      return buildMetadata({
//        title: post.title,
//        description: post.excerpt,
//        path: `/blog/${post.slug}`,
//        image: post.ogImage,
//      });
//    }
// ─────────────────────────────────────────────

interface BuildMetadataOptions {
  /** Page-level title — appended with " | Site Name" automatically */
  title: string;
  /** Overrides the site-level description */
  description?: string;
  /** Relative path used to build the canonical URL, e.g. "/pricing" */
  path?: string;
  /** Absolute URL or relative path to an OG image (1200×630 recommended) */
  image?: string;
  /** Set to true only for pages you actively want de-indexed */
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "",
  image = SITE_CONFIG.ogImage,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = `${SITE_CONFIG.url}${path}`;
  const ogImage = image.startsWith("http")
    ? image
    : `${SITE_CONFIG.url}${image}`;

  return {
    title: {
      default: title,
      // Prevents Next.js from appending the template to an already-full title.
      // The template lives in the root layout; individual pages pass plain strings.
      absolute: `${title} | ${SITE_CONFIG.name}`,
    },
    description,
    metadataBase: new URL(SITE_CONFIG.url),

    // ── Canonical ──────────────────────────────
    alternates: {
      canonical,
    },

    // ── Open Graph ─────────────────────────────
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // ── Twitter / X ────────────────────────────
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [ogImage],
    },

    // ── Robots ─────────────────────────────────
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// ─────────────────────────────────────────────
// 3. JSON-LD structured data helpers
//
//    Usage — inside any page or layout:
//
//    <script
//      type="application/ld+json"
//      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }}
//    />
// ─────────────────────────────────────────────

/** Schema.org Organization — goes in the root layout */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      // Add your social profiles here
      // "https://twitter.com/yourbrand",
      // "https://linkedin.com/company/yourbrand",
    ],
  };
}

/** Schema.org WebSite with SearchAction — enables Google sitelinks search */
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Schema.org BreadcrumbList — pass the current page's breadcrumb trail */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

/** Schema.org Article — for blog posts and editorial content */
export function buildArticleSchema(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_CONFIG.url}${article.path}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    image: article.image
      ? `${SITE_CONFIG.url}${article.image}`
      : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}${article.path}`,
    },
  };
}
