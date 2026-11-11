#!/usr/bin/env bash

set -Eeuo pipefail;

npx eslint . \
  --cache \
  --cache-location ./.cache/;

npx vitest run;

npm --workspaces run test;
