# Documentation Migration Instructions

## Goal

This directory is a reusable documentation template for current and future projects. When the user places `cc-template/` in a project root and points you to this file, use it to replace an oversized or stale root `CLAUDE.md` with focused repository documentation.

The user's reference to this file is explicit authorization to perform the documentation migration described below. Discuss genuine ambiguities that would materially change the result, but do not stop merely to ask whether you should begin.

## Required Outcome

When the migration is complete:

- The project root contains the template `CLAUDE.md`.
- Only the **Repository Documentation** section of the template `CLAUDE.md` has been tailored to the project.
- The project root contains the populated `docs/` directory.
- Useful project knowledge from the original `CLAUDE.md` has been moved into the appropriate documents.
- The documentation reflects the current code and configuration, not merely the original `CLAUDE.md`.
- Important facts discovered during the audit are documented even when the original `CLAUDE.md` omitted them.
- Source-project-specific language and unused template guidance have not leaked into the target project.
- The original root `CLAUDE.md` has been replaced rather than retained as a second source of truth.
- The temporary `cc-template/` directory has been removed after its contents are installed.

## Migration Process

### 1. Inspect Before Editing

Read:

- the target project's original root `CLAUDE.md`
- every file in `cc-template/`
- any existing repository documentation relevant to the migration
- repository instructions and configuration
- the current code needed to verify the documentation

Map claims from the original documentation to their authoritative implementation. Check paths, commands, dependencies, architecture, schemas, UI ownership, deployment behavior, and other durable project constraints.

Do not assume the original `CLAUDE.md` is current.

### 2. Audit the Current Project

Inspect the repository broadly enough to identify:

- the project's real purpose and current behavior
- development, build, test, lint, and runtime commands
- architecture, directory responsibilities, and system boundaries
- persisted data, lifecycle rules, and safety concerns
- Umbra UI integration and the boundary between shared and project-owned UI
- deployment, configuration, authentication, and operational constraints
- settled decisions and their rationale
- important facts that contributors need but the original documentation omitted

Prefer durable facts over temporary status, volatile record counts, or dated progress notes. If documentation and code disagree, document the current implementation and clearly surface any discrepancy that may represent a bug rather than silently rewriting history.

This is a documentation migration and audit. Do not change application code, configuration, dependencies, schemas, or production data unless the user separately requests it.

### 3. Populate the Template Documents

Use the associations and section prompts already present in `cc-template/docs/` to route information into the appropriate files.

Replace template guidance with concise project-specific documentation as each section is populated. Remove sections that genuinely do not apply, and add sections when the project has important concerns not represented by the template.

Keep documentation focused:

- `project.md` — purpose, users, current behavior, scope, constraints, and important data
- `development.md` — prerequisites, setup, runtime, build, tests, quality checks, and workflow
- `architecture.md` — stack, boundaries, flows, integrations, and directory layout
- `database.md` — persistence source of truth, model, relationships, lifecycle, migrations, and safety
- `ui.md` — permanent Umbra ownership rules plus project-specific UI structure, workflows, styling, and justified exceptions
- `deployment.md` — environments, serving model, infrastructure, configuration, security, operations, and open questions
- `decisions.md` — settled choices, context, rationale, tradeoffs, and revisit conditions

Do not duplicate the same detailed information across multiple documents. Use brief cross-references when a fact touches more than one area.

### 4. Update the Template CLAUDE.md

Use `cc-template/CLAUDE.md` as the replacement root file.

Do not change its conventions or guidelines during the migration. Tailor only its **Repository Documentation** section:

- Keep the permanent instruction to start with the directly relevant document.
- Keep the instruction to expand documents as project knowledge develops.
- Keep the directory-list snapshots synchronized with the actual populated documents.
- Rewrite each snapshot so it accurately describes that document's project-specific contents.
- Remove entries for documents that were intentionally omitted and add entries for any new topical documents.

Do not merge the old root `CLAUDE.md` wholesale into the replacement. Route its useful repository knowledge into `docs/`; discard stale duplication and obsolete instructions.

### 5. Install the Result

Before replacing files, inspect the target root for an existing `docs/` directory.

If one exists, preserve useful unrelated documentation and merge deliberately. Do not blindly overwrite or delete existing files. Resolve same-name documents by consolidating their current, verified information into the populated template version.

Then:

1. Replace the original root `CLAUDE.md` with the completed template `CLAUDE.md`.
2. Move the completed template documents into the root `docs/` directory.
3. Remove `cc-template/READ.md` and the remaining temporary `cc-template/` directory.

Use recoverable, explicit operations and rely on Git history as the record of the replaced documentation.

### 6. Verify

Before finishing:

- Confirm every path and command named in the new documentation exists or is intentionally described as planned.
- Search for stale names, deleted files, obsolete commands, template placeholders, and source-project leakage.
- Confirm the root `CLAUDE.md` differs from the template only in its Repository Documentation section.
- Confirm the directory-list snapshots match the final documents.
- Confirm no application code, configuration, dependency, schema, or production data changed.
- Review the final diff for accidental loss of existing documentation.
- Follow the root `CLAUDE.md` commit and push convention.

Report the migrated files, important audit corrections, unresolved discrepancies, verification performed, commit, and push result.
