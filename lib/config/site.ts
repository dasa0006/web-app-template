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
  timezone: "Europe/Vienna",
} as const;
