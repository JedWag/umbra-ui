# Application directory structure

Project note — 2026-09-23. This records the layout established in QB for an
Electron desktop application with a React renderer and Python backend. It is
a reference for Umbra consumer applications, not a description of Umbra UI's
current library layout or an instruction to reorganize this repository.

## Philosophy

The repository is a project workspace; the application is one part of it.
Keep project documentation, agent instructions, and project-level notes at the
repository level. Contain the application, its configuration, dependencies,
resources, generated output, and operational data inside `app/`.

Within the application, group files by responsibility. `src/` holds application
source. Configuration belongs beside the subsystem it configures; shared build
tooling belongs in `build/`. Keep package-manager entry files at the application
root. Neither the repository root nor `src/` should become a catch-all for every
configuration file. `launcher/` owns startup, not all application tooling.

Use conventions found in real applications as a guide, and adapt them explicitly
to this project's size and languages. Do not describe an invented arrangement as
a universal Electron convention. The `app/` boundary is our choice to keep the
project workspace navigable.

## Layout

This tree shows the relevant maintained files and generated directories. It
omits individual feature files and historical data files, not tool configuration.

```text
project/
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── TODO.md
├── docs/
├── .gitignore
├── run.sh                         # small project-level launch entrypoint
└── app/
    ├── package.json               # JavaScript dependencies and tool commands
    ├── package-lock.json          # reproducible JavaScript dependency versions
    ├── .npmrc                     # npm settings
    ├── .env                       # application environment settings
    ├── build/
    │   ├── vite.config.ts         # renderer dev server and build configuration
    │   ├── tsconfig.json          # coordinates TypeScript build projects
    │   ├── tsconfig.node.json     # TypeScript settings for build tooling
    │   └── .oxlintrc.json          # shared JavaScript/TypeScript lint rules
    ├── src/
    │   ├── main/                  # Electron window and child-server lifecycle
    │   │   ├── main.cjs
    │   │   ├── servers.cjs
    │   │   └── launcher.test.cjs
    │   ├── renderer/              # React UI
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── lib/
    │   │   ├── pages/
    │   │   ├── public/            # original browser logo and favicon
    │   │   ├── App.tsx
    │   │   ├── main.tsx
    │   │   ├── index.html
    │   │   ├── index.css
    │   │   ├── tsconfig.json      # renderer compiler settings and aliases
    │   │   ├── components.json    # shadcn CLI configuration; not runtime code
    │   │   ├── README.md
    │   │   └── TODO.md
    │   ├── backend/
    │   │   ├── pyproject.toml     # Python packaging and dependencies
    │   │   └── qb/                # Python package: API and business logic
    │   └── launcher/
    │       ├── launch.py          # dependency setup, desktop entries, startup
    │       └── launcher.json      # application name, ports, icon, backend module
    ├── resources/
    │   └── icons/                 # editable desktop icons, templates, exports
    │       ├── macos/
    │       └── linux/
    ├── data/                      # operational database and application inputs
    ├── node_modules/              # generated JavaScript dependencies; ignored
    ├── .venv/                     # generated Python environment; ignored
    └── dist/                      # generated frontend output; ignored
```

`app/.pytest_cache/` and `app/.ruff_cache/`, if created by those tools, are
also disposable and ignored. The old repository-root caches were removed.
Run application tooling from the application directory, or explicitly configure
its working/cache directory; Git ignore rules do not control where caches form.

QB currently has no preload script. Add `src/preload/` only if the app actually
needs an Electron preload bridge; do not add empty directories for symmetry.

## Sources, resources, and generated output

- Edit the React UI in `app/src/renderer/`. Its `public/qb-logo.svg` is the
  source of the sidebar logo; Vite copies it into `app/dist/qb-logo.svg`.
- Desktop icons belong in `app/resources/icons/{macos,linux}/`. Keep editable
  SVGs, both current templates, and required image exports there. A browser logo
  does not need another unused copy in the Linux desktop-icon directory.
- `app/build/` contains maintained tooling configuration. It is not generated
  output. `app/dist/` is generated output and should never be edited by hand.
- `node_modules/` and `.venv/` are installed dependencies. They exist locally but
  do not appear in the tracked Git tree. Recreate a Python virtual environment
  when its location changes; do not simply move it.
- `app/data/` is application data, not an asset folder or disposable build output.
  Preserve the database contents when changing layout; do not use it as a test
  fixture.
- `.env` belongs to the application. Whether it should be tracked is a separate
  decision: moving an already tracked file or adding an ignore rule does not
  remove it from Git's index. Do not put secrets in tracked configuration.

## Commands and path ownership

From the repository root, `./run.sh` starts the complete app through
`app/src/launcher/launch.py`. That launcher uses `app/.venv`, installs the Python
package from `app/src/backend`, prepares JavaScript dependencies in `app/`, and
starts `app/src/main/main.cjs`.

Run `npm run dev`, `npm run build`, and `npm run lint` from `app/`. The package
scripts explicitly select configuration under `build/`. Vite uses
`app/src/renderer/` as its source root, `app/` as its environment-file directory,
and `app/dist/` as build output. The backend serves that same build directory
and resolves its database to `app/data/qb.db`.

The launcher generates installed desktop entries outside the checkout. Those
entries invoke the repository's `run.sh` and reference the maintained icon path;
do not keep a second obsolete `.desktop` launcher among the icon sources.

## Reference applications

These illustrate grouping by responsibility, not one identical directory tree:

- [VS Code](https://github.com/microsoft/vscode) separates source, build tooling,
  resources, and scripts. Its [source directory](https://github.com/microsoft/vscode/tree/main/src)
  and [build directory](https://github.com/microsoft/vscode/tree/main/build)
  each contain their own TypeScript configuration; some shared files remain at root.
- [Signal Desktop](https://github.com/signalapp/Signal-Desktop) separates application
  code, configuration, scripts, and assets, while retaining shared root configuration.
- [Joplin's desktop application](https://github.com/laurent22/joplin/tree/dev/packages/app-desktop)
  is contained within a larger project and groups GUI, services, tools, and build files.

QB's Python backend and local bootstrap require adaptations. Copy the useful
separation of responsibilities, not the complexity or every folder of a much
larger application.
