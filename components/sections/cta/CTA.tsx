import {
  Section,
  SectionBackground,
} from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
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
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

type BgKey = "dark" | "accent" | "white";

const buttonVariants: Record<
  BgKey,
  Record<NonNullable<ICTAButton["variant"]>, string>
> = {
  dark: {
    primary:
      "bg-amber-500 text-zinc-900 hover:bg-amber-400 focus-visible:ring-amber-500",
    secondary:
      "border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 focus-visible:ring-zinc-500",
    ghost: "text-zinc-300 hover:text-white focus-visible:ring-zinc-500",
  },
  accent: {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900",
    secondary:
      "border border-zinc-900/20 text-zinc-900 hover:bg-zinc-900/5 focus-visible:ring-zinc-900",
    ghost: "text-zinc-700 hover:text-zinc-900 focus-visible:ring-zinc-900",
  },
  white: {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
    secondary:
      "border border-zinc-200 text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400",
    ghost: "text-zinc-500 hover:text-zinc-900 focus-visible:ring-zinc-400",
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
              isDark ? "text-zinc-50" : "text-zinc-900"
            )}
          >
            {heading}
          </Heading>

          {subheading && (
            <p
              className={cn(
                "max-w-xl text-base leading-relaxed",
                isDark
                  ? "text-zinc-400"
                  : isAccent
                    ? "text-zinc-700"
                    : "text-zinc-500"
              )}
            >
              {subheading}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={cn(
                    buttonBase,
                    buttonVariants[background][btn.variant ?? "primary"]
                  )}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};
