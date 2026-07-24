# CLAUDE.md

## Conventions

- **Push after every change** — after every edit, run `git add -A`, write a commit message derived from the diff, and push. This includes the user's own uncommitted changes — never push only Claude's changes.
- **Talk before planning** — for any non-trivial problem, have a back-and-forth conversation to work through the solution together before writing a plan. Do not rush to plan mode. The user needs to be able to bounce ideas and push back before anything is locked in.
- **Act only when told** — do not make changes mid-conversation based on observations or implications. Finish the discussion, then act when the user says go.
- **Use the simplest command form** — never reach for a more complex variant (e.g. `git -C <path>`) when a simpler form (e.g. `git add`) already works and is covered by permissions. The working directory is already set; use it.
- **Cheap model for simple subagents** — when spawning a subagent (Agent tool) for exploration, file search, or other simple lookup work, always pass `model: "haiku"`. Only use the default/heavier model when the subagent must do real reasoning, design, or multi-step implementation.
- **Number suggestions** — when presenting multiple suggestions, options, or questions, number them so the user can respond by number without retyping them.

---

## Guidelines

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

## Repository Documentation

Start with the document directly relevant to the current task. Consult additional documents only when the task crosses those boundaries.

When making a project change, update the relevant document if that change affects its contents. Update the document's short snapshot below only when its scope or responsibilities change.

- `docs/project.md` — project purpose, users, current behavior, constraints, and important data warnings.
- `docs/development.md` — setup, local runtime, build, test, lint, and development workflow.
- `docs/architecture.md` — stack, system boundaries, code organization, data flow, integrations, and directory layout.
- `docs/database.md` — schema source of truth, data model, relationships, lifecycle, migrations, and data-handling rules.
- `docs/ui.md` — permanent Umbra UI ownership rules plus project-specific UI composition, workflows, and exceptions.
- `docs/deployment.md` — environments, serving model, hosting, configuration, security, operations, and open deployment choices.
- `docs/decisions.md` — settled project decisions, their context and rationale, and the conditions for revisiting them.
