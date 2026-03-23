"use client";

import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { useScrolled } from "@/hooks/useScrolled";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { ReactNode, useEffect, useRef, useState } from "react";

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
  /** Brand mark — pass a logo image or a styled wordmark span */
  brand: ReactNode;
  navLinks?: INavLink[];
  ctas?: IHeaderCTA[];
  /**
   * `solid`       — always white with a bottom border.
   * `transparent` — starts transparent (for use over a full-bleed hero),
   *                 then transitions to solid once the user scrolls.
   */
  variant?: HeaderVariant;
  className?: string;
}

// ─── Style constants ──────────────────────────────────────────────────────────

const ctaBase =
  "inline-flex items-center justify-center rounded-pill px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaVariants: Record<NonNullable<IHeaderCTA["variant"]>, string> = {
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

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brand: ReactNode;
  navLinks: INavLink[];
  ctas: IHeaderCTA[];
}

const MobileDrawer = ({
  isOpen,
  onClose,
  brand,
  navLinks,
  ctas,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const id = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-surface-inverted/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-surface-base shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <div>{brand}</div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col overflow-y-auto px-4 py-6"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center rounded-xl px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-subtle hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTAs at the bottom of the nav */}
          {ctas.length > 0 && (
            <div className="mt-auto flex flex-col gap-2 pt-8 border-t border-border-subtle">
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  onClick={onClose}
                  className={cn(
                    ctaBase,
                    "w-full justify-center py-3 text-sm",
                    ctaVariants[cta.variant ?? "primary"]
                  )}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({
  brand,
  navLinks = [],
  ctas = [],
  variant = "solid",
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
              {brand}
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
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={cn(
                        ctaBase,
                        ctaVariants[cta.variant ?? "primary"]
                      )}
                    >
                      {cta.label}
                    </Link>
                  ))}
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
        brand={brand}
        navLinks={navLinks}
        ctas={ctas}
      />
    </>
  );
};
