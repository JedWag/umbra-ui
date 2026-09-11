#!/usr/bin/env bash
# Bootstrap the installed Umbra launcher, then hand it the consumer root.
set -e
cd "$(dirname "$0")"
export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin"
for tool in python3 node npm git; do
    command -v "$tool" >/dev/null 2>&1 || { echo "Install $tool, then run ./run.sh again." >&2; exit 1; }
done
unset PYTHONPATH
if [ ! -f frontend/node_modules/umbra/launcher/launch.py ]; then
    (cd frontend && npm ci)
fi
exec python3 frontend/node_modules/umbra/launcher/launch.py "$PWD"
