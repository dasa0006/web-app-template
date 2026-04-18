"use client";

import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  // Log to error reporting service in production
  useEffect(() => {
    // TODO: Send to Sentry, LogRocket, etc.
    // if (process.env.NODE_ENV === "production") {
    //   logError(error);
    // }
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <Section
      size="xl"
      background="subtle"
      className="flex flex-col justify-center min-h-[60vh]"
    >
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center gap-6">
          {/* Error code indicator */}
          <div className="text-8xl font-bold text-feedback-error/20">500</div>

          <Heading as="h1">{t("title")}</Heading>

          <p className="text-lg text-text-muted max-w-md">{t("description")}</p>

          {/* Error digest for support reference (subtle) */}
          {error.digest && (
            <p className="text-xs text-text-disabled font-mono">
              {t("reference")}: {error.digest}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            >
              {t("tryAgain")}
            </button>

            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold border border-border-default text-text-primary hover:bg-surface-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
}
