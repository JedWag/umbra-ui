# Why root vs. `docs/`

General convention across most JS/TS (and largely language-agnostic) repos:

## Root-level files

Things a person or tool needs *before* they even open the code:

- `README.md` — the front door. What the project is, install steps, quickstart.
  GitHub renders it automatically on the repo homepage; npm renders it on the
  package page. It has to be at root because tooling looks for it there by
  convention, not configuration.
- `LICENSE` — legal, always root, tools scan for it there.
- `CHANGELOG.md` — version history, root by convention (some tools like
  `npm version` hooks expect it there).
- `CONTRIBUTING.md` — how to submit PRs/issues, root so GitHub links to it
  automatically from the "New PR" flow.
- Config files (`package.json`, `tsconfig.json`, `.gitignore`) — root because
  build tools look for them there, not a convention you can bend.

## `docs/`

Everything else: design rationale, architecture decision records, deep API
references, migration guides. This directory has no special tooling meaning —
it's purely "stuff a human might want to read, but not on the first screen."
The convention exists so the root directory listing (`ls`) stays short and
scannable — a newcomer sees 5-10 entry-point files, not 40 markdown files
competing for attention.

## The split, applied to this repo

- `README.md` = "how do I install this and what are the rules I must not
  break" (short, action-oriented).
- `docs/DESIGN-SYSTEM.md` = "why does it look this way, here's the full color
  math and historical context" (long, reference-oriented, read occasionally
  not every time).

## Other common `docs/` subdivisions (bigger projects, not needed here)

- `docs/adr/` — architecture decision records, one file per decision
- `docs/api/` — generated reference
- `docs/guides/` — task-oriented how-tos
