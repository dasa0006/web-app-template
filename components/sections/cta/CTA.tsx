import {
  Section,
  SectionBackground,
} from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ICTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface ICTA {
  heading: ReactNode;
  subheading?: string;
  buttons?: ICTAButton[];
  background?: Extract<SectionBackground, "dark" | "accent" | "white">;
  className?: string;
}

const buttonBase =
  "inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

type BgKey = "dark" | "accent" | "white";

const buttonVariants: Record<
  BgKey,
  Record<NonNullable<ICTAButton["variant"]>, string>
> = {
  // Dark background (surface-inverted) — amber primary pops on dark
  dark: {
    primary:
      "bg-brand-accent text-text-primary hover:opacity-90 focus-visible:ring-brand-accent",
    secondary:
      "border border-border-strong text-text-inverted hover:bg-surface-raised/10 hover:border-border-strong focus-visible:ring-border-focus",
    ghost:
      "text-text-inverted/70 hover:text-text-inverted focus-visible:ring-border-focus",
  },
  // Accent background (brand-accent / amber) — dark primary for contrast
  accent: {
    primary:
      "bg-surface-inverted text-text-inverted hover:opacity-90 focus-visible:ring-surface-inverted",
    secondary:
      "border border-border-strong/30 text-text-primary hover:bg-surface-inverted/10 focus-visible:ring-border-focus",
    ghost:
      "text-text-secondary hover:text-text-primary focus-visible:ring-border-focus",
  },
  // White/light background — brand primary CTA
  white: {
    primary:
      "bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover focus-visible:ring-brand-primary",
    secondary:
      "border border-border-default text-text-primary hover:bg-surface-subtle focus-visible:ring-border-focus",
    ghost:
      "text-text-muted hover:text-text-primary focus-visible:ring-border-focus",
  },
};

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
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={cn(
                    buttonBase,
                    buttonVariants[background][btn.variant ?? "primary"]
                  )}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};
