import { Metadata } from "next";
import { SITE_CONFIG } from "../config/site";

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
    title, // ← string only, layout template adds the brand
    description,
    metadataBase: new URL(SITE_CONFIG.url),

    alternates: {
      canonical,
    },

    openGraph: {
      title, // ← just the page title
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

    twitter: {
      card: "summary_large_image",
      title, // ← just the page title
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [ogImage],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
