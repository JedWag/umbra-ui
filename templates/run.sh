#!/usr/bin/env bash
# Start the Python API server and the Vite dev server, open a chrome-less app window,
# and stop both servers when that window is closed.
#
# Copy into a new consumer app's root as run.sh and fill in the four placeholders below:
#   APP_NAME     - unique slug, used for the Chrome profile dir and the instance-lock check
#   API_PORT     - port the backend listens on
#   API_CMD      - command that starts the backend (e.g. ./venv/bin/uvicorn app:app --port "$API_PORT")
#   FRONTEND_URL - URL Chrome opens in --app mode (usually http://localhost:<vite port>)
cd "$(dirname "$0")"

APP_NAME="__APP_NAME__"
API_PORT=__API_PORT__
API_CMD='__API_CMD__'
FRONTEND_URL="__FRONTEND_URL__"
PROFILE_DIR="$HOME/.cache/$APP_NAME/chrome"

# Refuse to start a second instance — if a Chrome app window for this profile
# is already running, focus that one instead of piling up more windows.
if pgrep -f "user-data-dir=$PROFILE_DIR" >/dev/null; then
    echo "$APP_NAME is already running — switch to its window instead of starting another." >&2
    exit 1
fi

# Kill any leftover process on the API port from a previous run.
fuser -k "$API_PORT"/tcp 2>/dev/null || true

# setsid gives each server its own process group, so cleanup can kill the whole
# subtree at once (npm run dev spawns vite as a grandchild — a plain `pkill -P`
# on npm's own PID wouldn't reach it).
setsid bash -c "$API_CMD" &
API_PID=$!

setsid bash -c 'cd frontend && exec npm run dev' &
FRONTEND_PID=$!

# On exit kill both process groups, then wait for them.
cleanup() {
    kill -- -"$API_PID"      2>/dev/null || true
    kill -- -"$FRONTEND_PID" 2>/dev/null || true
    wait  "$API_PID" "$FRONTEND_PID"   2>/dev/null || true
}
trap cleanup EXIT INT TERM

sleep 2

# Chrome only shows its first-run welcome/default-browser popup when no "First Run"
# marker exists in the profile dir yet. Pre-creating the (empty) marker file means a
# brand-new profile never shows that popup on its very first real launch.
mkdir -p "$PROFILE_DIR"
touch "$PROFILE_DIR/First Run"

# A dedicated --user-data-dir forces Chrome to spawn its own process instead of
# handing off to an already-running instance — without it, this command would
# return immediately and the script couldn't block on the window closing.
# Running it in the foreground (no &) means the script exits — and the trap
# above fires, killing both servers — as soon as the app window is closed.
google-chrome-stable \
    --app="$FRONTEND_URL" \
    --user-data-dir="$PROFILE_DIR" \
    --new-window
