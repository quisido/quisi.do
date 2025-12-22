#!/usr/bin/env node
import build from './features/build/build.js';
import type { Config } from './features/config/config.js';
import loadConfig from './features/config/load-config.js';
import start from './features/start/start.js';
import test from './features/test/test.js';
import debug from './utils/debug.js';
import { handleExit } from './utils/exit.js';
import mapToString from './utils/map-to-string.js';

const FIRST_ARG = 2;

process.on('beforeExit', (): void => {
  void handleExit();
});

const handleLoadConfigError = (err: unknown) => {
  debug(`Failed to load \`quisi.config.ts\`: ${mapToString(err)}`);
  return {};
};

const config: Config = await loadConfig().catch(handleLoadConfigError);

switch (process.argv[FIRST_ARG]) {
  case 'build':
    await build(config);
    break;

  case 'start':
    await start(config);
    break;

  case 'test':
    await test(config);
    break;
}
