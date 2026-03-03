/// <reference types="node" />

import { readFile } from 'node:fs/promises';

globalThis.console.log(
  JSON.stringify({
    vitest: JSON.parse(await readFile('./.tests/vitest/report.json', 'utf8')),
  }),
);
