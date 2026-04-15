"use client";

import { ConsentProvider } from "@/components/providers/ConsentProvider";
import type { Locale } from "@/i18n/routing";
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
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ConsentProvider>
        {children}
        <CookieBanner />
        <ConsentAnalytics />
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
