set -Eeuo pipefail;

chmod +x ./scripts/lighthouse-localhost.sh &&

npx concurrently \
  --hide serve \
  --kill-others \
  --kill-others-on-fail \
  --names lighthouse,serve \
  --prefix-colors auto \
  --success command-lighthouse \
  "bash ./scripts/lighthouse-localhost.sh" \
  "npx serve _site";
