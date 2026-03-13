#!/usr/bin/env bash

SCRIPT_DIR="$(dirname $BASH_SOURCE[0])"

bun "$SCRIPT_DIR/dev-prompt.ts" "$1";
