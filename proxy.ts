// proxy.ts
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { randomBytes } from "crypto";

const intlMiddleware = createMiddleware(routing);

// Generate cryptographically secure nonce
function generateNonce(): string {
  return randomBytes(16).toString("base64");
}

export default function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const response = intlMiddleware(request);
  
  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // CSP with nonce
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://vercel.com https://*.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.vercel.com https://*.vercel-insights.com;
    connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com;
    font-src 'self';
    frame-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s+/g, " ").trim();

  response.headers.set("Content-Security-Policy", csp);
  
  // Pass nonce to layout via custom header
  response.headers.set("x-nonce", nonce);
  
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};