# elaine-portfolio

> Personal portfolio website for Elaine — built with Vue 3 (composition API) and Vite, deployed on Firebase Hosting.

A single-page site that showcases my profile, technical skills, selected projects, experience,
achievements, and recent activities. The layout is a scrolling one-pager with sticky navigation,
a dark-mode toggle, subtle scroll-in animations, and a decorative animated background.

## Live Site

Hosted on Firebase Hosting. Firebase project id: `elaine-website` (see `.firebaserc`).
Once deployed via `firebase deploy`, the site is served at the default Firebase Hosting URL:
`https://elaine-website.web.app`.

## Screenshots

> Placeholder — drop images here after the next deploy.

| Section | Screenshot |
|---|---|
| Hero (top) | _add `docs/hero.png`_ |
| About / Skills | _add `docs/about.png`_ |
| Projects | _add `docs/projects.png`_ |
| Dark mode | _add `docs/dark.png`_ |

## Tech Stack

- **Vue 3.5** with `<script setup>` composition API (no options-API components).
- **Vite 6** as dev server + build tool (single `@vitejs/plugin-vue` plugin, see `vite.config.js`).
- **Firebase Hosting** for static hosting; SPA rewrites configured so any path serves `index.html`.
- Vanilla CSS (no Tailwind / no UI framework) in `src/style.css`.
- Zero runtime dependencies beyond `vue`.

## Repository Layout

```
elaine-portfolio/
├── index.html              # Vite entry — mounts <div id="app">
├── vite.config.js          # Vite config with @vitejs/plugin-vue
├── firebase.json           # Firebase Hosting: public=dist, SPA rewrite → index.html
├── .firebaserc             # Firebase project alias (default: elaine-website)
├── package.json            # scripts: dev / build / preview
├── public/                 # static assets served as-is
│   ├── photo.jpg
│   ├── achievements/       # award / cert images
│   ├── activities/         # event photos
│   └── projects/           # project cover images
└── src/
    ├── main.js             # createApp, registers global v-reveal directive
    ├── App.vue             # root component: nav, sections, dark mode, particle bg
    ├── style.css           # global styles (light + dark theme)
    ├── components/         # one .vue per page section
    ├── composables/        # reusable hooks
    ├── directives/         # custom Vue directives
    └── data/               # static content (profile, projects, achievements, activities)
```

## Component Structure

Each section is a self-contained SFC under `src/components/`. `App.vue` composes them in order:

| File | Role |
|---|---|
| `HeroSection.vue` | Top hero with name, tagline, photo, and CTA scroll-to buttons |
| `AboutSection.vue` | "About me" bio + key stats (`useCounter` animated numbers) |
| `SkillsSection.vue` | Grouped skill badges driven by `data/profile.js#skillGroups` |
| `ProjectsSection.vue` | Portfolio cards driven by `data/projects.js` |
| `ExperienceSection.vue` | Work / education timeline + certificates |
| `AchievementsSection.vue` | Awards, competitions, honors from `data/achievements.js` |
| `ActivitiesSection.vue` | Talks, workshops, events from `data/activities.js` |
| `ContactSection.vue` | Contact links (email, GitHub, LinkedIn, etc.) |

Supporting modules:

- `composables/useActiveSection.js` — IntersectionObserver hook that keeps the nav bar
  highlight in sync with the section currently in view.
- `composables/useCounter.js` — animates a numeric value from 0 to a target on mount.
- `directives/reveal.js` — global `v-reveal` directive that adds a `.reveal-in` class
  when the element scrolls into the viewport (used across sections for fade-in effects).
- `data/*.js` — pure ES modules exporting the content arrays; edit these to update
  the site without touching component markup.

## Development

Requires **Node.js 18+**.

```bash
npm install       # install vue, vite, @vitejs/plugin-vue
npm run dev       # start Vite dev server (default http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # serve the built dist/ locally for smoke-test
```

### Editing content

- Change hero copy / bio → `src/data/profile.js`
- Add / update a portfolio card → `src/data/projects.js`
- Add an award or certification → `src/data/achievements.js`
- Log a talk or event → `src/data/activities.js`
- Adjust colors, typography, dark-mode variables → `src/style.css`

### Dark mode

Toggle is in the top nav. Preference is persisted in `localStorage` under the key
`theme` (`"dark"` or omitted). The `dark` class is applied on `<html>`, so all CSS
variables in `style.css` can be overridden inside `.dark { … }` blocks.

## Deployment

Firebase Hosting is configured in `firebase.json`:

- `public`: `dist` (the Vite build output)
- SPA rewrite: any path → `/index.html`
- Ignores `firebase.json`, dotfiles, and `node_modules/`

Deploy with the Firebase CLI:

```bash
# one-time setup
npm install -g firebase-tools
firebase login

# each release
npm run build
firebase deploy --only hosting
```

To deploy to a different Firebase project, either edit `.firebaserc` or run
`firebase use <project-id>` before `firebase deploy`.

## What Is Not in the Repo

The `.gitignore` excludes:

- `node_modules/` — restore via `npm install`
- `dist/` — regenerated by `npm run build`
- `.env`, `.env.local`, `.env.*.local` — no secrets are needed for the current build,
  but the ignore rule is in place if any are added later
- Editor / OS junk: `.vscode/`, `.idea/`, `.claude/`, `.DS_Store`, `desktop.ini`, `Thumbs.db`, `*.log`
- Firebase local cache under `.firebase/` is committed only insofar as `hashes` files;
  build artifacts are re-uploaded on each deploy.

## License

Personal / educational use. Content (photos, bio, project descriptions) is © Elaine —
please do not reuse the personal media without permission. Code scaffolding is
straightforward Vue + Vite and may be referenced freely.
