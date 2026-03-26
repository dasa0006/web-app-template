import { ConsentAnalytics } from "@/components/analytics/ConsentAnalytics";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { CookieBanner } from "@/components/ui/cookieBanner/CookieBanner";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../app/globals.css";
import { routing } from "../../i18n/routing";
import { fontVariables } from "../../lib/fonts";
import {
  SITE_CONFIG,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../../lib/seo";

// ─────────────────────────────────────────────
// Statically generate a route for each locale
// ─────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─────────────────────────────────────────────
// Root-level metadata
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${fontVariables} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen`}
      >
        {/*
         * ConsentProvider wraps everything so both CookieBanner and
         * ConsentAnalytics share the same consent state without prop drilling.
         */}
        <ConsentProvider>
          <NextIntlClientProvider messages={messages}>
            <MarketingLayout>{children}</MarketingLayout>
          </NextIntlClientProvider>

          {/* Only fires Vercel Analytics after the user accepts */}
          <ConsentAnalytics />

          {/* Slides up on first visit; disappears once a choice is made */}
          <CookieBanner />
        </ConsentProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
