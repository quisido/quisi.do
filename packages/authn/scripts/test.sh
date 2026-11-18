#!/usr/bin/env bash

set -Eeuo pipefail;

npx eslint .;
npx tsc --skipLibCheck;
npx vitest run;
