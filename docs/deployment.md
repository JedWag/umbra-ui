# Distribution

## Current state

Umbra is not a deployed application. It is a private npm package definition installed by
consumers directly from the GitHub repository:

```bash
npm install git+https://github.com/JedWag/umbra-ui.git
```

The default branch is `main`. A Git installation therefore follows the selected Git reference
rather than a published semantic version unless the consumer pins a commit or tag.

## Package contents

The package ships `src/` and `README.md`. It exposes raw TypeScript from `src/index.ts` and CSS
from `src/styles/theme.css`; there is no compiled distribution directory or release build.

Consumers must compile compatible TSX, run Tailwind v4 against Umbra's source, and provide
React 19 and React DOM 19. Import `umbra/theme.css` after Tailwind and shadcn base styles.

## Local integration

For coordinated development with a sibling checkout:

```bash
npm install file:../umbra-ui
```

This is temporary development wiring. Restore the repository dependency before committing the
consumer.

## Planned package publishing

The intended direction is a scoped, semantically versioned GitHub Packages release named
`@jedwag/umbra-ui`. That is not implemented.

Before publishing, the project must deliberately settle at least:

- whether releases continue shipping source or add compiled JavaScript and declarations
- package scope, registry authentication, and repository metadata
- versioning and release commands
- consumer migration from `umbra` to the scoped package name
- removal of `"private": true` when publication is ready

Do not describe GitHub Packages as operational until those choices are implemented and tested.

## Operations and security

There are no runtime ports, services, secrets, authentication rules, health checks, logs, or
production data in this repository. Operational risk is package compatibility: validate type
checking, package contents, Tailwind output, and representative consumer behavior before
advancing a shared dependency.
