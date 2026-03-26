"use client";

import { useConsent } from "@/components/providers/ConsentProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";

/**
 * Renders Vercel Analytics and Speed Insights only after the user has
 * explicitly accepted analytics cookies.
 *
 * The `mounted` guard prevents a server/client hydration mismatch:
 * the server has no access to cookies so it always renders nothing;
 * we match that on the client by also rendering nothing until after
 * the first paint, then switching based on the real consent status.
 */
export const ConsentAnalytics = () => {
  const { status } = useConsent();
  const [mounted, setMounted] = useState(false);
  /**
   * NOTE ABOUT ESLINT DISABLE:
   * --------------------------
   * We intentionally disable the `react-hooks/set-state-in-effect` rule for the
   * `setMounted(true)` call below.
   *
   * Why?
   * React’s lint rule warns against calling setState inside an effect because it
   * can cause unnecessary re-renders. However, in this specific case we *must*
   * update state after the first client render to avoid a server/client hydration
   * mismatch.
   *
   * On the server:
   *   - `window` and cookies are unavailable
   *   - consent status cannot be read
   *   - this component must render nothing
   *
   * On the client:
   *   - we need one post-mount render to safely read the real consent status
   *   - only then can we decide whether to load analytics scripts
   *
   * This “mounted” guard is a standard SSR pattern used in Next.js to prevent
   * hydration errors when rendering client-only logic. It results in exactly one
   * extra render and does NOT create a render loop or performance issue.
   *
   * Because this is an intentional, safe, SSR-specific pattern, we disable the
   * lint rule for this line only.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || status !== "accepted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
