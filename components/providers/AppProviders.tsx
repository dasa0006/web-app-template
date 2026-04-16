"use client";

import { ConsentProvider } from "@/components/providers/ConsentProvider";
import type { Locale } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/config/site";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { ConsentAnalytics } from "../analytics/ConsentAnalytics";
import { CookieBanner } from "../ui/cookieBanner/CookieBanner";

interface AppProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: Locale;
}

export function AppProviders({
  children,
  messages,
  locale,
}: AppProvidersProps) {
  return (
    <NextIntlClientProvider
      timeZone={SITE_CONFIG.timezone}
      messages={messages}
      locale={locale}
    >
      <ConsentProvider>
        {children}
        <CookieBanner />
        <ConsentAnalytics />
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
