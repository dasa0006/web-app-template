import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "da"],

  // Used when no locale matches (no prefix in URL for this locale)
  defaultLocale: "en",

  // Prefix strategy:
  //   "as-needed"  → /about (en), /da/about (da)  ← recommended for SEO
  //   "always"     → /en/about, /da/about
  //   "never"      → /about for all (requires domain-based routing)
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
