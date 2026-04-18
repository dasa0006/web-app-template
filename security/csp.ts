import { CSP_HASHES } from "./csp.hashes";

export function getCspString(): string {
  const isProd = process.env.NODE_ENV === "production";
  const scriptSrc = isProd
    ? `'self' ${CSP_HASHES.ORGANIZATION} ${CSP_HASHES.WEBSITE} https://vercel.com https://*.vercel-insights.com`
    : `'self' 'unsafe-inline' https://vercel.com https://*.vercel-insights.com`;

  const directives = [
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
  ].filter(Boolean);

  return directives.join("; ");
}