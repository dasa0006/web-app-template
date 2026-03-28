import { AbstractIntlMessages } from "next-intl";
import baseCommon from "../messages/base/common.json";
import baseEn from "../messages/base/en.json";
import baseDa from "../messages/base/da.json";
import customCommon from "../messages/custom/common.json";
import customEn from "../messages/custom/en.json";
import customDa from "../messages/custom/da.json";

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
  en: customEn as Messages,
  da: customDa as Messages,
};

// Factory function to merge messages per locale
const createMessages = (locale: Locale): Messages => ({
  ...(baseCommon as Messages),
  ...baseMessages[locale],
  ...(customCommon as Messages),
  ...customMessages[locale],
});

export default {
  defaultLocale: routing.defaultLocale,
  messagesByLocale: {
    en: createMessages("en"),
    da: createMessages("da"),
  } satisfies Record<Locale, Messages>,
  timeZone: "Europe/Berlin",
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