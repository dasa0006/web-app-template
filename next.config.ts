import "@/lib/env";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Points to the request config file (default path, can be omitted if using this exact path)
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
