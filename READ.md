# Run Renamer on macOS

Renamer's React/Vite frontend does not require platform-specific changes. Only
`run.sh` needs to be adapted for macOS.

## Frontend requirements

- Install Node.js `^20.19.0` or `>=22.12.0`.
- Run `npm ci` from Renamer's `frontend/` directory.
- The frontend, local PDF selection, and browser PDF viewer work on macOS.

## Required `run.sh` changes

- Replace `setsid`, which is not included with macOS.
- Replace the process-group cleanup command, `kill -- -"$FRONTEND_PID"`, because
  it depends on the process group created by `setsid`.
- Replace the Linux `google-chrome-stable` command with the macOS executable:

  ```text
  /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  ```

- Consider moving the dedicated Chrome profile from
  `$HOME/.cache/renamer/chrome` to the conventional macOS location:

  ```text
  $HOME/Library/Application Support/renamer/chrome
  ```

  The existing `.cache` location should still function, so this move is
  optional.

The adapted launcher should continue to prevent duplicate Renamer instances,
start Vite on port 9390, open Chrome in app mode with a dedicated profile, and
stop Vite when Chrome exits or the launcher is interrupted.

## Run without the launcher

Until `run.sh` is adapted, start Renamer manually on macOS:

```bash
cd frontend
npm ci
npm run dev
```

Then open `http://localhost:9390` in Chrome.
