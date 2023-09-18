import EMPTY_SET from './empty-set.js';
import PACKAGE_JSON from './package-json.js';

const getPeerDependencies = (): ReadonlySet<string> => {
  if (
    !('peerDependencies' in PACKAGE_JSON) ||
    typeof PACKAGE_JSON.peerDependencies !== 'object' ||
    PACKAGE_JSON.peerDependencies === null
  ) {
    return EMPTY_SET;
  }

  return new Set(Object.keys(PACKAGE_JSON.peerDependencies));
};

const PEER_DEPENDENCIES: ReadonlySet<string> = getPeerDependencies();
export default PEER_DEPENDENCIES;
