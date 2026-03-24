import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import "../app/globals.css";
import { fontVariables } from "../lib/fonts";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      da: "Dansk",
    },
  },
  parameters: {
    nextIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider messages={nextIntl.messagesByLocale} locale="en">
        <div className={`${fontVariables} font-sans antialiased`}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
