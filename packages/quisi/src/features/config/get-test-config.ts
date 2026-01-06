import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import getConfig from './get-config.js';
import type TestConfig from './test-config.js';
import validateTestConfig from './validate-test-config.js';

export default async function getTestConfig(): Promise<TestConfig> {
  const config: object = await getConfig();
  if (!('TEST' in config)) {
    // debug('No test configuration found.');
    return {};
  }

  try {
    return validateTestConfig(config.TEST);
  } catch (err: unknown) {
    debug(`Invalid test configuration: ${mapToString(err)}`);
    return {};
  }
}
