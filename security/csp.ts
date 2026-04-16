const CSP_HASHES = {
  ORGANIZATION: "sha256-pIjZqPAmarHtJ8oePkZOEolW8UWz+xI/XIMhOiLKL/c=",
  WEBSITE: "sha256-/JWNKJn6G1CVf3DUQIsqSqfbIUoap53DCde912CNVR4=",
} as const;

export function getCspString(): string {
  const isProd = process.env.NODE_ENV === "production";

  // In development, allow 'unsafe-inline' for Turbopack/HMR scripts
  // In production, rely on strict hashes for JSON-LD
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
