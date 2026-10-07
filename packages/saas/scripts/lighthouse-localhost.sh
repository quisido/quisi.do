#!/usr/bin/env bash

set -Eeuo pipefail;

npx wait-on http://localhost:3000/ \
  --timeout 30s && \

npx lighthouse http://localhost:3000/ \
  --budget-path=lighthouse.budget.json \
  --chrome-flags="--headless --no-sandbox" \
  --config-path=lighthouse.config.js \
  --enable-error-reporting \
  --output-path=lighthouse \
  --preset=experimental \
  --save-assets;
