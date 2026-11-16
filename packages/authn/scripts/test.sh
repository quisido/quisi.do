#!/usr/bin/env bash

set -Eeuo pipefail;

npx eslint . --fix;
npx tsc --skipLibCheck;
npx vitest run;
