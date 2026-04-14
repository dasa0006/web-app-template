import { ConsentAnalytics } from "@/components/analytics/ConsentAnalytics";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { CookieBanner } from "@/components/ui/cookieBanner/CookieBanner";
import { getMarketingLayoutProps } from "@/lib/server/layout";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
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

  // Extract nonce from middleware header
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const messages = await getMessages();
  const marketingLayoutProps = await getMarketingLayoutProps();

  return (
    <html lang={locale}>
      <body
        className={`${fontVariables} antialiased`}
      >
        <ConsentProvider>
          <NextIntlClientProvider messages={messages}>
            <MarketingLayout {...marketingLayoutProps}>
              {children}
            </MarketingLayout>
            <ConsentAnalytics />
            <CookieBanner />
          </NextIntlClientProvider>
        </ConsentProvider>

        {/* Apply nonce to inline scripts */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />
        <script
          nonce={nonce}
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
