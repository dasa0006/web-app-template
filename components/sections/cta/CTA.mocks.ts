import { ICTA } from "./CTA";

const base: ICTA = {
  heading: "Ready to ship faster?",
  subheading:
    "Join 10,000+ teams already using the platform. Get started in minutes, cancel any time.",
  buttons: [
    { label: "Start for free", href: "#", variant: "primary" },
    { label: "Book a demo", href: "#", variant: "secondary" },
  ],
  background: "dark",
};

export const mockCTAProps = base;

export const mockCTAAccent: ICTA = {
  ...base,
  background: "accent",
  heading: "Your first project is on us.",
  subheading: "No credit card needed. Full access for 14 days.",
  buttons: [{ label: "Create free account", href: "#", variant: "primary" }],
};

export const mockCTALight: ICTA = {
  ...base,
  background: "white",
};
