import { ROUTES, RouteValue } from "./routes";

/** Event descriptor shape used by analytics */
export type EventDescriptor = {
  /** Stable event id used by analytics backends */
  id: string;
  /** Route or href associated with the event */
  href: RouteValue;
};

/** All event keys as a union type for compile-time safety */
export const EVENT_KEYS = [
  "HEADER_NAV_PRODUCT",
  "HEADER_NAV_PRICING",
  "HEADER_NAV_DOCS",
  "HEADER_CTA_SIGN_IN",
  "HEADER_CTA_SIGN_UP",
  "FOOTER_CTA_PRIVACY",
  "FOOTER_CTA_TERMS",
  "BRAND_NAV_HOME",
  "COOKIE_NAV_PRIVACY",
  "LANDING_PAGE_CTA_SIGNUP",
  "LANDING_PAGE_CTA_CONTACT",
] as const;

export type EventKey = (typeof EVENT_KEYS)[number];

/**
 * EVENTS mapping
 * - `id` is a stable string used by analytics (use the same value as the key)
 * - `href` references ROUTES to avoid duplication
 */
export const EVENTS: Readonly<Record<EventKey, EventDescriptor>> =
  Object.freeze({
    HEADER_NAV_PRODUCT: { id: "HEADER_NAV_PRODUCT", href: ROUTES.PRODUCT },
    HEADER_NAV_PRICING: { id: "HEADER_NAV_PRICING", href: ROUTES.PRICING },
    HEADER_NAV_DOCS: { id: "HEADER_NAV_DOCS", href: ROUTES.DOCS },

    HEADER_CTA_SIGN_IN: { id: "HEADER_CTA_SIGN_IN", href: ROUTES.LOGIN },
    HEADER_CTA_SIGN_UP: { id: "HEADER_CTA_SIGN_UP", href: ROUTES.SIGN_UP },

    FOOTER_CTA_PRIVACY: { id: "FOOTER_CTA_PRIVACY", href: ROUTES.PRIVACY },
    FOOTER_CTA_TERMS: { id: "FOOTER_CTA_TERMS", href: ROUTES.TERMS },

    BRAND_NAV_HOME: { id: "BRAND_NAV_HOME", href: ROUTES.HOME },
    COOKIE_NAV_PRIVACY: { id: "COOKIE_NAV_PRIVACY", href: ROUTES.PRIVACY },
    LANDING_PAGE_CTA_SIGNUP: {
      id: "LANDING_PAGE_CTA_SIGNUP",
      href: ROUTES.SIGN_UP,
    },
    LANDING_PAGE_CTA_CONTACT: {
      id: "LANDING_PAGE_CTA_CONTACT",
      href: ROUTES.CONTACT,
    },
  } as const);
