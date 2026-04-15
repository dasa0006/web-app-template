// Note: The middleware file convention is deprecated and has been renamed to proxy.
// See https://nextjs.org/docs/app/api-reference/file-conventions/proxy#migration-to-proxy for more details.

import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// SHA-256 Hashes for Inline JSON-LD Scripts (production)
const HASH_ORGANIZATION = "sha256-pIjZqPAmarHtJ8oePkZOEolW8UWz+xI/XIMhOiLKL/c=";
const HASH_WEBSITE = "sha256-/JWNKJn6G1CVf3DUQIsqSqfbIUoap53DCde912CNVR4=";

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // ── Security Headers ──────────────────────────────────────────────────────
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // ── Content-Security-Policy (CSP) ─────────────────────────────────────────
  const isProd = process.env.NODE_ENV === "production";
  
  // In development, allow 'unsafe-inline' for Turbopack/HMR scripts
  // In production, rely on strict hashes for JSON-LD
  const scriptSrc = isProd
    ? `'self' ${HASH_ORGANIZATION} ${HASH_WEBSITE} https://vercel.com https://*.vercel-insights.com`
    : `'self' 'unsafe-inline' https://vercel.com https://*.vercel-insights.com`;

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://*.vercel.com https://*.vercel-insights.com",
    "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com",
    "font-src 'self'",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isProd ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};