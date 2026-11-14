#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

if [[ ! -f package.json ]]; then
  echo "CI error: package.json was not found in the project root." >&2
  exit 1
fi

if [[ ! -f package-lock.json && ! -f npm-shrinkwrap.json ]]; then
  echo "CI error: package-lock.json or npm-shrinkwrap.json is required for npm ci." >&2
  exit 1
fi

npm ci
npm run build
npm test

echo "CI checks completed successfully."
