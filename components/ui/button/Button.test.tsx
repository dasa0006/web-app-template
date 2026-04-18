// Button.test.tsx
import { useButtonTracking } from "@/hooks/useButtonTracking";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

// ─── Mocks ───────────────────────────────────────────────────────────────────

// Mock cn to simply join class strings, avoiding tailwind-merge dependency in tests
vi.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

// Mock the tracking hook
vi.mock("@/hooks/useButtonTracking", () => ({
  useButtonTracking: vi.fn(),
}));

describe("Button Component", () => {
  const mockHandleClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation for the tracking hook
    vi.mocked(useButtonTracking).mockReturnValue({
      handleClick: mockHandleClick,
    });
  });

  // ─── Basic Rendering & Props ─────────────────────────────────────────────

  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  it("applies default props (variant: primary, size: md, type: button)", () => {
    render(<Button>Defaults</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("bg-brand-primary"); // primary variant
    expect(button.className).toContain("text-sm px-4 py-2"); // md size
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button"));
  });

  it("passes custom className and extra HTML attributes", () => {
    render(
      <Button className="mt-4" data-testid="custom-btn" type="submit">
        Submit
      </Button>
    );
    const button = screen.getByTestId("custom-btn");
    expect(button.className).toContain("mt-4");
    expect(button).toHaveAttribute("type", "submit");
  });

  // ─── Variants & Sizes ────────────────────────────────────────────────────

  it.each(["primary", "secondary", "accent", "transparent", "ghost"] as const)(
    'applies correct classes for "%s" variant',
    (variant) => {
      render(<Button variant={variant}>Variant</Button>);
      const button = screen.getByRole("button");

      if (variant === "ghost") {
        expect(button.className).toContain("border-transparent");
      } else if (variant === "transparent") {
        expect(button.className).toContain("bg-transparent");
      } else {
        expect(button.className).toContain(`bg-brand-${variant}`);
      }
    }
  );

  it.each(["sm", "md", "lg"] as const)(
    'applies correct classes for "%s" size',
    (size) => {
      render(<Button size={size}>Size</Button>);
      const button = screen.getByRole("button");

      const expectedTextSize = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      };

      expect(button.className).toContain(expectedTextSize[size]);
    }
  );

  // ─── Loading State ───────────────────────────────────────────────────────

  it("displays loading spinner and handles aria attributes", () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button");

    // Button should be disabled
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("aria-busy", "true");

    // Status wrapper should be visible
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();

    // The "animate-spin" class is on the <svg> INSIDE the status span
    const spinnerSvg = status.querySelector("svg");
    expect(spinnerSvg).toHaveClass("animate-spin");

    // Use `within` to specifically target the sr-only label inside the spinner,
    // avoiding a match with the invisible children text.
    const { getByText } = within(status);
    expect(getByText("Loading")).toHaveClass("sr-only");
  });

  it("hides content visually and from screen readers when loading", () => {
    render(
      <Button isLoading>
        <span data-testid="content">Hidden Content</span>
      </Button>
    );
    const content = screen.getByTestId("content");

    // Use .parentElement to get the wrapper span (because content is already a span)
    const contentWrapper = content.parentElement;

    // Content wrapper should have invisible class
    expect(contentWrapper).toHaveClass("invisible");
    // Content wrapper should be hidden from screen readers
    expect(contentWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("uses custom loadingLabel for screen readers", () => {
    render(
      <Button isLoading loadingLabel="Saving data...">
        Save
      </Button>
    );
    expect(screen.getByText("Saving data...")).toBeInTheDocument();
  });

  // ─── Disabled State ──────────────────────────────────────────────────────

  it("handles disabled state correctly", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    // React renders boolean false attributes as attr="false", it doesn't omit them
    expect(button).toHaveAttribute("aria-busy", "false");
  });

  // ─── Icons ───────────────────────────────────────────────────────────────

  it("renders left and right icons with correct sizes and aria-hidden", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Icons
      </Button>
    );

    const leftIcon = screen.getByTestId("left-icon");
    const rightIcon = screen.getByTestId("right-icon");

    // Icons should be in the document
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();

    // Use .parentElement to get the IconSlot wrapper span
    const leftWrapper = leftIcon.parentElement;
    const rightWrapper = rightIcon.parentElement;

    // Icon wrappers should have aria-hidden="true"
    expect(leftWrapper).toHaveAttribute("aria-hidden", "true");
    expect(rightWrapper).toHaveAttribute("aria-hidden", "true");

    // Icon wrappers should have default md size class (size-4)
    expect(leftWrapper).toHaveClass("size-4");
  });

  it("applies correct icon size based on button size prop", () => {
    render(
      <Button size="sm" leftIcon={<span data-testid="sm-icon">X</span>}>
        Small
      </Button>
    );
    const iconWrapper = screen.getByTestId("sm-icon").parentElement;
    expect(iconWrapper).toHaveClass("size-3.5"); // sm icon size
  });

  // ─── Tracking ────────────────────────────────────────────────────────────

  it("passes tracking props to useButtonTracking hook", () => {
    const mockOnClick = vi.fn();
    const trackingMeta = { page: "home" };

    render(
      <Button
        trackingEvent="btn_click"
        trackingMeta={trackingMeta}
        onClick={mockOnClick}
      >
        Track
      </Button>
    );

    expect(useButtonTracking).toHaveBeenCalledWith({
      event: "btn_click",
      meta: trackingMeta,
      onClick: mockOnClick,
    });
  });

  it("uses handleClick from tracking hook as the onClick handler", async () => {
    const user = userEvent.setup();
    render(<Button trackingEvent="btn_click">Track</Button>);

    await user.click(screen.getByRole("button"));

    // The mock handleClick returned by the mocked hook should be called,
    // NOT a direct native onClick event, because the component delegates to handleClick.
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
