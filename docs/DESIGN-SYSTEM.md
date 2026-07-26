# Design System

This document records the rationale and invariants behind Umbra's implemented theme and
structural UI. The source under `src/` remains authoritative; consuming projects import the
package rather than copying values or components from this reference.

## Theme foundation

`src/styles/theme.css` owns the shared theme layer:

- Outfit weights 400, 500, and 600 plus a metric-matched Arial fallback
- semantic light tokens on `:root`
- semantic dark tokens on `.dark`
- shared chart, sidebar, border, input, and status-color variables
- Tailwind mappings and base element styles
- `@source "../**/*.{ts,tsx}"` so Tailwind v4 scans installed Umbra source

The package calls the runtime themes `light` and `dark`. `ThemeProvider` persists that value
under its configurable `storageKey`; when no valid value is stored, it follows
`prefers-color-scheme`.

The canvas behind content is a composition: `AppShell` applies `bg-muted/40` to its main
content region instead of introducing another flat background token.

## Typography

Use the shipped semantic components and existing Tailwind scale rather than introducing
near-duplicate arbitrary sizes.

| Class | Intended role |
|---|---|
| `text-2xl font-semibold tracking-tight` | page or product title |
| `text-lg` | dialog or section title |
| `text-base` | navigation and mobile form text |
| `text-sm` | default controls, labels, body, and tables |
| `text-xs` | compact metadata and constrained navigation labels |

Inputs and textareas intentionally use `text-base md:text-sm`: mobile remains at 16px to avoid
focus zoom while desktop uses the normal 14px control size. Available font weights are normal,
medium, and semibold.

## Spacing and rhythm

Containers own spacing. Do not add outer vertical margins directly to headings, paragraphs,
or labels.

- `gap-1` and `gap-2` join tightly related text or label/control pairs.
- `gap-4` separates fields and normal content groups.
- `gap-6` and `gap-8` separate major sections.
- Shared dialogs use `p-6` and `gap-6`.
- Cards derive their padding from `--card-spacing`, normally `--spacing(4)`.
- `AppShell` uses a 56px sticky header and `p-6` content area.

When an existing structural component owns a spacing relationship, use that component rather
than recreating its layout in a consumer.

## Structural shells

`AppShell` owns the sidebar provider, rounded inset content panel, sticky header, sidebar
trigger, separator, settings action, theme action, and composited canvas. Consumers supply the
sidebar, settings handler, optional additional header actions, and page content.

`SettingsDialogShell` owns the wide, top-positioned settings dialog, responsive tab ribbon,
scrollable panels, and split Cancel/Save footer. Each panel can use `SettingsTabSection` for a
title/action row above scrollable content.

These shells intentionally expose content slots while retaining shared geometry. A consumer
should compose domain content into the slots rather than fork the shell.

## Components and controls

- Buttons use the default, outline, secondary, and text variants with fixed height presets.
- `IconButton` fixes the common text-style, icon-only pairing.
- `WarningButton`, `SuccessButton`, and `DangerButton` own the orange, green, and red status
  treatments.
- `DialogSplitFooter` and `DialogTriFooter` provide standard action layouts with overridable
  slots.
- Cards, tables, tabs, sidebar pieces, menus, popovers, sheets, form controls, and tooltips
  provide the shared primitive layer.
- `MonthField` and `SearchDropFilter` are project-neutral compound controls.
- `Toaster` reads the active Umbra theme and uses the shared tokens.

The definitive public surface is `src/index.ts`.

## Status colors

Shared blue, green, orange, and red pairs are CSS variables. Each pair contains a border/text
color and a tinted background suitable for badges and actions. Components consume these
variables; applications should not repeat the underlying color formulas.

## Responsive behavior

The shared mobile breakpoint is 768px. The sidebar changes to a sheet below that width, and
the desktop inset margins and rounding no longer apply. Settings tabs use smaller labels and a
taller tab row on narrow screens.

## Consumer exceptions

A consumer owns styling only when it expresses its domain or a genuinely application-specific
composition. A visual rule meant to stay aligned across consumers belongs in Umbra. Document
any local exception in the consumer repository, including why promotion to Umbra would be
incorrect.
