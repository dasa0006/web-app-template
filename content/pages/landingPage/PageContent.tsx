"use client";

import { CTA } from "@/components/sections/cta/CTA";
import { FeatureGrid } from "@/components/sections/featureGrid/FeatureGrid";
import { Hero } from "@/components/sections/hero/Hero";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getFeatureIcon, type Feature } from "@/lib/featureIcons"; // Export Feature type from lib
import { useTranslations } from "next-intl";
import { useMemo } from "react";

// ─── Move static data outside component ─────────────────────────────────────
const CTA_BUTTONS = [
  {
    label: "", // Will be set dynamically below
    href: "/signup",
    variant: "primary" as const,
  },
  {
    label: "",
    href: "/contact",
    variant: "secondary" as const,
  },
] as const;

export default function PageContent() {
  const t = useTranslations("HomePage");

  // ✅ Fix 1: Remove generic from t.raw(), then assert type
  const rawFeatures = t.raw("featureGrid.features") as Feature[] | undefined;
  const features = useMemo(() => {
    return (rawFeatures ?? []).map((f) => ({
      ...f,
      icon: getFeatureIcon(f.type),
    }));
  }, [rawFeatures]);

  // ✅ Fix 2: Build buttons with translations (still outside render logic)
  const ctaButtons = useMemo(
    () =>
      CTA_BUTTONS.map((btn, i) => ({
        ...btn,
        label: i === 0 ? t("cta.buttons.primary") : t("cta.buttons.secondary"),
      })),
    [t]
  );

  const sections = [
    <Hero
      key="hero"
      {...(t.raw("hero") as React.ComponentProps<typeof Hero>)}
      align="left"
    />,
    <FeatureGrid
      key="features"
      {...(t.raw("featureGrid") as Omit<
        React.ComponentProps<typeof FeatureGrid>,
        "features"
      >)}
      features={features}
      columns={3}
    />,
    <CTA
      key="cta"
      {...(t.raw("cta") as Omit<React.ComponentProps<typeof CTA>, "buttons">)}
      buttons={ctaButtons}
      background="dark"
    />,
  ];

  return <SectionRenderer sections={sections} />;
}
