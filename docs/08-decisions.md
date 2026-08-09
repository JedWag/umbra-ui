# Decisions

## Umbra remains project-neutral

Umbra owns shared visual and structural responsibilities, not consumer domains. Consuming applications are useful sources of proven patterns, but their entities, workflows, and data assumptions remain local.

Revisit this boundary only when a responsibility is demonstrably shared and can be expressed without privileging one consumer's domain model.

## Develop locally, then promote

Unproven UI begins in the application that needs it. Once its shared responsibility and API are understood, generalize it in Umbra and replace the application's local implementation with an Umbra import.

This avoids speculative shared abstractions while preventing mature shared behavior from diverging across consumers.

## Export one public API

All intended public components, hooks, utilities, and types are re-exported from `src/index.ts`. Consumers import from `umbra` rather than internal file paths so the supported boundary remains visible while the package ships source.

## Ship source during the current phase

The package exposes TypeScript/TSX and CSS directly without a build step. This keeps development simple but requires compatible consumer tooling and makes package behavior sensitive to consumer build configuration.

Revisit this decision when implementing versioned publishing or when a consumer cannot reliably compile the source package.

## Move to versioned distribution later

Git dependencies remain the current mechanism until package naming, publishing, authentication, artifacts, versioning, and consumer migration are deliberately implemented and verified.
