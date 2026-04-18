import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import LinkButton, {
  LinkButtonVariant,
} from "@/components/ui/linkButton/LinkButton";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IHeroCTA {
  label: string;
  href: string;
  variant?: LinkButtonVariant;
}

export interface IHero {
  eyebrow?: string;
  heading: ReactNode;
  subheading?: string;
  ctas?: IHeroCTA[];
  media?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export const Hero = ({
  eyebrow,
  heading,
  subheading,
  ctas = [],
  media,
  align = "center",
  className,
}: IHero) => {
  const isCentered = align === "center";
  const background = "white";

  return (
    <Section size="xl" background={background} className={className}>
      <MaxWidthWrapper>
        <div
          className={cn(
            "flex flex-col gap-8",
            isCentered ? "items-center text-center" : "items-start text-left"
          )}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-pill border border-brand-accent/20 bg-brand-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-brand-accent"
              />
              {eyebrow}
            </span>
          )}

          {/* Heading */}
          <Heading
            className={cn(
              "max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tighter",
              isCentered && "mx-auto"
            )}
          >
            {heading}
          </Heading>

          {/* Subheading */}
          {subheading && (
            <p
              className={cn(
                "max-w-2xl text-lg leading-relaxed text-text-muted",
                isCentered && "mx-auto"
              )}
            >
              {subheading}
            </p>
          )}

          {/* CTAs */}
          {ctas.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-3 pt-2",
                isCentered ? "justify-center" : "justify-start"
              )}
            >
              {ctas.map((cta) => (
                <LinkButton
                  key={cta.label}
                  href={cta.href}
                  label={cta.label}
                  variant={cta.variant}
                  background={background}
                />
              ))}
            </div>
          )}

          {/* Media */}
          {media && (
            <div
              className={cn(
                "w-full mt-8 overflow-hidden rounded-card border border-border-subtle shadow-card",
                isCentered && "mx-auto max-w-5xl"
              )}
            >
              {media}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};
