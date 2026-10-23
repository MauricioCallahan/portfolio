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
npm test
npm run build
npm start
```

The home page is `src/app/page.tsx`. Shared styles live in `src/app/globals.css`,
and design tokens live in `src/styles/tokens.css`, based on `references/DESIGN.md`.
The root layout shares the navbar, main container, and footer across all pages.
Navbar routes are `/`, `/about`, `/projects`, `/experience`, and `/contact`.
Project detail routes are `/projects/fire`, `/projects/riven-market`, and
`/projects/radar-pose`. Missing routes use `src/app/not-found.tsx`.

Following `references/folder_structure.md`, homepage components live in
`src/components/home`, project components in `src/components/projects`, portfolio
content in `src/data`, and helpers in `src/lib`. Existing reusable section components
remain in `src/components/sections`.

Some pages contain starter copy. Review remaining project descriptions and
contact content before publishing. `/experience` renders the interactive HTML
resume from `src/data/resume.ts`; `/resume` permanently redirects to `/experience`.
On desktop, the centered
overview moves left and stays sticky as the details scroll, highlighting the
current entry. Narrow or short viewports use a single-column layout. All content
remains readable without JavaScript; reduced motion disables movement animation
and smooth scrolling. The PDF open/download links use
`public/Callahan_Mauricio_Resume.pdf`. When updating the resume, update both the
ordered dataset and the PDF to keep their facts and ordering consistent.
Asset directories are prepared
under `public/images`; unused diagrams and empty data modules are deferred until needed.

The navigation and resume tests use Node.js 22.18+ (native TypeScript stripping).
For optional browser checks, make Playwright available to Node (installed locally
or via `NODE_PATH`) and have Microsoft Edge installed. Start the app on
`127.0.0.1:3000`, then run `node tests/navigation.browser.mjs` to check the sliding
navbar on desktop, wrapped mobile layouts, and with reduced motion.
