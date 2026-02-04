#!/usr/bin/env node
import build from './features/build/build.js';
import getBuildConfig from './features/config/get-build-config.js';
import getStartConfig from './features/config/get-start-config.js';
import getTestConfig from './features/config/get-test-config.js';
import start from './features/start/start.js';
import test from './features/test/test.js';
import { handleExit } from './utils/exit.js';

const FIRST_ARG = 2;

process.on('beforeExit', (): void => {
  void handleExit();
});

switch (process.argv[FIRST_ARG]) {
  case 'attw':
  case 'eslint':
  case 'publint':
  case 'vitest': {
    globalThis.console.warn('Individual tool execution is not yet supported.');
    process.exitCode = 1;
    break;
  }

  case 'build': {
    await build(await getBuildConfig());
    break;
  }

  case 'start': {
    await start(await getStartConfig());
    break;
  }

  case 'test': {
    await test(await getTestConfig());
    break;
  }
}
