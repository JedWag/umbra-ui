# Decisions

## Umbra remains project-neutral

Umbra owns shared visual and structural responsibilities, not consumer domains. Guzzler and QB
are current consumers and useful sources of proven patterns, but their entities, workflows,
and data assumptions remain local.

Revisit this boundary only if a responsibility is demonstrably shared and can be expressed
without privileging one consumer's domain model.

## Develop locally, then promote

Unproven UI begins in the application that needs it. Once its shared responsibility and API
are understood, it is generalized in Umbra and the application replaces its local
implementation with an Umbra import.

This avoids speculative shared abstractions while preventing mature shared behavior from
diverging across consumers.

## Export one public API

All public components, hooks, utilities, and types are re-exported from `src/index.ts`.
Consumers import from `umbra` rather than internal file paths. This makes intended support
boundaries visible even while the package ships source.

## Ship source during the current phase

The package currently exposes TypeScript and CSS directly, without a build step. This keeps
development simple but requires compatible consumer tooling and makes package internals
sensitive to consumer build configuration.

Revisit this when implementing versioned GitHub Packages publishing or when a consumer cannot
reliably compile the source package.

## Move to versioned distribution later

The planned distribution target is `@jedwag/umbra-ui` on GitHub Packages with semantic
versions. Git dependencies remain the current mechanism until publishing, authentication,
artifacts, and consumer migration are implemented and verified.
