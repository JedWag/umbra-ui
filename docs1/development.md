# Development

## Prerequisites and setup

Use Node.js and npm. Install the locked dependency tree from the repository root:

```bash
npm ci
```

React and React DOM are peer dependencies; the development installation includes them through
the lockfile for type checking.

## Runtime and build

This repository is a source package, not a runnable application. It has no development server
and no npm scripts. `package.json` points `main`, `types`, and the root export directly to
`src/index.ts`; `umbra/theme.css` maps to `src/styles/theme.css`.

There is currently no compile or bundle step.

## Tests and quality checks

The configured validation is strict TypeScript:

```bash
npx tsc --noEmit
```

There is no automated unit, browser, lint, or formatting suite. Validate visual or interactive
changes in an appropriate consuming application in addition to type checking this package.

To inspect what npm would include without creating a release:

```bash
npm pack --dry-run
```

## Adding components

Before adding anything, check whether the responsibility is already covered by an existing
primitive or shell. Add an appropriate shadcn primitive with:

```bash
npx shadcn add <component>
```

Review generated code against Umbra's existing Base UI and styling conventions. Export every
intended public component, hook, utility, and type through `src/index.ts`.

## Promotion workflow

Experimental or domain-specific UI starts in a consuming project. Promote it when multiple
applications need the responsibility or when it represents a visual or structural invariant.

During promotion:

1. Remove domain language and data assumptions from the API.
2. Preserve shared geometry and behavior inside the Umbra component.
3. Expose only the content or callbacks consumers genuinely control.
4. Validate the shared implementation here and in the originating consumer.
5. Replace the consumer's local implementation with an Umbra import.

For coordinated local work, consumers may temporarily install `file:../umbra-ui`; restore the
Git dependency before committing consumer changes.
