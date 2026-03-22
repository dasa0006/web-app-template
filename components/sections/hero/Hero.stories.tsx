import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";
import { mockHeroLeft, mockHeroMinimal, mockHeroProps } from "./Hero.mocks";

const meta = {
  component: Hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = { args: mockHeroProps };
export const LeftAligned: Story = { args: mockHeroLeft };
export const Minimal: Story = { args: mockHeroMinimal };
