import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import getConfig from './get-config.js';
import type StartConfig from './start-config.js';
import validateStartConfig from './validate-start-config.js';

export default async function getStartConfig(): Promise<StartConfig> {
  const config: object = await getConfig();
  if (!('START' in config)) {
    debug('No start configuration found.');
    return {};
  }

  try {
    return validateStartConfig(config.START);
  } catch (err: unknown) {
    debug(`Invalid start configuration: ${mapToString(err)}`);
    return {};
  }
}
