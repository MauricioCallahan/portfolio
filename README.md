# Portfolio

Next.js App Router, TypeScript, and plain CSS.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Checks and production

```sh
npm run typecheck
npm run build
npm start
```

The home page is `src/app/page.tsx`. Shared styles live in `src/app/globals.css`,
and design tokens live in `src/styles/tokens.css`, based on `references/DESIGN.md`.
The components in `src/components` provide the requested UI, layout, and section
structure; the home page uses a floating Navbar and a rounded introduction Hero.
