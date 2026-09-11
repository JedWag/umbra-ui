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

## Consumer App Launcher

`launcher/launch.py` owns dependency setup, Chrome discovery, Linux desktop and
macOS app entry creation, instance locking, readiness checks, and process cleanup
for Python/FastAPI + Vite consumers. It ships in the Umbra npm package.

Copy `templates/run.sh` and `templates/launcher.json` into the consumer root.
Fill in the JSON fields: `name` (display name), `slug` (cache and executable name),
`bundle_id` (macOS identifier), `api_module` (Uvicorn module), `api_port`,
`frontend_port`, and `icon` (Linux icon path relative to the consumer root).
The browser URL is derived from `frontend_port`. Keep the consumer's Vite API
proxy pointed at `api_port`.

Consumers need Python 3.10+, Git, Chrome, Node 20.19+ or 22.12+ (excluding Node 21),
`pyproject.toml`, and a `frontend/` containing an npm lockfile, `.npmrc`, and
`dev`/`build` scripts. Run `./run.sh` once from a terminal. The small shell entry
installs npm dependencies if the shared launcher is missing, then invokes the
installed launcher with the consumer root. Later dependency changes are handled
by the shared launcher. Update the consumer's locked Umbra dependency to receive
launcher changes; no second Umbra checkout is needed.

The launcher installs `~/.local/share/applications/<slug>.desktop` on Linux or
`~/Applications/<name>.app` on macOS, recording the terminal PATH. Rerun from a
terminal after moving the checkout or installed tools. Cache, Chrome profile,
lock, and desktop-launch logs live under `~/.cache/<slug>` on Linux or
`~/Library/Caches/<slug>` on macOS.

The app uses development servers with live reload. Closing Chrome stops the
started process groups. Duplicate launches exit; occupied ports produce an error.
Actual macOS operation must be verified by running the consumer on a Mac.

`templates/app.desktop` remains available for manually managed Linux entries;
the shared launcher generates its own entry from the consumer configuration.
