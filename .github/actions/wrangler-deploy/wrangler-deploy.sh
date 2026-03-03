set -Eeuo pipefail;

npx wrangler deploy src/index.ts \
  --env production \
  --outdir dist \
  --workspace=packages/$WORKSPACE;
