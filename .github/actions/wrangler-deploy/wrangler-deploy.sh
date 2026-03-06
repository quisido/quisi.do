set -Eeuo pipefail;

npx --workspace=packages/$WORKSPACE \
  wrangler deploy src/index.ts \
  --env production \
  --outdir dist;
