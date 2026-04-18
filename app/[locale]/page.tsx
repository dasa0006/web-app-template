import { CTA } from "@/components/sections/cta/CTA";
import { FeatureGrid } from "@/components/sections/featureGrid/FeatureGrid";
import { Hero } from "@/components/sections/hero/Hero";
import type { Feature } from "@/lib/featureIcons";
import { getFeatureIcon } from "@/lib/featureIcons";
import { ROUTES } from "@/lib/routes";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("HomePage");

  const features = (t.raw("featureGrid.features") as Feature[]).map((f) => ({
    ...f,
    icon: getFeatureIcon(f.type),
  }));

  return (
    <>
      <Hero
        eyebrow={t("hero.eyebrow")}
        heading={t("hero.heading")}
        subheading={t("hero.subheading")}
        align="left"
      />
      <FeatureGrid
        eyebrow={t("featureGrid.eyebrow")}
        heading={t("featureGrid.heading")}
        subheading={t("featureGrid.subheading")}
        features={features}
        columns={3}
      />
      <CTA
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttons={[
          {
            label: t("cta.buttons.primary"),
            href: ROUTES.SIGN_UP,
            variant: "primary",
          },
          {
            label: t("cta.buttons.secondary"),
            href: ROUTES.CONTACT,
            variant: "secondary",
          },
        ]}
        background="dark"
      />
    </>
  );
}
