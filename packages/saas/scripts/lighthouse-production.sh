set -Eeuo pipefail;

npx lighthouse https://quisi.do/ \
  --budget-path=lighthouse.budget.json \
  --chrome-flags="--headless" \
  --config-path=lighthouse.config.js \
  --enable-error-reporting \
  --output=html,json \
  --output-path=lighthouse \
  --preset=experimental \
  --save-assets;
