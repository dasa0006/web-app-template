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
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ],
  ctas: [
    { label: "Sign in", href: "/login", variant: "secondary" },
    { label: "Get started", href: "/signup", variant: "primary" },
  ],
  variant: "solid",
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_CONFIG: IFooter = {
  brand: <Brand />,
  tagline: "One clear sentence describing what the product does.",
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  legalExtra: <ManageCookiesButton />,
  copyright: `© ${new Date().getFullYear()} Acme, Inc. All rights reserved.`,
};