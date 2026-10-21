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
Navbar routes are `/`, `/about`, `/projects`, `/experience`, `/resume`, and `/contact`.
Project detail routes are `/projects/fire`, `/projects/riven-market`, and
`/projects/radar-pose`. Missing routes use `src/app/not-found.tsx`.

Following `references/folder_structure.md`, homepage components live in
`src/components/home`, project components in `src/components/projects`, portfolio
content in `src/data`, and helpers in `src/lib`. Existing reusable section components
remain in `src/components/sections`.

Pages contain starter copy. Add real biography, experience, contact details, and
project descriptions before publishing. The resume page links to
`public/Callahan_Mauricio_Resume.pdf` and embeds that PDF in an 800px-tall viewer
on desktop. Open and download buttons remain available on mobile, where the
embedded viewer is hidden. Replacing the PDF updates the viewer directly.
Asset directories are prepared
under `public/images`; unused diagrams and empty data modules are deferred until needed.

The small navigation test uses Node.js 22.18+ (native TypeScript stripping).
