import { Section } from "@/components/sections/section/Section";
import { Heading } from "@/components/ui/heading/Heading";
import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IFeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
}

export type FeatureGridColumns = 2 | 3 | 4;

export interface IFeatureGrid {
  eyebrow?: string;
  heading: ReactNode;
  subheading?: string;
  features: IFeatureCard[];
  columns?: FeatureGridColumns;
  background?: "white" | "subtle";
  className?: string;
}

const columnMap: Record<FeatureGridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const FeatureCard = ({ icon, title, description }: IFeatureCard) => (
  <div className="group flex flex-col gap-4 rounded-card border border-border-subtle bg-surface-raised p-card transition-all duration-300 hover:border-border-default hover:shadow-card">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-colors duration-200 group-hover:bg-amber-100">
      {icon}
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-base font-semibold tracking-tight text-text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-text-muted">{description}</p>
    </div>
  </div>
);

export const FeatureGrid = ({
  eyebrow,
  heading,
  subheading,
  features,
  columns = 3,
  background = "subtle",
  className,
}: IFeatureGrid) => {
  return (
    <Section size="lg" background={background} className={className}>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                {eyebrow}
              </span>
            )}
            <Heading
              as="h2"
              className="max-w-2xl text-3xl sm:text-4xl font-bold tracking-tight"
            >
              {heading}
            </Heading>
            {subheading && (
              <p className="max-w-xl text-base leading-relaxed text-text-muted">
                {subheading}
              </p>
            )}
          </div>

          {/* Grid */}
          <div className={cn("grid grid-cols-1 gap-4", columnMap[columns])}>
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};
