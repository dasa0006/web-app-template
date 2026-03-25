import { Hero } from "@/components/sections/hero/Hero";
import { mockHeroProps } from "@/components/sections/hero/Hero.mocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";
import {
  mockHeaderMinimal,
  mockHeaderNavOnly,
  mockHeaderProps,
  mockHeaderTransparent,
  mockHeaderWithLocaleSwitcher,
} from "./Header.mocks";

const meta = {
  component: Header,
  parameters: {
    layout: "fullscreen",
    // Disable the default padding that Storybook adds, so the sticky
    // header actually sticks to the viewport top.
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual variants ──────────────────────────────────────────────────────

export const Solid: Story = {
  args: mockHeaderProps,
};

export const Transparent: Story = {
  args: mockHeaderTransparent,
  parameters: {
    docs: {
      description: {
        story:
          "The transparent variant is designed to sit over a full-bleed hero image. Scroll down in the preview to see it solidify.",
      },
    },
  },
};

export const Minimal: Story = {
  args: mockHeaderMinimal,
};

export const NavOnly: Story = {
  args: mockHeaderNavOnly,
};

// ─── Composition ─────────────────────────────────────────────────────────────

/**
 * Full-page composition showing the Header above a Hero section.
 * Resize the viewport to test the mobile drawer.
 */
export const WithHero: Story = {
  args: { brand: "brand" },
  render: () => (
    <div className="min-h-[200vh]">
      <Header {...mockHeaderProps} />
      <Hero {...mockHeroProps} />
    </div>
  ),
};

export const TransparentWithHero: Story = {
  args: { brand: "brand" },
  render: () => (
    <div className="min-h-[200vh]">
      <Header {...mockHeaderTransparent} />
      {/* Negative margin pulls the hero up behind the transparent header */}
      <div className="-mt-16">
        <Hero {...mockHeroProps} />
      </div>
    </div>
  ),
};

export const WithLocaleSwitcher: Story = {
  args: mockHeaderWithLocaleSwitcher,
};
