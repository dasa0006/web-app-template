import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";
import { mockHeadingProps } from "./Heading.mocks";

const meta = {
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockHeadingProps,
};
