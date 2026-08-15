# Consumer app first launch

A Chrome app launcher that supplies a new dedicated profile directory, for example:

```bash
google-chrome-stable \
    --app=http://localhost:9290 \
    --user-data-dir="$HOME/.cache/example/chrome" \
    --new-window
```

does not use the person's existing Chrome profile. On a fresh machine or the first launch of a new app profile, Chrome can show its first-run and default-browser setup instead of the application.

Consumer launchers should suppress those screens:

```bash
google-chrome-stable \
    --app=http://localhost:9290 \
    --user-data-dir="$HOME/.cache/example/chrome" \
    --no-first-run \
    --no-default-browser-check \
    --new-window
```

Using a dedicated profile remains important when the launcher must keep ownership of the Chrome process and stop the application's backend and frontend when its window closes.
