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

An admin area is available at `#/admin` (link in the footer). Each tab manages one
part of the site — built-in content included:

- **Projects** ("Featured Work" section);
- **Journey items** ("From Code to Security" timeline, with a detail page);
- **Community actions** ("Beyond the Terminal" section).

Project and community forms include two extra fields — **PHOTOS** and **VIDÉOS** (one URL
per line). Videos can be YouTube/Vimeo links (embedded automatically) or direct file URLs.

Every entry — built into the site or added later — can be **MODIFIER** (the form is
prefilled with its current values) or **SUPPRIMER** (click it twice: a second
"CONFIRMER ?" click confirms the deletion). Built-in entries are never altered in the
source: the API stores edits as `overrides` and removals as `deleted` markers in
`server/data.json`, so a static deployment without the API always falls back to the
original content.

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

## Project & community detail pages

Clicking a project card or a community action card opens a dedicated detail page
(`#/project/<id>` and `#/community/<id>`) with the full text plus a **GALERIE — PHOTOS &
VIDÉOS** section rendering the entry's `images` and `videos` arrays. When an entry has no
media, the gallery section is simply hidden. The content comes from the `projects` and
`volunteerProjects` arrays in `src/main.jsx`, merged with admin overrides.

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
