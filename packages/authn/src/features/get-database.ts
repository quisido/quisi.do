import ErrorCode from '../constants/error-code.js';
import getEnv from '../utils/get-env.js';
import isD1Database from '../utils/is-d1-database.js';
import mapCauseToError from '../utils/map-cause-to-error.js';

export default function getDatabase(): D1Database {
  const { AUTHN_DB } = getEnv();
  if (isD1Database(AUTHN_DB)) {
    return AUTHN_DB;
  }

  if (typeof AUTHN_DB === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingDatabase,
    });
  }

  throw mapCauseToError({
    code: ErrorCode.InvalidDatabase,
    privateData: AUTHN_DB,
    publicData: typeof AUTHN_DB,
  });
}
