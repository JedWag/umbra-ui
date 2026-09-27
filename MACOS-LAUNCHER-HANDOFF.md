# Reproducible macOS app icons and launch — September 27, 2026

## Objective

An Umbra consumer must have a repeatable setup on a fresh Mac: launch its own app bundle, pin it, quit, and relaunch with the application's name and icon preserved. A correct icon only while the process runs is not sufficient. This must come from the shared launcher/templates and their instructions, not a per-machine Dock repair.

## Current gap, verified from source

At Umbra commit `bfc4ce7`, `launcher/launch.py` launches Chrome, expects a root `frontend/` and `.venv/`, and creates `~/Applications/<name>.app` without `CFBundleIconFile` or an icon resource. `templates/run.sh`, `templates/launcher.json`, and `docs/05-development.md` describe that implementation.

QB (`d99c83a`) and Guzzler instead have app-local Electron launchers under `app/src/launcher/` and `app/src/main/`. They are not invoking Umbra's shared launcher. Their repository-root `QB.app` and `Guzzler.app` bundles each contain:

```text
<name>.app/Contents/
  Info.plist
  MacOS/<slug>          # executable wrapper invoking repository run.sh
  Resources/<slug>.icns
```

Their plists set the application name, identifier, executable, and `CFBundleIconFile`. Their executable wrappers locate `run.sh` relative to the bundle; they do not embed this Mac's checkout path. Electron also sets its running Dock icon from `app/resources/icons/macos/<slug>.png`.

Both local launchers additionally generate a separate `~/Applications/<name>.app` without an icon entry. Do not describe that generated bundle as equivalent to the repository bundle. The two bundle locations also currently use different identifiers (`dev.jedwag.<slug>` versus `com.wecoscapes.<slug>`).

## What was observed on this Mac

The user reported QB's running icon was correct, but a pinned entry changed to Electron after quitting. Both apps use Electron 44.4.4; their Electron executable, runtime plist, and runtime icon matched byte-for-byte. Both consumer PNGs and repository ICNS assets decoded correctly. The application icon-setting code and bundle wrapper structure matched apart from application names and paths.

QB was stopped after a `./run.sh` launch and then opened with:

```sh
open /Users/jed/Eco/qb/QB.app
```

The user then reported that the icon stayed. No source, icon, or Dock preference file was edited to produce that result. This is an observed working launch path, not proof that every way of pinning an Electron process works. A clean second-machine test has not been performed.

## Reproduce with the existing consumer bundles on another Mac

1. Clone/update the intended consumer branch. Confirm its root contains the committed `<name>.app`, including its plist, executable wrapper, and ICNS resource. Preserve existing consumer data when updating.
2. Install the consumer prerequisites: for the current QB/Guzzler Electron launchers, Python 3.10+, Node 22.12+, npm, and Git. Run `./run.sh` once to prepare dependencies, then quit the app.
3. Open the repository's `<name>.app` in Finder, or run `open ./<name>.app` from the repository root. The equivalent command for QB is `open ./QB.app`; for Guzzler, `open ./Guzzler.app`.
4. For a deterministic saved shortcut, drag that exact repository bundle into the Dock. Remove an old Electron shortcut if present. Do not use `app/node_modules/electron/dist/Electron.app` or assume the separately generated `~/Applications` bundle contains the same metadata.
5. Check the icon while running, after window close, after Cmd+Q, and on relaunch from the saved Dock entry. Check that the backend/frontend stop and restart with the app. The observed success above does not substitute for these checks on the new Mac.
6. If the checkout moves, recreate the Dock shortcut to the bundle at its new location.

## Work required in Umbra

This work is pending; this note does not implement the shared Electron migration.

1. Promote the consumer Electron launcher/lifecycle implementation into Umbra's shared tooling and update its templates for the `app/` layout. Consumers should use the shared implementation rather than maintain separate copies.
2. Make application identity and both icon assets explicit consumer inputs: name, slug, bundle identifier, ICNS for the persistent macOS bundle, and PNG for Electron's running icon. Preserve the Linux icon input.
3. Generate a complete `<name>.app` using those values: plist with `CFBundleIconFile`, copied ICNS under `Contents/Resources`, and an executable wrapper that resolves the consumer entrypoint. Use the repository-root bundle demonstrated here as the reference.
4. Define one canonical app bundle. Remove the competing iconless generated entry, or make any installed entry refer to the canonical bundle; do not leave two independently configured identities for the same app.
5. Document bootstrap versus daily launch explicitly in `docs/05-development.md` and the README. Bootstrap prepares dependencies; the supported Finder/Dock entry is the named application bundle. Include the pin, quit, and relaunch procedure above.
6. Test bundle generation with temporary paths and fixture icons, including spaces in the checkout path and repeat setup. Verify plist/icon/executable consistency. Then verify the full Dock lifecycle on a fresh Mac and a second consumer app before claiming reproducibility. Test Linux launch behavior after changing the shared implementation.

Do not fix this by modifying Electron's files under `node_modules`, by shipping one user's Dock preferences, or by declaring success solely because `app.dock.setIcon()` displays the right icon while running.
