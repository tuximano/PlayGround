#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
PORT="${PORT:-3000}"

# Keep each setup/build step timed, while leaving the preview server in the foreground.
run_timed() {
  local label="$1"
  shift
  printf '[timing] %s: started\n' "$label" >&2
  /usr/bin/time -f "[timing] ${label}: %e seconds" "$@"
}

run_timed "npm ci" npm ci
run_timed "npm run build" npm run build
run_timed "deployment metadata" node --input-type=module -e '
import { mkdirSync, writeFileSync } from "node:fs";
const project = process.cwd();
const directory = `${project}/dist`;
mkdirSync("/home/runner/work/_temp/omgithub-web", { recursive: true });
writeFileSync("/home/runner/work/_temp/omgithub-web/deployment-output.json", JSON.stringify({ project, directory }));
'
run_timed "Vite preview on port ${PORT}" ./node_modules/.bin/vite preview --host 0.0.0.0 --port "$PORT" --strictPort --outDir dist
