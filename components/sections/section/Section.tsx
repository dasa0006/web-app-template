import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type SectionSize = "sm" | "md" | "lg" | "xl";
export type SectionBackground = "white" | "subtle" | "dark" | "accent";
export type Background = Extract<
  SectionBackground,
  "dark" | "accent" | "white"
>;

export interface ISection {
  children: ReactNode;
  className?: string;
  size?: SectionSize;
  background?: SectionBackground;
  as?: "section" | "div" | "article" | "aside";
  id?: string;
}

const sizeMap: Record<SectionSize, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundMap: Record<SectionBackground, string> = {
  white: "bg-surface-base text-text-primary",
  subtle: "bg-surface-subtle text-text-primary",
  dark: "bg-surface-inverted text-text-inverted",
  accent: "bg-brand-accent text-text-primary",
};

export const Section = ({
  children,
  className,
  size = "md",
  background = "white",
  as: Tag = "section",
  id,
}: ISection) => {
  return (
    <Tag
      id={id}
      className={cn(
        "w-full",
        sizeMap[size],
        backgroundMap[background],
        className
      )}
    >
      {children}
    </Tag>
  );
};
