/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

// Mock the tracking hook so we can spy on its calls without affecting other tests
const mockHandleClick = vi.fn();
vi.mock("@/hooks/useButtonTracking", () => ({
  useButtonTracking: ({ event, meta, onClick }: any) => ({
    handleClick: (e: any) => {
      if (event) {
        // Simulate tracking call
        mockHandleClick(event, meta);
      }
      onClick?.(e);
    },
  }),
  configureTracking: vi.fn(),
}));

const renderButton = (props?: Partial<React.ComponentProps<typeof Button>>) =>
  render(<Button {...props}>Click me</Button>);

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
    expect(btn.className).toMatch(/bg-brand-primary/);
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

describe("Button — click and tracking", () => {
  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it("fires onClick when clicked", () => {
    const onClick = vi.fn();
    renderButton({ onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls the tracking adapter when trackingEvent is provided", () => {
    render(
      <Button trackingEvent="cta_clicked" trackingMeta={{ location: "hero" }}>
        Track me
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockHandleClick).toHaveBeenCalledWith("cta_clicked", {
      location: "hero",
    });
  });

  it("does not call the tracking adapter when trackingEvent is absent", () => {
    renderButton();
    fireEvent.click(screen.getByRole("button"));
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it("fires tracking before onClick", () => {
    const order: string[] = [];
    const onClick = vi.fn(() => order.push("click"));

    // We'll capture the call order by spying on mockHandleClick and onClick
    mockHandleClick.mockImplementation(() => order.push("track"));

    render(
      <Button trackingEvent="cta" onClick={onClick}>
        Ordered
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(order).toEqual(["track", "click"]);
  });
});

describe("Button — forwarded ref", () => {
  it("forwards ref to the button element", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });
});
