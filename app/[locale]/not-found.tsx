// app/[locale]/not-found.tsx
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Section 
      size="xl" 
      background="subtle" 
      className="flex flex-col justify-center min-h-[60vh]"
    >
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center gap-6">
          <div className="text-8xl font-bold text-brand-primary/20">404</div>
          <Heading as="h1">{t("title")}</Heading>
          <p className="text-lg text-text-muted max-w-md">{t("description")}</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover"
          >
            {t("backHome")}
          </Link>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
}