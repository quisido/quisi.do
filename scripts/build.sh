#!/usr/bin/env bash

set -Eeuo pipefail;

# Build Webhint connector and formatters.
npx tsc --build tsconfig.build.json;

npm --workspace=packages/quisido run build;
npm --workspace=packages/quisido link;
npm --workspaces run build;
