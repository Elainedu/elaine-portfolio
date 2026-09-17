# elaine-portfolio

Personal portfolio website built with Vue 3 + Vite. Deployed via Firebase Hosting.

## Tech Stack
- Vue 3 (`<script setup>` composition API)
- Vite 6
- Firebase Hosting (see `firebase.json`)

## Quick Start
```bash
npm install
npm run dev       # dev server
npm run build     # build to dist/
npm run preview   # preview built site
```

## Structure
- `src/` — Vue components, entry
- `public/` — static assets served as-is
- `dist/` — build output (gitignored)
- `firebase.json` — Firebase Hosting config

## Deploy
```bash
npm run build
firebase deploy
```

## License
Personal use.
