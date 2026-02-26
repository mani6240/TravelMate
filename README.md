# TravelMate - React Conversion (Vite)

This folder contains a React conversion of the existing static site. Styles and assets were kept intact to preserve the UI.

Quick start:

1. Open a terminal in `react/`
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

Notes:
- The original `styles.css` is in `public/styles.css` and is loaded from root `index.html`.
- Core client-side managers (user, trips, wishlist) are in `src/lib/managers.js`.
- `src/pages` contains converted pages and app features built with React components.
