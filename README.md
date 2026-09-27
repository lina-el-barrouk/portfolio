# Lina El Barrouk — Portfolio

A Vite + React + Framer Motion portfolio using the burgundy / blush / ivory visual direction.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## First things to customize

1. Replace the hero photo placeholder in `src/main.jsx` with Lina's portrait.
2. Update the LinkedIn and GitHub URLs in `src/main.jsx`.
3. Replace the placeholder email `hello@linaelbarrouk.dev` with the preferred contact email.
4. Replace the three CSS project mockups with real project screenshots when available.
5. Update the `journeyItems` array in `src/main.jsx` to customize the detailed pages opened from the “FROM CODE TO SECURITY” timeline.

## Journey timeline pages

Each point in the “FROM CODE TO SECURITY” timeline opens an internal detailed page. The content and URL slug for each page are defined in the `journeyItems` array in `src/main.jsx`.

For each entry, customize:

- `overview` for the main introduction;
- `skills` for the skills developed;
- `experiences` for the key experiences or projects;
- `goals` for the next objective;
- `modules` for the list of academic modules studied;
- `institutionName` for the name of the institution;
- `institutionLink` for the official link to the institution.

The URLs use hash routing, for example: `#/journey/bachelor-idai`. This works in a static Vite deployment without additional server configuration.
