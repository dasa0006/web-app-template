import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IHeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
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

const ctaBase =
  "inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaVariants: Record<NonNullable<IHeroCTA["variant"]>, string> = {
  primary:
    "bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover focus-visible:ring-brand-primary",
  secondary:
    "border border-border-default bg-surface-base text-text-primary hover:bg-surface-subtle hover:border-border-strong focus-visible:ring-border-focus",
};

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

  return (
    <Section size="xl" background="white" className={className}>
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
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={cn(ctaBase, ctaVariants[cta.variant ?? "primary"])}
                >
                  {cta.label}
                </Link>
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
