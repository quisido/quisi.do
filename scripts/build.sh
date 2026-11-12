#!/usr/bin/env bash

set -Eeuo pipefail;

npm --workspace=packages/quisido run build;
npm --workspace=packages/quisido link;
npm --workspaces run build;
