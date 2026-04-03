import { IFooter } from "@/components/sections/footer/Footer";
import { IHeader } from "@/components/sections/header/Header";
import { ManageCookiesButton } from "@/components/ui/cookieBanner/ManageCookiesButton";

// ─── Brand ────────────────────────────────────────────────────────────────────

const Brand = () => (
  <span className="text-lg font-bold tracking-tight text-text-primary">
    Acme<span className="text-brand-accent">.</span>
  </span>
);

// ─── Header ───────────────────────────────────────────────────────────────────

export const HEADER_CONFIG: IHeader = {
  brand: <Brand />,
  navLinks: [
    { label: "nav.product", href: "/product" },
    { label: "nav.pricing", href: "/pricing" },
    { label: "nav.docs", href: "/docs" },
  ],
  ctas: [
    { label: "ctas.signIn", href: "/login", variant: "secondary" },
    { label: "ctas.getStarted", href: "/signup", variant: "primary" },
  ],
  variant: "solid",
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_CONFIG: IFooter = {
  brand: <Brand />,
  tagline: "tagline",
  legalLinks: [
    { label: "legal.privacy", href: "/privacy" },
    { label: "legal.terms", href: "/terms" },
  ],
  legalExtra: <ManageCookiesButton />,
  copyright: `© ${new Date().getFullYear()} Acme, Inc. All rights reserved.`,
};
