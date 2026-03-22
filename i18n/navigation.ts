// Re-export locale-aware navigation primitives from next-intl.
// Import from here instead of "next/link" or "next/navigation" in your
// components so that locale prefixes are handled automatically.
//
// Usage:
//   import { Link, useRouter, usePathname, redirect } from "@/i18n/navigation";

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, useRouter, usePathname, redirect, permanentRedirect } =
  createNavigation(routing);
