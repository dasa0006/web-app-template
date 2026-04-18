import { IFooter } from "@/components/sections/footer/Footer";
import { IHeader } from "@/components/sections/header/Header";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "../routes";

export async function getMarketingLayoutProps() {
  const [tHeader, tFooter] = await Promise.all([
    getTranslations("header"),
    getTranslations("footer"),
  ]);

  return {
    header: {
      navLinks: [
        { label: tHeader("nav.product"), href: ROUTES.PRODUCT },
        { label: tHeader("nav.pricing"), href: ROUTES.PRICING },
        { label: tHeader("nav.docs"), href: ROUTES.DOCS },
      ],
      ctas: [
        {
          label: tHeader("ctas.signIn"),
          href: ROUTES.LOGIN,
          variant: "secondary" as const,
        },
        {
          label: tHeader("ctas.getStarted"),
          href: ROUTES.SIGN_UP,
          variant: "primary" as const,
        },
      ],
      variant: "solid" as const,
    } satisfies IHeader,
    footer: {
      tagline: tFooter("tagline"),
      legalLinks: [
        { label: tFooter("legal.privacy"), href: ROUTES.PRIVACY },
        { label: tFooter("legal.terms"), href: ROUTES.TERMS },
      ],
      copyright: `© ${new Date().getFullYear()} Acme, Inc.`,
    } satisfies IFooter,
  };
}
