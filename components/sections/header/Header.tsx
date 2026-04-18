"use client";

import Brand from "@/components/brand/Brand";
import LinkButton, {
  LinkButtonVariant,
} from "@/components/ui/linkButton/LinkButton";
import { LocaleSwitcher } from "@/components/ui/localeSwitcher/LocaleSwitcher";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import MobileDrawer from "@/components/ui/mobileDrawer/MobileDrawer";
import { useScrolled } from "@/hooks/useScrolled";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface INavLink {
  label: string;
  href: string;
}

export interface IHeaderCTA {
  label: string;
  href: string;
  variant?: LinkButtonVariant;
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

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({
  navLinks = [],
  ctas = [],
  variant = "solid",
  showLocaleSwitcher,
  className,
}: IHeader) => {
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
                        {link.label}
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
                    <LinkButton
                      key={cta.label}
                      href={cta.href}
                      label={cta.label}
                      variant={cta.variant}
                    />
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
                <Menu />
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
