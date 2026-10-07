#!/usr/bin/env bash

set -Eeuo pipefail;

npx lighthouse https://quisi.do/ \
  --budget-path=lighthouse.budget.json \
  --chrome-flags="--headless --no-sandbox" \
  --config-path=lighthouse.config.js \
  --enable-error-reporting \
  --output-path=lighthouse \
  --preset=experimental \
  --save-assets;
