import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import {
  mockButtonDisabledProps,
  mockButtonGhostProps,
  mockButtonLgProps,
  mockButtonLoadingProps,
  mockButtonProps,
  mockButtonSecondaryProps,
  mockButtonSmProps,
  mockButtonWithTrackingProps,
} from "./Button.mocks";

// ─── Arrow icon helper (no extra dep) ────────────────────────────────────────

const ArrowRight = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "100%", height: "100%" }}
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    style={{ width: "100%", height: "100%" }}
  >
    <path d="M8 3v10M3 8h10" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: mockButtonProps,
};

export const Secondary: Story = {
  args: mockButtonSecondaryProps,
};

export const Ghost: Story = {
  args: mockButtonGhostProps,
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: mockButtonSmProps,
};

export const Medium: Story = {
  args: mockButtonProps,
};

export const Large: Story = {
  args: mockButtonLgProps,
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: mockButtonLoadingProps,
};

export const Disabled: Story = {
  args: mockButtonDisabledProps,
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithRightIcon: Story = {
  args: {
    ...mockButtonProps,
    children: "Continue",
    rightIcon: <ArrowRight />,
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...mockButtonSecondaryProps,
    children: "New item",
    leftIcon: <PlusIcon />,
  },
};

// ─── Tracking ────────────────────────────────────────────────────────────────

export const WithTracking: Story = {
  args: mockButtonWithTrackingProps,
  parameters: {
    docs: {
      description: {
        story:
          "Fires a `cta_clicked` event with metadata to the configured tracking adapter. Check the browser console (dev mode) to see the log.",
      },
    },
  },
};

// ─── All Variants Showcase ───────────────────────────────────────────────────

export const AllVariants: Story = {
  args: { children: "Button" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Size rows */}
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "12px", alignItems: "center" }}
        >
          <Button variant="primary" size={size}>
            Primary
          </Button>
          <Button variant="secondary" size={size}>
            Secondary
          </Button>
          <Button variant="ghost" size={size}>
            Ghost
          </Button>
          <Button variant="primary" size={size} isLoading>
            Loading
          </Button>
          <Button variant="secondary" size={size} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};
