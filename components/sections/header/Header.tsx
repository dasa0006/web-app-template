"use client";

import Brand from "@/components/brand/Brand";
import { LocaleSwitcher } from "@/components/ui/localeSwitcher/LocaleSwitcher";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import MobileDrawer from "@/components/ui/mobileDrawer/MobileDrawer";
import { useScrolled } from "@/hooks/useScrolled";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface INavLink {
  label: string;
  href: string;
}

export interface IHeaderCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export type HeaderVariant = "solid" | "transparent";

export interface IHeader {
  navLinks?: INavLink[];
  ctas?: IHeaderCTA[];
  /**
   * `solid`       — always white with a bottom border.
   * `transparent` — starts transparent (for use over a full-bleed hero),
   *                 then transitions to solid once the user scrolls.
   */
  variant?: HeaderVariant;
  showLocaleSwitcher?: boolean; // ← new flag
  className?: string;
}

// ─── Style constants ──────────────────────────────────────────────────────────

export const ctaBase =
  "inline-flex items-center justify-center rounded-pill px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const ctaVariants: Record<NonNullable<IHeaderCTA["variant"]>, string> = {
  primary:
    "bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover focus-visible:ring-brand-primary",
  secondary:
    "border border-border-default text-text-secondary hover:bg-surface-subtle hover:border-border-strong focus-visible:ring-border-focus",
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({
  navLinks = [],
  ctas = [],
  variant = "solid",
  showLocaleSwitcher,
  className,
}: IHeader) => {
  const t = useTranslations("header");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrolled();

  const isTransparent = variant === "transparent";
  const solidified = isTransparent && scrolled;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300",
          // Background
          isTransparent && !solidified
            ? "bg-transparent"
            : "bg-surface-base/90 backdrop-blur-md",
          // Border — appears once solid
          !isTransparent || solidified
            ? scrolled
              ? "border-b border-border-subtle shadow-sm"
              : "border-b border-border-subtle"
            : "border-b border-transparent",
          className
        )}
      >
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between gap-8">
            {/* Brand */}
            <Link
              href="/"
              aria-label="Go to homepage"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 rounded-md"
            >
              <Brand />
            </Link>

            {/* Desktop nav */}
            {navLinks.length > 0 && (
              <nav
                aria-label="Main navigation"
                className="hidden md:flex md:items-center md:gap-1"
              >
                <ul className="flex items-center gap-1" role="list">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                      >
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Desktop CTAs + mobile hamburger */}
            <div className="flex items-center gap-2">
              {/* Desktop CTAs */}
              {ctas.length > 0 && (
                <div className="hidden items-center gap-2 md:flex">
                  {ctas.map((cta) => (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={cn(
                        ctaBase,
                        ctaVariants[cta.variant ?? "primary"]
                      )}
                    >
                      {t(cta.label)}
                    </Link>
                  ))}
                </div>
              )}

              {showLocaleSwitcher && (
                <div className="hidden md:block">
                  <LocaleSwitcher />
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus md:hidden"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Mobile drawer — rendered outside the header flow so it can be full-height */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        ctas={ctas}
        showLocaleSwitcher={showLocaleSwitcher}
      />
    </>
  );
};
