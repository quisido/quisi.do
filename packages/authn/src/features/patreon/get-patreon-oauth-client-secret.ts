import ErrorCode from '../../constants/error-code.js';
import getEnv from '../../utils/get-env.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function getPatreonOAuthClientSecret(): string {
  const { PATREON_OAUTH_CLIENT_SECRET } = getEnv();

  if (typeof PATREON_OAUTH_CLIENT_SECRET === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonOAuthClientSecret,
    });
  }

  if (typeof PATREON_OAUTH_CLIENT_SECRET !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonOAuthClientSecret,
      privateData: PATREON_OAUTH_CLIENT_SECRET,
      publicData: typeof PATREON_OAUTH_CLIENT_SECRET,
    });
  }

  return PATREON_OAUTH_CLIENT_SECRET;
}
