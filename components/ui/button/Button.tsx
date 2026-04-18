import { TrackingMeta, useButtonTracking } from "@/hooks/useButtonTracking";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "transparent"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Shows spinner and disables interaction */
  isLoading?: boolean;
  /** Accessible label for loading state */
  loadingLabel?: string;
  /** Icon rendered before children */
  leftIcon?: ReactNode;
  /** Icon rendered after children */
  rightIcon?: ReactNode;
  /** Analytics event name */
  trackingEvent?: string;
  /** Analytics event metadata */
  trackingMeta?: TrackingMeta;
  children: ReactNode;
}

// ─── Style Configuration ─────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-brand-primary text-text-on-brand border border-brand-primary",
    "hover:bg-brand-primary-hover hover:border-brand-primary-hover",
    "active:scale-[0.98]",
    "disabled:bg-surface-subtle disabled:border-border-default disabled:text-text-disabled",
  ].join(" "),
  secondary: [
    "bg-brand-secondary text-text-primary border border-border-default",
    "hover:bg-surface-subtle hover:border-border-strong",
    "active:bg-surface-subtle active:scale-[0.98]",
    "disabled:text-text-disabled disabled:border-border-subtle",
  ].join(" "),
  accent: [
    "bg-brand-accent text-text-on-brand border border-brand-accent",
    "hover:bg-brand-accent-hover hover:border-brand-accent-hover",
    "active:scale-[0.98]",
    "disabled:bg-surface-subtle disabled:border-border-default disabled:text-text-disabled",
  ].join(" "),
  transparent: [
    "bg-transparent text-text-primary border border-border-default",
    "hover:bg-surface-subtle hover:border-border-strong",
    "active:bg-surface-subtle active:scale-[0.98]",
    "disabled:text-text-disabled disabled:border-border-subtle",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary border border-transparent",
    "hover:bg-surface-subtle hover:text-text-primary",
    "active:bg-surface-subtle active:scale-[0.98]",
    "disabled:text-text-disabled",
  ].join(" "),
};

const sizeConfig: Record<
  ButtonSize,
  { button: string; icon: string; gap: string }
> = {
  sm: { button: "text-xs px-3 py-1.5", icon: "size-3.5", gap: "gap-1.5" },
  md: { button: "text-sm px-4 py-2", icon: "size-4", gap: "gap-2" },
  lg: { button: "text-base px-6 py-3", icon: "size-5", gap: "gap-2.5" },
};

const baseStyles = [
  "relative inline-flex items-center justify-center rounded-pill",
  "font-semibold transition-all duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
].join(" ");

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = ({
  sizeClass,
  label,
}: {
  sizeClass: string;
  label: string;
}) => (
  <span
    className="absolute inset-0 flex items-center justify-center"
    role="status"
  >
    <svg
      className={cn("animate-spin shrink-0", sizeClass)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </span>
);

// ─── Icon Wrapper ────────────────────────────────────────────────────────────

const IconSlot = ({
  children,
  sizeClass,
}: {
  children: ReactNode;
  sizeClass: string;
}) => (
  <span className={cn("shrink-0", sizeClass)} aria-hidden="true">
    {children}
  </span>
);

// ─── Button ──────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingLabel = "Loading",
      leftIcon,
      rightIcon,
      trackingEvent,
      trackingMeta,
      className,
      onClick,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const { handleClick } = useButtonTracking({
      event: trackingEvent,
      meta: trackingMeta,
      onClick,
    });

    const isDisabled = disabled || isLoading;
    const { button: sizeStyle, icon: iconStyle, gap } = sizeConfig[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
        className={cn(baseStyles, variantStyles[variant], sizeStyle, className)}
        {...props}
      >
        {isLoading && <Spinner sizeClass={iconStyle} label={loadingLabel} />}

        <span
          className={cn(
            "inline-flex items-center justify-center",
            gap,
            isLoading && "invisible"
          )}
          aria-hidden={isLoading}
        >
          {leftIcon && <IconSlot sizeClass={iconStyle}>{leftIcon}</IconSlot>}
          {children}
          {rightIcon && <IconSlot sizeClass={iconStyle}>{rightIcon}</IconSlot>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
