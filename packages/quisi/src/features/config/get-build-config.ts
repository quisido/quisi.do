import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import type BuildConfig from './build-config.js';
import getConfig from './get-config.js';
import validateBuildConfig from './validate-build-config.js';

export default async function getBuildConfig(): Promise<BuildConfig> {
  const config: object = await getConfig();
  if (!('BUILD' in config)) {
    debug('No build configuration found.');
    return {};
  }

  try {
    return validateBuildConfig(config.BUILD);
  } catch (err: unknown) {
    debug(`Invalid build configuration: ${mapToString(err)}`);
    return {};
  }
}
