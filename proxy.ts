// Note: The middleware file convention is deprecated and has been renamed to proxy.
// See https://nextjs.org/docs/app/api-reference/file-conventions/proxy#migration-to-proxy for more details.

// proxy.ts
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { getCspString } from "./security/csp";
import { applySecurityHeaders } from "./security/headers";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // 1. Handle i18n routing
  const response = intlMiddleware(request);

  // 2. Apply baseline security headers
  applySecurityHeaders(response);

  // 3. Apply Content-Security-Policy
  response.headers.set("Content-Security-Policy", getCspString());

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)"],
};
