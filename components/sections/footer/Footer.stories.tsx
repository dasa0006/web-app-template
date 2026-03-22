import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";
import { mockFooterMinimal, mockFooterProps } from "./Footer.mocks";

const meta = {
  component: Footer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = { args: mockFooterProps };
export const Minimal: Story = { args: mockFooterMinimal };
