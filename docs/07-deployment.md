# Deployment

## Current State

Umbra is not a deployed application. Consumers install this private npm package definition directly from its GitHub repository:

```bash
npm install git+https://github.com/JedWag/umbra-ui.git
```

A Git installation follows the selected Git reference rather than a published semantic version unless the consumer pins a commit or tag.

## Build and Serving Model

The package ships `src/` and `README.md`. It exposes raw TypeScript/TSX from `src/index.ts` and CSS from `src/styles/theme.css`; there is no compiled distribution directory, release build, server process, port, proxy, or runtime entry point.

Consumers must compile compatible TSX, run Tailwind 4 against Umbra's source, provide React 19 and React DOM 19, and import `umbra/theme.css` after their Tailwind and shadcn base styles.

## Hosting and Infrastructure

GitHub currently hosts the source used by npm's Git dependency installation. Umbra requires no application host, container, network, or domain. A sibling checkout may be installed temporarily with `npm install file:../umbra-ui` during coordinated development.

## Configuration and Secrets

The package has no environment variables, runtime configuration files, credentials, or secrets. Consumer build configuration must support the raw ESM TypeScript/TSX source and Tailwind scanning.

## Authentication and Security

Umbra implements no authentication or authorization and exposes no network endpoint. Consumers own their application exposure, transport security, identity, permissions, and domain-data protection.

## Operations and Recovery

There are no services, health checks, logs, monitoring, backups, or runtime rollback procedures. Operational risk is package compatibility. Before advancing the dependency, validate strict type checking, package contents, generated Tailwind output, and representative consumer behavior. Recovery consists of restoring a previously working Git reference in the consumer.

## Open Deployment Questions

Versioned package publishing is not implemented. Before a registry release, decide whether to continue shipping source or add compiled JavaScript and declarations, choose the package scope and registry authentication, define versioning and release commands, add repository metadata, migrate consumers, and remove `"private": true` when publication is ready.
