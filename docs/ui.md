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

## Public component families

The current barrel includes:

- theme provider, theme toggle, toaster, responsive hook, and `cn`
- `AppShell`, `SettingsDialogShell`, and `SettingsTabSection`
- `MonthField` and `SearchDropFilter`
- buttons and action presets, badges, cards, dialogs, tables, tabs, and sidebar primitives
- inputs, textareas, labels, checkboxes, radio groups, selects, command menus, dropdowns,
  popovers, sheets, separators, skeletons, and tooltips

See `docs/DESIGN-SYSTEM.md` for detailed implemented styling and structural invariants.

## Accessibility and interaction

Preserve the accessible behavior supplied by Base UI primitives. Icon-only actions require an
accessible label. Dialogs use explicit action footers; the corner close button is hidden by
default. Inputs and textareas disable browser autocomplete by default but allow consumers to
override it.

Interactive components rely on a browser environment. Validate keyboard, focus, responsive,
and theme behavior in a consuming application when changing them.
