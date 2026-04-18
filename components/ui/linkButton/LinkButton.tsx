import { Background } from "@/components/sections/section/Section";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface ILinkButton {
  label: string;
  href: string;
  variant?: LinkButtonVariant;
  background?: Background;
  className?: string;
}

export type LinkButtonVariant = "primary" | "secondary" | "ghost";
const buttonBase =
  "inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

type BgKey = Background;

const buttonVariants: Record<
  BgKey,
  Record<NonNullable<ILinkButton["variant"]>, string>
> = {
  // Dark background (surface-inverted) — amber primary pops on dark
  dark: {
    primary:
      "bg-brand-accent text-text-primary hover:opacity-90 focus-visible:ring-brand-accent",
    secondary:
      "border border-border-strong text-text-inverted hover:bg-surface-raised/10 hover:border-border-strong focus-visible:ring-border-focus",
    ghost:
      "text-text-inverted/70 hover:text-text-inverted focus-visible:ring-border-focus",
  },
  // Accent background (brand-accent / amber) — dark primary for contrast
  accent: {
    primary:
      "bg-surface-inverted text-text-inverted hover:opacity-90 focus-visible:ring-surface-inverted",
    secondary:
      "border border-border-strong/30 text-text-primary hover:bg-surface-inverted/10 focus-visible:ring-border-focus",
    ghost:
      "text-text-secondary hover:text-text-primary focus-visible:ring-border-focus",
  },
  // White/light background — brand primary CTA
  white: {
    primary:
      "bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover focus-visible:ring-brand-primary",
    secondary:
      "border border-border-default text-text-primary hover:bg-surface-subtle focus-visible:ring-border-focus",
    ghost:
      "text-text-muted hover:text-text-primary focus-visible:ring-border-focus",
  },
};

const LinkButton: React.FC<ILinkButton> = ({
  href,
  label,
  variant = "primary",
  background = "white",
  className,
}) => {
  return (
    <Link
      key={label}
      href={href}
      className={cn(className, buttonBase, buttonVariants[background][variant])}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
