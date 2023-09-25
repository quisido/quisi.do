import PACKAGE_JSON from './package-json.js';

const getVersion = (): string => {
  if (!('version' in PACKAGE_JSON) || typeof PACKAGE_JSON.version !== 'string') {
    throw new Error(`Expected package at ${process.cwd()} to have a version.`);
  }

  return PACKAGE_JSON.version;
};

const VERSION: string = getVersion();
export default VERSION;
