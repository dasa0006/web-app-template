import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "./Section";
import {
  mockSectionDark,
  mockSectionProps,
  mockSectionSubtle,
} from "./Section.mocks";

const meta = {
  component: Section,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const White: Story = { args: mockSectionProps };
export const Subtle: Story = { args: mockSectionSubtle };
export const Dark: Story = { args: mockSectionDark };

export const AllSizes: Story = {
  args: { children: "Button" },
  render: () => (
    <div>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Section key={size} size={size} background="subtle">
          <p className="text-center text-sm font-mono text-zinc-500">
            size=&quot;{size}&quot;
          </p>
        </Section>
      ))}
    </div>
  ),
};
