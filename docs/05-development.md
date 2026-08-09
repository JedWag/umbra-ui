# Development

## Prerequisites and Setup

Use Node.js and npm. Install the locked dependency graph from the repository root:

```bash
npm ci
```

React and React DOM are peer dependencies and are also present in the development dependency graph for type checking.

## Local Runtime

Not applicable. Umbra is a source package, not a runnable application; it has no development server, ports, or npm scripts.

## Component-Specific Runtime

Not applicable. The repository contains no separately runnable application, service, or worker. Validate interactive and visual behavior through an appropriate consuming application.

## Build

There is no compile or bundle step in this repository. Package entry points expose raw TypeScript/TSX and CSS. Inspect the files npm would distribute without publishing:

```bash
npm pack --dry-run
```

## Tests and Quality Checks

Run the configured strict TypeScript check:

```bash
npx tsc --noEmit
```

There is no configured unit, browser, lint, or formatting suite. Pair type checking and package inspection with representative visual, responsive, keyboard, focus, and theme validation in a consuming application.

## Development Workflow

Before adding a component, check whether an existing primitive, preset, compound control, or shell already owns the responsibility. Add an appropriate shadcn primitive from the repository root with:

```bash
npx shadcn add <component>
```

Review generated code against the existing Base UI and styling conventions, then export every intended public component, utility, hook, and type through `src/index.ts`.

Experimental or domain-specific UI begins in a consumer. Promote it only after removing domain assumptions and identifying shared geometry and behavior. Consumers may temporarily use `npm install file:../umbra-ui` for coordinated local work, but should restore the Git dependency before committing their changes.
