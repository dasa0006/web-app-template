import da from "../messages/da.json";
import en from "../messages/en.json";

const messagesByLocale: Record<string, unknown> = { en, da };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;
