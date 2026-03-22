import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureGrid } from "./FeatureGrid";
import {
  mockFeatureGridProps,
  mockFeatureGridTwoCol,
} from "./FeatureGrid.mocks";

const meta = {
  component: FeatureGrid,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumn: Story = { args: mockFeatureGridProps };
export const TwoColumn: Story = { args: mockFeatureGridTwoCol };
