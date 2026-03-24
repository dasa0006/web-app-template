# Translation Files

This folder contains locale‑specific JSON files for internationalisation.

- `common.json` – strings that are identical across all languages (if any).
- `en.json` – English translations.
- `da.json` – Danish translations.

When you start a new project from this template, **you must populate these files** with your actual UI strings.

## Structure

Organise translations using **namespaces** (nested objects). Example:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "cta": {
    "title": "Ready to start?",
    "button": "Get started"
  }
}
```
