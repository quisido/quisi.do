#!/usr/bin/env bash

set -Eeuo pipefail;

npx eslint . \
  --cache \
  --cache-location ./.cache/;

npx markdownlint \
  --dot \
  --ignore-path ".gitignore" \
  "**/*.md";

npx vitest run;

npm --workspaces run test;
