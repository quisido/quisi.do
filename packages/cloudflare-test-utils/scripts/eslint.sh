#!/usr/bin/env bash

set -Eu;

function eslint {
  npx eslint . \
    --cache \
    --cache-location .cache/eslint.json \
    --config eslint.config.ts \
    --exit-on-fatal-error \
    --max-warnings 9999 \
    --no-config-lookup \
    --report-unused-disable-directives-severity error \
    --report-unused-inline-configs error \
    $@;
}

export NODE_OPTIONS="--disable-warning=ESLintPoorConcurrencyWarning";
CONCURRENCY=$(( RANDOM % 4 + 1 ));
TIMEFORMAT="ESLint results took %Rs with $CONCURRENCY threads.";
time {
  eslint \
    --color \
    --concurrency $CONCURRENCY;
}

TIMEFORMAT="ESLint reports took %Rs.";
time {
  eslint \
    --format html \
    --output-file .tests/eslint.html \
    --stats;
  eslint \
    --format json \
    --output-file .tests/eslint.json \
    --stats;
}
