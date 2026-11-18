#!/usr/bin/env bash

set -Eeuo pipefail;

npx eslint --quiet .;
npx tsc --skipLibCheck;
npx vitest run;
