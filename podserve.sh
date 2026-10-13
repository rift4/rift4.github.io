#!/usr/bin/env bash
#
# Serves the site from the dev container on http://localhost:8080.
#
# The image is built on first run and cached after that. The checkout is bind
# mounted at /srv/www, so edits on the host are picked up on reload -- there is
# no copy to rebuild and no build step to run.
#
# Usage:
#   podserve.sh            serve, building the image only if it is missing
#   podserve.sh --rebuild  force an image rebuild first
#   podserve.sh --stop     stop the running container
#   PORT=9000 podserve.sh  serve on a different host port
set -euo pipefail

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
IMAGE="${PODMAN_IMAGE:-rift4-site-dev}"
NAME="${PODMAN_NAME:-rift4-site}"
PORT="${PORT:-8080}"

if [ "${1-}" = "--stop" ]; then
  podman stop "$NAME" 2>/dev/null || true
  exit 0
fi

if [ "${1-}" = "--rebuild" ]; then
  shift
  echo "rebuilding $IMAGE ..." >&2
  podman build -t "$IMAGE" "$ROOT"
elif ! podman image exists "$IMAGE"; then
  echo "building $IMAGE ..." >&2
  podman build -t "$IMAGE" "$ROOT"
fi

# --userns=keep-id is required under rootless Podman, not cosmetic: without it
# the container's uid 1000 maps to a subordinate uid rather than to your host
# uid, so writes into the bind mount fail with "Permission denied". The mount
# is the checkout itself, not a copy, so reloads show working-tree edits.
echo "serving $ROOT on http://localhost:${PORT}/  (ctrl-c to stop)"
exec podman run --rm --name "$NAME" \
  --userns=keep-id \
  -p "${PORT}:8080" \
  -v "$ROOT:/srv/www:Z" \
  -w /srv/www \
  "$IMAGE" nginx -g "daemon off;"
