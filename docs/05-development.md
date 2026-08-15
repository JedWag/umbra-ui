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

## Consumer App Launcher Template

`templates/run.sh` is the canonical launcher script for a consumer app (Python API + Vite frontend, opened as a chrome-less app window). Copy it into a new consumer's root as `run.sh` and fill in `APP_NAME`, `API_PORT`, `API_CMD`, and `FRONTEND_URL`.

It standardizes behavior that previously drifted independently across consumers:

- an instance-lock check so a second `run.sh` run focuses the existing window instead of piling up new ones
- a consistent Chrome profile directory naming convention: `$HOME/.cache/<APP_NAME>/chrome`
- pre-creating an empty `First Run` marker file in the profile directory before Chrome's first real launch, so the first-run welcome/default-browser popup never appears — Chrome only shows that popup when the marker is absent; the file's contents are irrelevant, only its presence is checked
- `setsid` + a `trap cleanup` on the API and frontend process groups, so closing the app window stops both servers
- killing any leftover process on the API port from a previous run before starting

Update this template (not each consumer's copy independently) when the pattern needs to change, then backport the change to existing consumers.

## Icon Launcher Template

`templates/app.desktop` is the canonical menu/taskbar launcher entry for a consumer app. Fill in `__APP_NAME__`, `__APP_DIR__` (absolute path to the app's root, where `run.sh` lives), and `__ICON_PATH__` (an absolute path to an icon file, e.g. `/home/jed/.icons/<theme>/scalable/apps/<app>.svg` — a bare icon name like `qb` will silently fail to resolve unless a matching icon is actually installed in an icon theme, so prefer an absolute path).

Install it by copying the filled-in file to `~/.local/share/applications/<app>.desktop`. On this machine that directory is a symlink into the dotfiles repo (`~/Dotfiles/dots/system/arch/applications`), so placing it there is equivalent to editing dotfiles directly — no separate sync step needed.

The `Exec` line `cd`s into the app directory before running `./run.sh`, so it works regardless of the launcher's own working directory, independent of whether `run.sh` itself has a leading `cd "$(dirname "$0")"`.
