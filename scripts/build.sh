#!/usr/bin/env bash

set -Eeuo pipefail;

npm run tsc:build;
npm --workspace=packages/quisido run build;
npm --workspace=packages/quisido link;
npm run quisido:link;
npm --workspaces run build;
