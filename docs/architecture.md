# Architecture

## Stack

Umbra is an ESM React 19 and TypeScript source package. Its UI is built with Tailwind CSS 4
classes, Base UI primitives, class-variance-authority, Lucide icons, cmdk, React DayPicker,
date-fns, and Sonner. `clsx` and `tailwind-merge` are combined by the `cn` utility.

React and React DOM are peer dependencies. The package does not contain a server, router,
database, bundler, or application entry point.

## Package boundary

`package.json` exports two entry points:

- `umbra` resolves to `src/index.ts`
- `umbra/theme.css` resolves to `src/styles/theme.css`

`src/index.ts` is the single public TypeScript barrel. Files not exported there are internal,
even if a consumer could technically reach them through a checkout.

The package's `files` list includes `src/` and `README.md`. Distribution currently ships raw
TypeScript and CSS, leaving transpilation and Tailwind generation to the consuming
application.

## Component layers

- `src/components/ui/` contains reusable primitives and small presets.
- `src/components/` contains compound controls and structural shells.
- `src/lib/theme-provider.tsx` owns runtime theme state and persistence.
- `src/lib/utils.ts` owns Tailwind-aware class composition.
- `src/hooks/` contains shared browser hooks.
- `src/styles/theme.css` owns fonts, tokens, Tailwind mappings, and base styles.

Structural shells accept consumer-controlled slots and callbacks while keeping shared
geometry internal. This is the main boundary between Umbra's platform responsibility and
application-specific composition.

## Client-side flow

The consumer imports the theme stylesheet during CSS assembly and imports components from the
barrel during application compilation. At runtime, `ThemeProvider` reads and writes
`localStorage` and toggles `.dark` on the document root. Other interactive components may use
`window`, `document`, cookies, media queries, or DOM events.

## External integrations

There are no network service integrations. GitHub currently acts as the package source.
Tailwind v4 scans installed component source through the `@source` directive in
`src/styles/theme.css`.

## Repository layout

- `src/` — package source and public barrel
- `docs/` — durable project, development, architecture, UI, design, distribution, and
  decision documentation
- `assets/examples/` — ignored reference captures used for visual comparison, not package
  contents or public API
- `components.json` — shadcn generator configuration
- `package.json` and `package-lock.json` — package metadata and locked dependencies
- `tsconfig.json` — strict no-emit validation for `src/`
