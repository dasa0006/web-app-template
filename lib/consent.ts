// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsentStatus = "accepted" | "declined" | null;

// ─── Storage ──────────────────────────────────────────────────────────────────

const CONSENT_KEY = "cookie-consent";

// Stored as a cookie (not just localStorage) so it persists across browser
// sessions and can be inspected server-side in middleware if needed.
// Expires after 1 year, matching common GDPR consent shelf-life guidance.
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_KEY}=`));
  const val = match?.split("=")[1];
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export function setConsentStatus(status: "accepted" | "declined"): void {
  document.cookie = [
    `${CONSENT_KEY}=${status}`,
    `max-age=${CONSENT_MAX_AGE_SECONDS}`,
    "path=/",
    "SameSite=Lax",
    // Add Secure flag in production
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearConsentStatus(): void {
  document.cookie = `${CONSENT_KEY}=; max-age=0; path=/`;
}
