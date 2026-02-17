/// <reference types="node" />

import { readFileSync } from 'node:fs';

globalThis.console.log(
  JSON.stringify({
    vitest: JSON.parse(readFileSync('./.tests/vitest/report.json')),
  }),
);
