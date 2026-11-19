# React Movies – AWS Assignment 2

A React 19 + Vite movie discovery application using the TMDB API.

## Features in this project

- Discover, popular, upcoming, top-rated and now-playing movie lists
- Movie detail, recommendation, credits and actor pages
- Favourites, playlists and user-written reviews (currently held in React context)

## Requirements

- Node.js compatible with the Vite version in `package.json`
- npm
- A TMDB API key

## Local setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env.local` and replace the placeholder with your TMDB API key:

   ```dotenv
   VITE_TMDB_KEY=your_actual_tmdb_api_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Create a production build:

   ```bash
   npm run build
   ```

The production files are written to `dist/`.

## Apache deployment notes

The `public/.htaccess` file is copied into `dist/.htaccess` by Vite. It provides a fallback to `index.html` for React Router routes such as `/movies/popular` and `/actors/123`.

For this rule to work, Apache must have `mod_rewrite` enabled and the site's `<Directory>` configuration must allow `.htaccess` overrides (for example, `AllowOverride All`). After deploying the contents of `dist/` into the Apache document root, test both `/` and a nested route directly in the browser.

## Important configuration and security notes

- Vite exposes variables prefixed with `VITE_` in the browser bundle. The TMDB key is therefore not a server-side secret. Do not put passwords, AWS credentials, or other secrets in `VITE_` variables.
- `.env.local` is ignored by Git. Never commit it or include it in the assignment ZIP.
- Favourites, playlists and reviews are currently stored in React Context state, not in a shared database. They do not currently persist across a page refresh and are not shared between browser sessions or EC2 instances. This is a known limitation to describe or improve for the assignment.
- The project currently has a small `localStorage` write in `src/pages/homePage.jsx`, but this does not persist the Context state used by the favourites, playlists and reviews features.
