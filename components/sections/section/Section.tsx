import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type SectionSize = "sm" | "md" | "lg" | "xl";
export type SectionBackground = "white" | "subtle" | "dark" | "accent";

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
  white: "bg-white text-zinc-900",
  subtle: "bg-zinc-50 text-zinc-900",
  dark: "bg-zinc-900 text-zinc-50",
  accent: "bg-amber-500 text-zinc-900",
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
