import ErrorCode from '../../constants/error-code.js';
import getEnv from '../../utils/get-env.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function getPatreonOAuthRedirectUri(): string {
  const { PATREON_OAUTH_REDIRECT_URI } = getEnv();

  if (typeof PATREON_OAUTH_REDIRECT_URI === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonOAuthRedirectUri,
    });
  }

  if (typeof PATREON_OAUTH_REDIRECT_URI !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonOAuthRedirectUri,
      privateData: PATREON_OAUTH_REDIRECT_URI,
      publicData: typeof PATREON_OAUTH_REDIRECT_URI,
    });
  }

  return PATREON_OAUTH_REDIRECT_URI;
}
