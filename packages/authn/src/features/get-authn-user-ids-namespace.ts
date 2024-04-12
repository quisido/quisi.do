import ErrorCode from '../constants/error-code.js';
import getEnv from '../utils/get-env.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import mapCauseToError from '../utils/map-cause-to-error.js';

export default function getAuthnUserIdsNamespace(): KVNamespace {
  const { AUTHN_USER_IDS } = getEnv();

  if (isKVNamespace(AUTHN_USER_IDS)) {
    return AUTHN_USER_IDS;
  }

  if (typeof AUTHN_USER_IDS === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingAuthnUserIdsNamespace,
    });
  }

  throw mapCauseToError({
    code: ErrorCode.InvalidAuthnUserIdsNamespace,
    privateData: AUTHN_USER_IDS,
    publicData: typeof AUTHN_USER_IDS,
  });
}
