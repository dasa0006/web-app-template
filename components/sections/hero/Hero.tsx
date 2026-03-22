import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
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
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaVariants: Record<NonNullable<IHeroCTA["variant"]>, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
  secondary:
    "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 focus-visible:ring-zinc-400",
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
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"
              />
              {eyebrow}
            </span>
          )}

          {/* Heading */}
          <Heading
            className={cn(
              "max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tighter text-zinc-900",
              isCentered && "mx-auto"
            )}
          >
            {heading}
          </Heading>

          {/* Subheading */}
          {subheading && (
            <p
              className={cn(
                "max-w-2xl text-lg leading-relaxed text-zinc-500",
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
                <a
                  key={cta.label}
                  href={cta.href}
                  className={cn(ctaBase, ctaVariants[cta.variant ?? "primary"])}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}

          {/* Media */}
          {media && (
            <div
              className={cn(
                "w-full mt-8 overflow-hidden rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-100",
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
