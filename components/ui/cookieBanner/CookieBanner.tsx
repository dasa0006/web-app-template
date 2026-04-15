"use client";

import { useConsent } from "@/components/providers/ConsentProvider";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// ─── Component ────────────────────────────────────────────────────────────────

export const CookieBanner = () => {
  const t = useTranslations("CookieBanner");

  const { status, accept, decline } = useConsent();
  const [mounted, setMounted] = useState(false);

  // Slide in after a short delay — avoids jarring appearance on first paint
  useEffect(() => {
    if (status === null) {
      const timerId = setTimeout(() => setMounted(true), 400);
      return () => clearTimeout(timerId);
    }
  }, [status]);

  // Don't render if already decided
  if (status !== null) return null;

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      aria-live="polite"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6",
        "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        mounted ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-3xl",
          "rounded-card border border-border-default bg-surface-raised",
          "shadow-lg",
          "overflow-hidden"
        )}
      >
        {/* Accent stripe */}
        <div className="h-0.5 w-full bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent" />

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-4 sm:pl-5">
          {/* Icon + text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="mt-0.5">
              <Cookie />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary leading-snug">
                {t("title")}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {/* Rich text rendering for the description with a link */}
                {t.rich("description", {
                  privacyLink: (chunks) => (
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 transition-colors hover:text-text-primary"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={decline}
              className={cn(
                "rounded-lg px-3.5 py-2 text-xs font-medium",
                "text-text-muted transition-colors",
                "hover:bg-surface-subtle hover:text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1"
              )}
            >
              {t("declineButton")}
            </button>
            <button
              onClick={accept}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-semibold",
                "bg-brand-primary text-text-on-brand",
                "transition-all duration-150",
                "hover:bg-brand-primary-hover",
                "active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              )}
            >
              {t("acceptButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
