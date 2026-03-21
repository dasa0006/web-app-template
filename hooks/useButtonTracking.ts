/* eslint-disable no-unused-vars */
import { MouseEvent, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TrackingMeta = Record<
  string,
  string | number | boolean | undefined
>;

interface UseButtonTrackingOptions {
  event?: string;
  meta?: TrackingMeta;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface UseButtonTrackingReturn {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

// ─── Default Adapter ─────────────────────────────────────────────────────────
// Swap this out for Segment, Mixpanel, PostHog, etc. at the app boundary
// by calling `configureTracking` once at startup.

type TrackFn = (event: string, meta?: TrackingMeta) => void;

let _track: TrackFn = (event, meta) => {
  if (process.env.NODE_ENV === "development") {
    console.debug("[tracking]", event, meta ?? {});
  }
};

/**
 * Override the default no-op tracking adapter.
 *
 * Call this once at app startup (e.g. in `app/layout.tsx`) before any
 * Button renders.
 *
 * @example
 * // With Segment:
 * configureTracking((event, meta) => window.analytics.track(event, meta));
 *
 * // With PostHog:
 * configureTracking((event, meta) => posthog.capture(event, meta));
 */
export function configureTracking(fn: TrackFn): void {
  _track = fn;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Wraps a button's onClick with an optional analytics tracking call.
 *
 * Keeps the Button component decoupled from any specific analytics library.
 * The tracking call fires *before* the consumer's onClick so that network
 * failures in the consumer don't silently swallow events.
 */
export function useButtonTracking({
  event,
  meta,
  onClick,
}: UseButtonTrackingOptions): UseButtonTrackingReturn {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (event) {
        _track(event, meta);
      }
      onClick?.(e);
    },
    [event, meta, onClick]
  );

  return { handleClick };
}
