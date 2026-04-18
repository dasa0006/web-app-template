import { Background, Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import LinkButton, { ILinkButton } from "@/components/ui/linkButton/LinkButton";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ICTA {
  heading: ReactNode;
  subheading?: string;
  buttons?: ILinkButton[];
  background?: Background;
  className?: string;
}

export const CTA = ({
  heading,
  subheading,
  buttons = [],
  background = "dark",
  className,
}: ICTA) => {
  const isDark = background === "dark";
  const isAccent = background === "accent";

  return (
    <Section size="lg" background={background} className={className}>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-8 text-center">
          <Heading
            as="h2"
            className={cn(
              "max-w-3xl text-3xl sm:text-5xl font-bold tracking-tight leading-tight",
              isDark ? "text-text-inverted" : "text-text-primary"
            )}
          >
            {heading}
          </Heading>

          {subheading && (
            <p
              className={cn(
                "max-w-xl text-base leading-relaxed",
                isDark
                  ? "text-text-inverted/60"
                  : isAccent
                    ? "text-text-secondary"
                    : "text-text-muted"
              )}
            >
              {subheading}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {buttons.map((btn) => (
                <LinkButton
                  key={btn.label}
                  href={btn.href}
                  label={btn.label}
                  background={background}
                  variant={btn.variant}
                />
              ))}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};
