/** Centralized route definitions */
export const ROUTES = {
  HOME: "/",
  PRODUCT: "/product",
  PRICING: "/pricing",
  DOCS: "/docs",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  CONTACT: "/contact",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
