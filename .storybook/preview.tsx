// .storybook/preview.tsx
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
    nextjs: {
      appDirectory: true, // ← enables the App Router mock
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
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
