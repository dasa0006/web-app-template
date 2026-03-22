import { ISection } from "./Section";

const base: ISection = {
  children: "Section content goes here.",
  size: "md",
  background: "white",
};

export const mockSectionProps = base;

export const mockSectionSubtle: ISection = {
  ...base,
  background: "subtle",
};

export const mockSectionDark: ISection = {
  ...base,
  background: "dark",
  children: "Dark section content.",
};