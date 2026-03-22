import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTA } from "./CTA";
import { mockCTAAccent, mockCTALight, mockCTAProps } from "./CTA.mocks";

const meta = {
  component: CTA,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = { args: mockCTAProps };
export const Accent: Story = { args: mockCTAAccent };
export const Light: Story = { args: mockCTALight };
