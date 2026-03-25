import {
  IHeaderCTA,
  INavLink,
  ctaBase,
  ctaVariants,
} from "@/components/sections/header/Header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";
import { LocaleSwitcher } from "../localeSwitcher/LocaleSwitcher";

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
  showLocaleSwitcher?: boolean; // ← new flag
}

const MobileDrawer = ({
  isOpen,
  onClose,
  brand,
  navLinks,
  ctas,
  showLocaleSwitcher,
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
          {showLocaleSwitcher && (
            <div className="md:hidden block mx-auto py-3">
              <LocaleSwitcher />
            </div>
          )}
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

export default MobileDrawer;
