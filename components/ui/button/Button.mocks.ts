import { IButton } from "./Button";

const base: IButton = {
  children: "Get started",
  variant: "primary",
  size: "md",
};

export const mockButtonProps = base;

export const mockButtonSecondaryProps: IButton = {
  ...base,
  children: "Learn more",
  variant: "secondary",
};

export const mockButtonGhostProps: IButton = {
  ...base,
  children: "Dismiss",
  variant: "ghost",
};

export const mockButtonLoadingProps: IButton = {
  ...base,
  children: "Saving…",
  isLoading: true,
  loadingLabel: "Saving your changes",
};

export const mockButtonDisabledProps: IButton = {
  ...base,
  children: "Unavailable",
  disabled: true,
};

export const mockButtonSmProps: IButton = {
  ...base,
  children: "Small",
  size: "sm",
};

export const mockButtonLgProps: IButton = {
  ...base,
  children: "Large",
  size: "lg",
};

export const mockButtonWithTrackingProps: IButton = {
  ...base,
  children: "Subscribe",
  trackingEvent: "cta_clicked",
  trackingMeta: { location: "hero", campaign: "spring-2025" },
};
