set -Eeuo pipefail;

npx concurrently \
  --hide serve \
  --kill-others \
  --kill-others-on-fail \
  --names lighthouse,serve \
  --prefix-colors auto \
  --success command-lighthouse \
  "./lighthouse-localhost.sh" \
  "npx serve _site";
