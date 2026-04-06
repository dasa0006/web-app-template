import { IFooter } from "@/components/sections/footer/Footer";
import { IHeader } from "@/components/sections/header/Header";

// ─── Header ───────────────────────────────────────────────────────────────────
export const HEADER_CONFIG: IHeader = {
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
  tagline: "tagline",
  legalLinks: [
    { label: "legal.privacy", href: "/privacy" },
    { label: "legal.terms", href: "/terms" },
  ],
  copyright: `© ${new Date().getFullYear()} Acme, Inc. All rights reserved.`,
};
