import { IHeader } from "./Header";

// Inline wordmark so mocks have no external image dependency.
// In production replace this with an <Image /> or an SVG logo file.
const Brand = () => (
  <span className="text-lg font-bold tracking-tight text-zinc-900">
    Acme<span className="text-amber-500">.</span>
  </span>
);

const base: IHeader = {
  brand: <Brand />,
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
  brand: <Brand />,
  ctas: [{ label: "Get started", href: "#", variant: "primary" }],
};

export const mockHeaderNavOnly: IHeader = {
  brand: <Brand />,
  navLinks: base.navLinks,
};

export const mockHeaderWithLocaleSwitcher: IHeader = {
  brand: <Brand />,
  navLinks: base.navLinks,
  showLocaleSwitcher: true,
  ctas: [{ label: "Get started", href: "#", variant: "primary" }],
};
