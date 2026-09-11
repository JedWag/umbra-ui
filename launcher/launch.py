"""Prepare and run the consumer app on Linux and macOS."""

import fcntl
import hashlib
import json
import os
from pathlib import Path
import plistlib
import shlex
import shutil
import signal
import socket
import subprocess
import sys
import time
import urllib.request

ROOT = Path(sys.argv[1]).resolve()
CONFIG = json.loads((ROOT / "launcher.json").read_text())
NAME = CONFIG["name"]
SLUG = CONFIG["slug"]
API_PORT = CONFIG["api_port"]
FRONTEND_PORT = CONFIG["frontend_port"]
FRONTEND = ROOT / "frontend"
VENV = ROOT / ".venv"
MAC = sys.platform == "darwin"
CACHE = (Path.home() / "Library/Caches" if MAC else Path.home() / ".cache") / SLUG


def run(command, cwd=ROOT):
    subprocess.run([str(arg) for arg in command], cwd=cwd, check=True)


def digest(paths):
    return hashlib.sha256(b"\0".join(p.read_bytes() for p in paths)).hexdigest()


def current(stamp, value):
    return stamp.exists() and stamp.read_text() == value


def chrome_binary():
    if MAC:
        for base in (Path("/Applications"), Path.home() / "Applications"):
            candidate = base / "Google Chrome.app/Contents/MacOS/Google Chrome"
            if candidate.is_file():
                return str(candidate)
    else:
        for name in ("google-chrome-stable", "google-chrome"):
            candidate = shutil.which(name)
            if candidate:
                return candidate
    raise RuntimeError(f"Install Google Chrome before launching {NAME}.")


def prerequisites():
    if sys.version_info < (3, 10):
        raise RuntimeError(f"{NAME} requires Python 3.10 or newer.")
    for name in ("node", "npm", "git"):
        if not shutil.which(name):
            raise RuntimeError(f"{NAME} requires {name}; install it and run ./run.sh again.")
    version = subprocess.check_output(["node", "--version"], text=True).strip().lstrip("v")
    major, minor, *_ = map(int, version.split("."))
    if not ((major == 20 and minor >= 19) or (major == 22 and minor >= 12) or major > 22):
        raise RuntimeError(f"{NAME} requires Node 20.19+ or 22.12+ (excluding Node 21).")
    return chrome_binary()


def prepare():
    python = VENV / "bin/python"
    if not python.exists():
        print("Creating Python environment…", flush=True)
        run([sys.executable, "-m", "venv", VENV])
    py_stamp = VENV / f".{SLUG}-python-deps"
    py_hash = digest([ROOT / "pyproject.toml"])
    if not current(py_stamp, py_hash):
        print("Installing Python dependencies…", flush=True)
        run([python, "-m", "pip", "install", "-e", ROOT])
        py_stamp.write_text(py_hash)

    node_stamp = VENV / f".{SLUG}-node-deps"
    node_files = [FRONTEND / "package.json", FRONTEND / "package-lock.json", FRONTEND / ".npmrc"]
    node_hash = digest(node_files)
    changed = not current(node_stamp, node_hash) or not (FRONTEND / "node_modules/.bin/vite").exists()
    if changed:
        print("Installing frontend dependencies…", flush=True)
        run(["npm", "ci"], FRONTEND)
    if changed or not (FRONTEND / "dist/index.html").exists() or not (FRONTEND / "dist/assets").is_dir():
        print("Building frontend assets…", flush=True)
        run(["npm", "run", "build"], FRONTEND)
    node_stamp.write_text(node_hash)


def write_entry(path, content, executable=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    # Replace the entry itself, never write through an existing dotfiles symlink.
    if path.is_symlink() or not path.exists() or path.read_bytes() != content:
        temporary = path.with_name(path.name + ".tmp")
        temporary.write_bytes(content)
        if executable:
            temporary.chmod(0o755)
        temporary.replace(path)


def install_entry():
    # Save the working terminal PATH for launches from the desktop or Dock,
    # including Node/Python installed with a version manager.
    wrapper = (
        "#!/bin/bash\n"
        f"export PATH={shlex.quote(os.environ['PATH'])}\n"
        f"exec {shlex.quote(str(ROOT / 'run.sh'))}\n"
    )
    if MAC:
        bundle = Path.home() / f"Applications/{NAME}.app/Contents"
        write_entry(bundle / f"MacOS/{SLUG}", wrapper.encode(), executable=True)
        info = {
            "CFBundleName": NAME,
            "CFBundleDisplayName": NAME,
            "CFBundleIdentifier": CONFIG["bundle_id"],
            "CFBundleVersion": "1",
            "CFBundlePackageType": "APPL",
            "CFBundleExecutable": SLUG,
        }
        write_entry(bundle / "Info.plist", plistlib.dumps(info))
    else:
        launcher = CACHE / f"open-{SLUG}"
        write_entry(launcher, wrapper.encode(), executable=True)
        # Desktop Entry Exec uses its own quoting rules, not shell quoting.
        escaped = str(launcher).replace("\\", "\\\\").replace('"', '\\"').replace("`", "\\`").replace("$", "\\$").replace("%", "%%")
        entry = (
            f"[Desktop Entry]\nType=Application\nName={NAME}\n"
            f'Exec="{escaped}"\n'
            f"Icon={ROOT / CONFIG['icon']}\n"
            "Terminal=false\nCategories=Office;\n"
        )
        write_entry(Path.home() / f".local/share/applications/{SLUG}.desktop", entry.encode())


def require_free_ports():
    for port in (API_PORT, FRONTEND_PORT):
        with socket.socket() as probe:
            try:
                probe.bind(("127.0.0.1", port))
            except OSError as exc:
                raise RuntimeError(f"Port {port} is already in use. Close the other {NAME} instance before launching.") from exc


def stop(processes):
    # Each child owns a session; terminate its entire server/browser process group.
    for sig in (signal.SIGTERM, signal.SIGKILL):
        for process in reversed(processes):
            try:
                os.killpg(process.pid, sig)
            except ProcessLookupError:
                pass
        for process in processes:
            try:
                process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                pass


def wait_ready(url, processes, timeout=30):
    deadline = time.monotonic() + timeout
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    while time.monotonic() < deadline:
        if any(p.poll() is not None for p in processes):
            raise RuntimeError(f"A {NAME} server stopped during startup. See the launcher log.")
        try:
            with opener.open(url, timeout=1) as response:
                if response.status == 200:
                    return
        except OSError:
            pass
        time.sleep(0.2)
    raise RuntimeError(f"Timed out waiting for {url}.")


def serve(chrome):
    require_free_ports()
    profile = CACHE / "chrome"
    profile.mkdir(parents=True, exist_ok=True)
    (profile / "First Run").touch()
    children = []
    try:
        children.append(subprocess.Popen([
            str(VENV / "bin/python"), "-m", "uvicorn", CONFIG["api_module"],
            "--host", "127.0.0.1", "--port", str(API_PORT), "--reload", "--log-level", "warning",
        ], cwd=ROOT, start_new_session=True))
        children.append(subprocess.Popen([
            "npm", "run", "dev", "--", "--host", "127.0.0.1",
            "--port", str(FRONTEND_PORT), "--strictPort",
        ], cwd=FRONTEND, start_new_session=True))
        wait_ready(f"http://127.0.0.1:{API_PORT}/openapi.json", children)
        wait_ready(f"http://127.0.0.1:{FRONTEND_PORT}/", children)
        browser = subprocess.Popen([
            chrome, f"--app=http://localhost:{FRONTEND_PORT}", f"--user-data-dir={profile}",
            "--new-window", "--disable-background-mode",
        ], start_new_session=True)
        children.append(browser)
        while browser.poll() is None:
            if any(p.poll() is not None for p in children[:-1]):
                raise RuntimeError(f"A {NAME} server stopped unexpectedly. See the launcher log.")
            time.sleep(0.2)
        if browser.returncode:
            raise RuntimeError(f"Chrome could not open the {NAME} window. See the launcher log.")
    finally:
        stop(children)


def main():
    if sys.platform not in ("linux", "darwin"):
        raise RuntimeError("This launcher supports Linux and macOS.")
    CACHE.mkdir(parents=True, exist_ok=True)
    with (CACHE / "launcher.lock").open("w") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print(f"{NAME} is already running — switch to its window.")
            return
        chrome = prerequisites()
        prepare()
        install_entry()
        serve(chrome)


if __name__ == "__main__":
    CACHE.mkdir(parents=True, exist_ok=True)
    log_path = CACHE / "launcher.log"
    print(f"{NAME} launcher log: {log_path}", flush=True)
    # Keep errors available when the launcher was opened without a terminal.
    if not sys.stdout.isatty():
        log = log_path.open("a", buffering=1)
        os.dup2(log.fileno(), 1)
        os.dup2(log.fileno(), 2)
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        raise
    except Exception as exc:
        print(f"{NAME} could not start: {exc}", file=sys.stderr, flush=True)
        sys.exit(1)
