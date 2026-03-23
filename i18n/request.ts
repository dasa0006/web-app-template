import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is provided by the [locale] segment in the URL.
  // Validate it falls within our supported locales; fall back to the default.
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../messages/common.json`)).default,
      ...(await import(`../messages/${locale}.json`)).default,
    },
  };
});
