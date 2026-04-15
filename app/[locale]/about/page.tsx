import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("About");
  return (
    <>
      <Section>
        <MaxWidthWrapper>
          <Heading>{t("title")}</Heading>
        </MaxWidthWrapper>
      </Section>
    </>
  );
}
