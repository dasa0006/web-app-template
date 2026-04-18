import type { ILinkButton, LinkButtonVariant } from "./LinkButton";

export const defaultArgs: ILinkButton = {
  label: "Link Button",
  href: "/example",
  variant: "primary",
  background: "white",
};

export const variants: LinkButtonVariant[] = ["primary", "secondary", "ghost"];
export const backgrounds: ILinkButton["background"][] = ["white", "dark", "accent"];

// Tailwind classes matching your design tokens to actually render the backgrounds
export const backgroundStyles: Record<NonNullable<ILinkButton["background"]>, string> = {
  white: "bg-white p-8 rounded-lg border border-border-default",
  dark: "bg-surface-inverted p-8 rounded-lg",
  accent: "bg-brand-accent p-8 rounded-lg",
};