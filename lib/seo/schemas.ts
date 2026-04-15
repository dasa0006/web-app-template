import { SITE_CONFIG } from "../config/site";

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
