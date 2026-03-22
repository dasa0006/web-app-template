"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const LOCALE_LABELS: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  es: "ES",
};

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (nextLocale: (typeof routing.locales)[number]) => {
    // next-intl's router.replace keeps the current pathname and swaps the locale
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-md border border-border-default p-0.5">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            loc === locale
              ? "bg-brand-primary text-white"
              : "text-text-muted hover:text-text-primary"
          )}
          aria-current={loc === locale ? "true" : undefined}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
};
