import { AbstractIntlMessages } from "next-intl";
import { SITE_CONFIG } from "../lib/config/site";
import baseDa from "../messages/base/da.json";
import baseEn from "../messages/base/en.json";
import customDa from "../messages/custom/da.json";
import customEn from "../messages/custom/en.json";

const routing = {
  locales: ["en", "da"] as const,
  defaultLocale: "en" as const,
};

type Locale = (typeof routing.locales)[number];

type Messages = AbstractIntlMessages;

const baseMessages: Record<Locale, Messages> = {
  en: baseEn as Messages,
  da: baseDa as Messages,
};

const customMessages: Record<Locale, Messages> = {
  en: customEn as unknown as Messages,
  da: customDa as unknown as Messages,
};

// Factory function to merge messages per locale
const createMessages = (locale: Locale): Messages => ({
  ...baseMessages[locale],
  ...customMessages[locale],
});

export default {
  defaultLocale: routing.defaultLocale,
  messagesByLocale: {
    en: createMessages("en"),
    da: createMessages("da"),
  } satisfies Record<Locale, Messages>,
  timeZone: SITE_CONFIG.timezone,
  // Optional: add formats for dates/numbers if needed
  formats: {
    dateTime: {
      short: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    },
  },
} as const;
