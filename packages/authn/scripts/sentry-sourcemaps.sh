#!/usr/bin/env bash

set -Eeuo pipefail;

npx @sentry/wizard \
  --integration sourcemaps \
  --org quisido \
  --project authn \
  --saas;
