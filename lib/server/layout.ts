import { IFooter } from "@/components/sections/footer/Footer";
import { IHeader } from "@/components/sections/header/Header";
import { getTranslations } from "next-intl/server";

export async function getMarketingLayoutProps() {
  const [tHeader, tFooter] = await Promise.all([
    getTranslations("header"),
    getTranslations("footer"),
  ]);

  return {
    header: {
      navLinks: [
        { label: tHeader("nav.product"), href: "/product" },
        { label: tHeader("nav.pricing"), href: "/pricing" },
        { label: tHeader("nav.docs"), href: "/docs" },
      ],
      ctas: [
        {
          label: tHeader("ctas.signIn"),
          href: "/login",
          variant: "secondary" as const,
        },
        {
          label: tHeader("ctas.getStarted"),
          href: "/signup",
          variant: "primary" as const,
        },
      ],
      variant: "solid" as const,
    } satisfies IHeader,
    footer: {
      tagline: tFooter("tagline"),
      legalLinks: [
        { label: tFooter("legal.privacy"), href: "/privacy" },
        { label: tFooter("legal.terms"), href: "/terms" },
      ],
      copyright: `© ${new Date().getFullYear()} Acme, Inc.`,
    } satisfies IFooter,
  };
}
