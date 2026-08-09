# Architecture

## Stack

Umbra is an ESM React 19 and TypeScript source package styled with Tailwind CSS 4 classes. Its component layer uses Base UI, class-variance-authority, Lucide icons, cmdk, React DayPicker, date-fns, and Sonner. The `cn` utility combines `clsx` with `tailwind-merge`.

React and React DOM are peer dependencies. TypeScript runs in strict, isolated, no-emit mode for `src/`.

## System Boundaries

`package.json` exposes two package entry points: `umbra` resolves to `src/index.ts`, and `umbra/theme.css` resolves to `src/styles/theme.css`. The package ships `src/` and `README.md`; consumers compile the source and generate its Tailwind styles.

`src/index.ts` is the supported public TypeScript barrel. The primitive layer owns shared interaction wrappers and visual defaults. Compound components and shells own reusable geometry and browser UI behavior. Consuming applications own routing, domain state, data access, and feature composition.

## Data and Request Flow

During consumer builds, the application compiler resolves TypeScript exports from the barrel and Tailwind scans installed TS/TSX through the stylesheet's `@source` directive. There is no server request flow.

At runtime, component props and callbacks cross the consumer/Umbra boundary. `ThemeProvider` reads a valid stored theme or the OS preference, applies `.dark` to the document root, and persists later changes. `SidebarProvider` coordinates desktop and mobile state, persists its desktop state cookie, and handles its keyboard shortcut. Other controls keep only transient interaction state such as open popovers.

## External Integrations

GitHub is the current package source. npm installs the Git repository or a temporary sibling checkout. Runtime integrations are limited to the declared React/UI packages and browser APIs; Umbra contains no external service or network client.

## Directory Layout

- `src/index.ts` — supported public TypeScript barrel.
- `src/styles/theme.css` — fonts, semantic tokens, Tailwind mappings, source scanning, and base styles.
- `src/components/ui/` — reusable primitives and action presets.
- `src/components/` — compound controls and structural shells.
- `src/lib/theme-provider.tsx` — runtime theme state and persistence.
- `src/lib/utils.ts` — Tailwind-aware class composition.
- `src/hooks/` — shared browser hooks.
- `components.json` — shadcn generator configuration.
- `package.json` and `package-lock.json` — package metadata and locked dependencies.
- `tsconfig.json` — strict no-emit validation configuration.
- `docs/` — current project documentation.
