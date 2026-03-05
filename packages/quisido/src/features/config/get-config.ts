import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import loadConfig from './load-config.js';

export default async function getConfig(): Promise<object> {
  try {
    return await loadConfig();
  } catch (err: unknown) {
    debug(`Failed to load configuration file: ${mapToString(err)}`);
    return {};
  }
}
