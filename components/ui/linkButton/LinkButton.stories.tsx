import { Meta, StoryObj } from "@storybook/nextjs-vite";
import LinkButton from "./LinkButton";
import {
  backgrounds,
  backgroundStyles,
  defaultArgs,
  variants,
} from "./LinkButton.mocks";

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  args: defaultArgs,
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    background: {
      control: "select",
      options: backgrounds,
    },
    href: {
      table: {
        disable: true,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

// ─── Interactive Playground ──────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Visual Matrix (All combinations) ────────────────────────────────────────

export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {backgrounds.map((bg) => (
        <div key={bg}>
          <p className="text-text-primary mb-3 text-xs font-bold uppercase tracking-wider">
            On {bg} background
          </p>
          <div className={backgroundStyles[bg ?? "white"]}>
            <div className="flex flex-wrap items-center gap-4">
              {variants.map((variant) => (
                <LinkButton
                  key={`${bg}-${variant}`}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                  href="/example"
                  variant={variant}
                  background={bg}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    // Prevent Storybook's default white background from hiding dark/accent swatches
    backgrounds: { disable: true },
  },
};

// ─── Individual States ───────────────────────────────────────────────────────

export const OnWhite: Story = {
  render: () => (
    <div className={backgroundStyles.white}>
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((variant) => (
          <LinkButton
            key={variant}
            label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            href="/example"
            variant={variant}
            background="white"
          />
        ))}
      </div>
    </div>
  ),
  parameters: { backgrounds: { disable: true } },
};

export const OnDark: Story = {
  render: () => (
    <div className={backgroundStyles.dark}>
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((variant) => (
          <LinkButton
            key={variant}
            label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            href="/example"
            variant={variant}
            background="dark"
          />
        ))}
      </div>
    </div>
  ),
  parameters: { backgrounds: { disable: true } },
};

export const OnAccent: Story = {
  render: () => (
    <div className={backgroundStyles.accent}>
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((variant) => (
          <LinkButton
            key={variant}
            label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            href="/example"
            variant={variant}
            background="accent"
          />
        ))}
      </div>
    </div>
  ),
  parameters: { backgrounds: { disable: true } },
};
