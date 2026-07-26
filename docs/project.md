# Project

## Purpose and users

Umbra is a project-neutral React UI package for a family of applications. It gives application
developers one source of truth for design tokens, theme behavior, reusable controls, and
proven structural shells.

Guzzler and QB are current consumers. They are also sources from which reusable patterns may
be identified, generalized, and promoted; their domain behavior does not become part of
Umbra.

## Current behavior

The package currently exports:

- a light/dark theme stylesheet and client-side theme provider
- shadcn-style primitives built primarily on Base UI
- application, settings-dialog, and settings-tab structural shells
- shared compound controls such as month selection and searchable filtering
- utilities and responsive hooks

Consumers install the repository as a dependency, import `umbra/theme.css`, wrap their UI with
`ThemeProvider`, and import the public API from `umbra`.

## Scope and constraints

Umbra owns behavior or presentation intended to remain consistent across applications.
Consumer repositories own their pages, navigation content, workflows, state, data access, and
domain-specific composition.

The package currently distributes TypeScript source rather than compiled artifacts. Consumers
therefore need compatible React, TypeScript/TSX, ESM, and Tailwind v4 tooling. Interactive
components use browser APIs and are not server-only modules.

Umbra has no backend, persistence layer, authentication system, production data, or standalone
application runtime.
