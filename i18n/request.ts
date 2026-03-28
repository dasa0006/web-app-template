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

  const baseCommon = (await import(`../messages/base/common.json`)).default;
  const baseLocale = (await import(`../messages/base/${locale}.json`)).default;

  const customCommon = (await import(`../messages/custom/common.json`)).default;
  const customLocale = (await import(`../messages/custom/${locale}.json`))
    .default;

  return {
    locale,
    messages: {
      ...customCommon,
      ...customLocale,
      ...baseCommon,
      ...baseLocale,
    },
  };
});
