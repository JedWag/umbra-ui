# UI

## Shared ownership

Umbra is the source of truth for shared:

- design tokens, fonts, and theme behavior
- typography, spacing, and visual rhythm
- reusable primitives and compound controls
- structural shells whose geometry should match across applications

A consumer owns domain-specific screens, navigation content, workflows, state, data
integration, and composition of Umbra pieces.

## Extraction boundary

Guzzler, QB, and other consumers may contain patterns worth promoting. Treat their running
code and verified references as evidence, then produce a project-neutral Umbra API.

Promote a responsibility when it should remain synchronized across applications. Keep it
local when it encodes a domain entity, workflow, data contract, or one-application layout.
After promotion, replace the originating project's local copy with composition around the
shared export.

Do not copy an Umbra component back into a consumer to customize it. Decide whether the
variation belongs in a shared prop or slot, or in consumer-owned composition around the
component.

## Composition rules

Use an existing structural shell when it owns the needed geometry. `AppShell` standardizes
the sidebar/header/content frame. `SettingsDialogShell` and `SettingsTabSection` standardize
the settings surface while accepting project-specific tabs and content.

Containers own spacing; text elements do not carry outer vertical margins. Prefer established
gaps and shared component presets over one-off utility combinations.

All public UI is exported through `src/index.ts`. Consumers import from `umbra`, not internal
source paths.

## Theme foundation

`src/styles/theme.css` is authoritative for Outfit fonts, semantic light and dark tokens,
shared status colors, Tailwind mappings, and base element styles. Its `@source` rule lets
Tailwind v4 scan Umbra when installed under `node_modules`.

The runtime theme names are `light` and `dark`. `ThemeProvider` persists the selection under
its configurable storage key and otherwise follows `prefers-color-scheme`.

The content canvas is deliberately composited: `AppShell` applies `bg-muted/40` instead of
introducing a separate flat background token.

## Typography and spacing

Use the implemented component styles and existing Tailwind scale instead of arbitrary
near-duplicates:

- `text-2xl font-semibold tracking-tight` for page or product titles
- `text-lg` for dialog and section titles
- `text-base` for navigation and mobile form text
- `text-sm` for controls, labels, body text, and tables
- `text-xs` for compact metadata and constrained navigation

Inputs and textareas intentionally use `text-base md:text-sm`: 16px mobile text avoids browser
focus zoom, while desktop uses the normal 14px control size.

Containers own spacing. Do not add outer vertical margins to headings, paragraphs, or labels.
Use `gap-1` or `gap-2` for tight relationships, `gap-4` for fields and content groups, and
`gap-6` or `gap-8` for major sections. Shared dialogs use `p-6` and `gap-6`; cards derive
their padding from `--card-spacing`; `AppShell` uses a 56px sticky header and `p-6` content.

## Structural shells

`AppShell` owns the sidebar provider, rounded inset content panel, sticky header, sidebar
trigger, separator, settings action, theme action, and composited canvas. Consumers supply
the sidebar, settings handler, optional additional header actions, and page content.

`SettingsDialogShell` owns the wide, top-positioned settings dialog, responsive tab ribbon,
scrollable panels, and split Cancel/Save footer. `SettingsTabSection` supplies the standard
title/action row and scrollable content region inside a tab.

These shells expose content slots while retaining shared geometry. Consumers compose domain
content into those slots rather than forking the shell.

## Public component families

The current barrel includes:

- theme provider, theme toggle, toaster, responsive hook, and `cn`
- `AppShell`, `SettingsDialogShell`, and `SettingsTabSection`
- `MonthField` and `SearchDropFilter`
- buttons and action presets, badges, cards, dialogs, tables, tabs, and sidebar primitives
- inputs, textareas, labels, checkboxes, radio groups, selects, command menus, dropdowns,
  popovers, sheets, separators, skeletons, and tooltips

Shared blue, green, orange, and red status pairs live in CSS variables. Components consume
those variables for borders, text, and tinted backgrounds; consumers should not repeat their
underlying color formulas.

The shared mobile breakpoint is 768px. Below it, the sidebar becomes a sheet and desktop inset
margins and rounding no longer apply. Settings tabs use smaller labels and a taller row on
narrow screens.

## Accessibility and interaction

Preserve the accessible behavior supplied by Base UI primitives. Icon-only actions require an
accessible label. Dialogs use explicit action footers; the corner close button is hidden by
default. Inputs and textareas disable browser autocomplete by default but allow consumers to
override it.

Interactive components rely on a browser environment. Validate keyboard, focus, responsive,
and theme behavior in a consuming application when changing them.
