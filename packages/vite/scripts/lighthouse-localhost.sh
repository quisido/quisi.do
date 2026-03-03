set -Eeuo pipefail;

npx wait-on http://localhost:3000/ \
  --timeout 30s && \

npx lighthouse http://localhost:3000/ \
  --budget-path=lighthouse.budget.json \
  --chrome-flags="--headless" \
  --config-path=lighthouse.config.js \
  --enable-error-reporting \
  --output=html,json \
  --output-path=lighthouse \
  --preset=experimental \
  --save-assets;
