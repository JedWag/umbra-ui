# GEMINI.md

## Conventions

- **Use `gush` after every change** — after every edit, follow the `gush` skill to inspect, stage, commit, push, and verify the complete working tree, including the user's existing changes.
- **Talk before planning** — for any non-trivial problem, have a back-and-forth conversation to work through the solution together before writing a plan. Do not rush to plan mode. The user needs to be able to bounce ideas and push back before anything is locked in.
- **Act only when told** — do not make changes mid-conversation based on observations or implications. Finish the discussion, then act when the user says go.
- **Use the simplest command form** — never reach for a more complex variant (e.g. `git -C <path>`) when a simpler form (e.g. `git add`) already works and is covered by permissions. The working directory is already set; use it.
- **Cheap model for simple subagents** — when spawning a subagent for exploration, file reading, file search, or other simple lookup work, always use `model: "flash_lite"`. Only use `flash`, `pro`, or the inherited model when the subagent must do real reasoning, design, or multi-step implementation.
- **Number suggestions** — number top-level suggestions, options, and questions; use letters for nested items so each can be referenced without retyping it.

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

---

## Repository Documentation

See `docs/01-index.md` for the document index and guidance on which document to consult.
