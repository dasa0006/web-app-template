// .storybook/preview.tsx (Addon version - no manual provider)
import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: nextIntl.defaultLocale,
    locales: {
      en: "English", 
      da: "Dansk",
    },
  },
  parameters: {
    nextIntl, // Addon handles the provider automatically
    nextjs: { appDirectory: true },
  },
  // No decorators needed - the addon provides them
};

export default preview;