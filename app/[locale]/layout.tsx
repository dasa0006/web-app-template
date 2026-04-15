import MarketingLayout from "@/components/layouts/MarketingLayout";
import { AppProviders } from "@/components/providers/AppProviders";
import { JsonLdScripts } from "@/components/seo/JsonLdScripts";
import { Locale, routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/config/site";
import { fontVariables } from "@/lib/fonts";
import { getMarketingLayoutProps } from "@/lib/server/layout";
import { validateLocale } from "@/lib/validation";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import "../globals.css";

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

  validateLocale(locale);

  const messages = await getMessages();
  const marketingLayoutProps = await getMarketingLayoutProps();

  return (
    <html lang={locale}>
      <body className={`${fontVariables} antialiased`}>
        <AppProviders messages={messages} locale={locale as Locale}>
          <MarketingLayout {...marketingLayoutProps}>
            {children}
          </MarketingLayout>
        </AppProviders>

        <JsonLdScripts />
      </body>
    </html>
  );
}
