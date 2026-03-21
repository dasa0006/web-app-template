import { configureTracking } from "@/hooks/useButtonTracking";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderButton = (props?: Partial<React.ComponentProps<typeof Button>>) =>
  render(<Button {...props}>Click me</Button>);

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("Button — rendering", () => {
  it("renders children", () => {
    renderButton();
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies the primary variant by default", () => {
    renderButton();
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-zinc-900/);
  });

  it("applies the secondary variant", () => {
    renderButton({ variant: "secondary" });
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-transparent/);
  });

  it("applies the ghost variant", () => {
    renderButton({ variant: "ghost" });
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/border-transparent/);
  });

  it("applies size classes for sm", () => {
    renderButton({ size: "sm" });
    expect(screen.getByRole("button").className).toMatch(/h-8/);
  });

  it("applies size classes for lg", () => {
    renderButton({ size: "lg" });
    expect(screen.getByRole("button").className).toMatch(/h-12/);
  });

  it("merges custom className", () => {
    renderButton({ className: "custom-class" });
    expect(screen.getByRole("button").className).toMatch(/custom-class/);
  });

  it("renders leftIcon and rightIcon", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        With icons
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});

// ─── Disabled state ───────────────────────────────────────────────────────────

describe("Button — disabled state", () => {
  it("is disabled when disabled prop is true", () => {
    renderButton({ disabled: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets aria-disabled when disabled", () => {
    renderButton({ disabled: true });
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    renderButton({ disabled: true, onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Loading state ────────────────────────────────────────────────────────────

describe("Button — loading state", () => {
  it("is disabled when isLoading is true", () => {
    renderButton({ isLoading: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets aria-busy when loading", () => {
    renderButton({ isLoading: true });
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("shows the loadingLabel via aria-label on the spinner wrapper", () => {
    renderButton({ isLoading: true, loadingLabel: "Saving changes" });
    expect(screen.getByLabelText("Saving changes")).toBeInTheDocument();
  });

  it("hides content visually while loading", () => {
    renderButton({ isLoading: true });
    // The content span should have aria-hidden=true
    const btn = screen.getByRole("button");
    const contentSpan = btn.querySelector("[aria-hidden='true']");
    expect(contentSpan).toBeInTheDocument();
  });

  it("does not fire onClick when loading", () => {
    const onClick = vi.fn();
    renderButton({ isLoading: true, onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Click & tracking ─────────────────────────────────────────────────────────

describe("Button — click and tracking", () => {
  it("fires onClick when clicked", () => {
    const onClick = vi.fn();
    renderButton({ onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls the tracking adapter when trackingEvent is provided", () => {
    const trackFn = vi.fn();
    configureTracking(trackFn);

    render(
      <Button trackingEvent="cta_clicked" trackingMeta={{ location: "hero" }}>
        Track me
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(trackFn).toHaveBeenCalledWith("cta_clicked", { location: "hero" });
  });

  it("does not call the tracking adapter when trackingEvent is absent", () => {
    const trackFn = vi.fn();
    configureTracking(trackFn);

    renderButton();
    fireEvent.click(screen.getByRole("button"));
    expect(trackFn).not.toHaveBeenCalled();
  });

  it("fires tracking before onClick", () => {
    const order: string[] = [];
    const trackFn = vi.fn(() => order.push("track"));
    configureTracking(trackFn);

    const onClick = vi.fn(() => order.push("click"));
    render(
      <Button trackingEvent="cta" onClick={onClick}>
        Ordered
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(order).toEqual(["track", "click"]);
  });
});

// ─── Forwarded ref ────────────────────────────────────────────────────────────

describe("Button — forwarded ref", () => {
  it("forwards ref to the button element", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });
});
