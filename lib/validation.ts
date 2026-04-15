import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function validateLocale(locale: string): void {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
}
