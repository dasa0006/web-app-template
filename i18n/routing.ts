import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "es"],

  // Used when no locale matches (no prefix in URL for this locale)
  defaultLocale: "en",

  // Prefix strategy:
  //   "as-needed"  → /about (en), /es/about (es)  ← recommended for SEO
  //   "always"     → /en/about, /es/about
  //   "never"      → /about for all (requires domain-based routing)
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
