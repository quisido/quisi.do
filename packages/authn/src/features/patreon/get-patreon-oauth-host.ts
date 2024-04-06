import ErrorCode from '../../constants/error-code.js';
import getEnv from '../../utils/get-env.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function getPatreonOAuthHost(): string {
  const { PATREON_OAUTH_HOST } = getEnv();

  if (typeof PATREON_OAUTH_HOST === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonOAuthHost,
    });
  }

  if (typeof PATREON_OAUTH_HOST !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonOAuthHost,
      privateData: PATREON_OAUTH_HOST,
      publicData: typeof PATREON_OAUTH_HOST,
    });
  }

  return PATREON_OAUTH_HOST;
}
