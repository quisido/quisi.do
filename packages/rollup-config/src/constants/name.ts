import PACKAGE_JSON from './package-json.js';

const getName = (): string => {
  if (!('name' in PACKAGE_JSON) || typeof PACKAGE_JSON.name !== 'string') {
    throw new Error(`Expected package at ${process.cwd()} to have a name.`);
  }

  return PACKAGE_JSON.name;
};

const NAME: string = getName();
export default NAME;
