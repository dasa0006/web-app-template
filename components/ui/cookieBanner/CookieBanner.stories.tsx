import { ConsentProvider } from "@/components/providers/ConsentProvider";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CookieBanner } from "./CookieBanner";

// Wrap each story in a fresh ConsentProvider so the banner always renders
// regardless of any cookie set in the browser during Storybook development.
const meta = {
  component: CookieBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Slides up from the bottom on first visit. Disappears once the user accepts or declines. Wired to `ConsentProvider` — analytics only load after acceptance.",
      },
    },
  },
  decorators: [
    (Story) => (
      // key={Math.random()} forces remount so the slide-in animation replays
      <div className="min-h-64 relative">
        <ConsentProvider>
          <Story />
        </ConsentProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
