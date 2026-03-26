"use client";

import { useConsent } from "@/components/providers/ConsentProvider";

/**
 * Renders as a plain text button matching the footer legal link style.
 * Calls reset() from ConsentProvider, which clears the stored cookie and
 * sets status back to null — causing the CookieBanner to reappear.
 */
export const ManageCookiesButton = () => {
  const { reset } = useConsent();

  return (
    <button
      onClick={reset}
      className="text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
    >
      Manage cookies
    </button>
  );
};