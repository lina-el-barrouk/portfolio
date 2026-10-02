# Lina El Barrouk — Portfolio

A Vite + React + Framer Motion portfolio using the burgundy / blush / ivory visual direction.

## Run locally

```bash
npm install
npm run server   # admin API (port 3001)
npm run dev      # frontend (port 5173)
```

Then open the local URL shown by Vite.

## Admin content management

An admin area is available at `#/admin` (link in the footer). It lets you add:

- **Projects** (appended to the "Featured Work" section);
- **Journey items** (appended to the "From Code to Security" timeline, with a detail page);
- **Community actions** (appended to the "Beyond the Terminal" section).

Each tab also lists the entries you added with a **SUPPRIMER** button — click it twice
(a second "CONFIRMER ?" click) to delete an entry. Only admin-added content can be deleted;
the built-in entries stay untouched.

Entries are stored in `server/data.json` by a small zero-dependency Node API (`npm run server`).
Default credentials are `admin` / `admin123` — change them with the `ADMIN_USERNAME` and
`ADMIN_PASSWORD` environment variables before deploying. The site still works without the API
(e.g. static hosting): only admin-added content disappears.

In production, serve the API behind the same domain as the site, or set `VITE_API_URL`
(for example `VITE_API_URL=https://api.example.com npm run build`).

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
