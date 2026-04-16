import { SITE_CONFIG } from "@/lib/config/site";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const baseLocale = (await import(`../messages/base/${locale}.json`)).default;
  const customLocale = (await import(`../messages/custom/${locale}.json`))
    .default;

  return {
    timeZone: SITE_CONFIG.timezone,
    locale,
    messages: {
      ...baseLocale,
      ...customLocale,
    },
  };
});
