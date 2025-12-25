#!/usr/bin/env node
import build from './features/build/build.js';
import type BuildConfig from './features/config/build-config.js';
import loadConfig from './features/config/load-config.js';
import type StartConfig from './features/config/start-config.js';
import type TestConfig from './features/config/test-config.js';
import validateBuildConfig from './features/config/validate-build-config.js';
import validateStartConfig from './features/config/validate-start-config.js';
import validateTestConfig from './features/config/validate-test-config.js';
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
  debug(`Failed to load configuration file: ${mapToString(err)}`);
  return {};
};

const config: object = await loadConfig().catch(handleLoadConfigError);

switch (process.argv[FIRST_ARG]) {
  case 'build': {
    if ('BUILD' in config) {
      const buildConfig: BuildConfig = validateBuildConfig(config.BUILD);
      await build(buildConfig);
    } else {
      debug('No build configuration found.');
      await build({});
    }
    break;
  }

  case 'start': {
    if ('START' in config) {
      const startConfig: StartConfig = validateStartConfig(config.START);
      await start(startConfig);
    } else {
      debug('No start configuration found.');
      await start({});
    }
    break;
  }

  case 'test': {
    if ('TEST' in config) {
      const testConfig: TestConfig = validateTestConfig(config.TEST);
      await test(testConfig);
    } else {
      debug('No test configuration found.');
      await test({});
    }
    break;
  }
}
