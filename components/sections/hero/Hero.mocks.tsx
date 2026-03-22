import { IHero } from "./Hero";

const base: IHero = {
  eyebrow: "Now in public beta",
  heading: "The platform built for teams that ship.",
  subheading:
    "Stop stitching together tools. Everything your team needs — from planning to production — in one place, with the speed you expect.",
  ctas: [
    { label: "Get started free", href: "#", variant: "primary" },
    { label: "See how it works", href: "#", variant: "secondary" },
  ],
  align: "center",
};

export const mockHeroProps = base;

export const mockHeroLeft: IHero = {
  ...base,
  align: "left",
};

export const mockHeroMinimal: IHero = {
  heading: "Simple. Fast. Yours.",
  subheading: "The tool that gets out of the way.",
  ctas: [{ label: "Start for free", href: "#", variant: "primary" }],
};