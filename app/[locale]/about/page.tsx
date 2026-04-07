import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";

const Page = () => {
  return (
    <>
      <Section>
        <MaxWidthWrapper>
          <Heading>About</Heading>
        </MaxWidthWrapper>
      </Section>
    </>
  );
};

export default Page;
