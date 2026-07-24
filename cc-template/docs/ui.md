# UI

## Umbra UI Is the Shared Foundation

[Umbra UI](https://github.com/JedWag/umbra-ui) is the centralized source of truth for shared:

- design tokens
- typography, spacing, and visual rhythm
- reusable UI primitives
- theme behavior
- composite structural shells

Projects using this template rely on Umbra UI. Import and compose shared foundations from Umbra rather than recreating them locally.

## Ownership Boundary

A token, visual rule, primitive, theme behavior, or structural shell intended to remain consistent across applications belongs in Umbra UI.

The project repository owns its domain-specific screens, workflows, navigation content, state, data integration, and composition of Umbra primitives. Do not copy an Umbra component into the project to customize it. First determine whether the need belongs in the shared system or in project-specific composition around it.

## Project UI Structure

Document the project's pages, navigation, shells, dialogs, major component groups, and the paths where they are implemented.

_Update this section with concrete project-specific structure as the UI is built or reorganized._

## Project Workflows and Patterns

Document reusable project-level interaction patterns, domain workflows, validation behavior, feedback mechanisms, accessibility requirements, and state-management conventions.

_Update this section whenever a project-specific UI pattern becomes established or changes._

## Project Styling and Exceptions

Document narrowly scoped styling, assets, fonts, and overrides that are genuinely unique to the project. Explain why each exception belongs locally instead of in Umbra UI.

_Update this section whenever a project-specific style or justified Umbra exception is introduced, changed, or removed._
