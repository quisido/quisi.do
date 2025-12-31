import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import loadConfig from './load-config.js';

const handleLoadConfigError = (err: unknown) => {
  debug(`Failed to load configuration file: ${mapToString(err)}`);
  return {};
};

export default async function getConfig(): Promise<object> {
  return await loadConfig().catch(handleLoadConfigError);
}
