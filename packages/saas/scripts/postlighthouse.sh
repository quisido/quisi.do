#!/usr/bin/env bash

set -Eeuo pipefail;

npx esbuild-wasm \
  --bundle \
  --color=true \
  --format=esm \
  --outfile=./.cache/postlighthouse.mjs \
  --packages=external \
  --platform=node \
  ./scripts/postlighthouse/index.ts;

node ./.cache/postlighthouse.mjs;
