import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  //   - API routes        (/api/...)
  //   - Next.js internals (/_next/...)
  //   - Static files      (/favicon.ico, /robots.txt, sitemap.xml, OG images, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
