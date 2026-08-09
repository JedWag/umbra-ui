# Project

## Purpose and Users

Umbra is a project-neutral React UI package for a family of applications. It gives application developers one source of truth for design tokens, theme behavior, reusable controls, and proven structural shells.

Consuming applications use Umbra as shared infrastructure. They are also where unproven UI begins before a responsibility and project-neutral API are understood well enough to promote here.

## Current Behavior

The package exports a light/dark theme provider and stylesheet, shadcn-style primitives built primarily on Base UI, structural application and settings shells, compound month and searchable-filter controls, action presets, utilities, and a responsive hook used by the sidebar.

Consumers install the repository, import `umbra/theme.css`, wrap their UI with `ThemeProvider`, and import the supported public API from `umbra`.

## Scope and Constraints

Umbra owns behavior and presentation intended to remain consistent across applications. Consumers own pages, navigation content, workflows, state, data access, and domain-specific composition.

The package distributes raw TypeScript/TSX and CSS rather than compiled artifacts. Consumers therefore need compatible ESM, React 19, TypeScript/TSX, and Tailwind 4 tooling. Interactive components rely on browser APIs and are not server-only modules.

Umbra has no backend, router, authentication system, standalone runtime, or domain workflow. New shared APIs must remain project-neutral and be exported through `src/index.ts`.

## Important Data

Umbra contains no production or domain data. Persisted browser state is limited to UI preferences: `ThemeProvider` stores the theme in `localStorage`, and `SidebarProvider` stores expanded/collapsed state in a cookie. Consumers remain responsible for their own application data and its safety.
