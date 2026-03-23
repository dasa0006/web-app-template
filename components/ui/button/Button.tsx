import { TrackingMeta, useButtonTracking } from "@/hooks/useButtonTracking";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Variants & Sizes ────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// ─── Interface ───────────────────────────────────────────────────────────────

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction */
  isLoading?: boolean;
  /** Label announced to screen readers while loading */
  loadingLabel?: string;
  /** Optional left-side icon */
  leftIcon?: ReactNode;
  /** Optional right-side icon */
  rightIcon?: ReactNode;
  /** Analytics event name fired on click */
  trackingEvent?: string;
  /** Additional metadata attached to the tracking event */
  trackingMeta?: TrackingMeta;
  children: ReactNode;
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-brand-primary text-text-on-brand border border-brand-primary",
    "hover:bg-brand-primary-hover hover:border-brand-primary-hover",
    "active:scale-[0.98]",
    "disabled:bg-surface-subtle disabled:border-border-default disabled:text-text-disabled",
  ].join(" "),

  secondary: [
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

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = ({ size }: { size: ButtonSize }) => (
  <svg
    className={cn("animate-spin shrink-0", iconSizeStyles[size])}
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
);

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingLabel = "Loading…",
      leftIcon,
      rightIcon,
      trackingEvent,
      trackingMeta,
      className,
      onClick,
      disabled,
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

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
        className={cn(
          // Base
          "relative inline-flex items-center justify-center font-medium",
          "tracking-tight select-none whitespace-nowrap",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "cursor-pointer disabled:cursor-not-allowed",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Loading overlay — keeps layout stable */}
        {isLoading && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-label={loadingLabel}
          >
            <Spinner size={size} />
          </span>
        )}

        {/* Content — hidden visually when loading, still in DOM for size */}
        <span
          className={cn(
            "inline-flex items-center justify-center gap-[inherit]",
            isLoading && "invisible"
          )}
          aria-hidden={isLoading}
        >
          {leftIcon && (
            <span
              className={cn("shrink-0", iconSizeStyles[size])}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              className={cn("shrink-0", iconSizeStyles[size])}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
