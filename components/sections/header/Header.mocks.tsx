import { IHeader } from "./Header";

const base: IHeader = {
  navLinks: [
    { label: "Product", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Docs", href: "#" },
  ],
  ctas: [
    { label: "Sign in", href: "#", variant: "secondary" },
    { label: "Get started", href: "#", variant: "primary" },
  ],
  variant: "solid",
};

export const mockHeaderProps = base;

export const mockHeaderTransparent: IHeader = {
  ...base,
  variant: "transparent",
};

export const mockHeaderMinimal: IHeader = {
  ctas: [{ label: "Get started", href: "#", variant: "primary" }],
};

export const mockHeaderNavOnly: IHeader = {
  navLinks: base.navLinks,
};

export const mockHeaderWithLocaleSwitcher: IHeader = {
  navLinks: base.navLinks,
  showLocaleSwitcher: true,
  ctas: [{ label: "Get started", href: "#", variant: "primary" }],
};
