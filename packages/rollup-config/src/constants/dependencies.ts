import EMPTY_SET from './empty-set.js';
import PACKAGE_JSON from './package-json.js';

const getDependencies = (): ReadonlySet<string> => {
  if (
    !('dependencies' in PACKAGE_JSON) ||
    typeof PACKAGE_JSON.dependencies !== 'object' ||
    PACKAGE_JSON.dependencies === null
  ) {
    return EMPTY_SET;
  }

  return new Set(Object.keys(PACKAGE_JSON.dependencies));
};

const DEPENDENCIES: ReadonlySet<string> = getDependencies();
export default DEPENDENCIES;
