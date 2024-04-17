import { ErrorCode } from '@quisido/authn-shared';
import getEnv from '../../utils/get-env.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function getPatreonOAuthClientId(): string {
  const { PATREON_OAUTH_CLIENT_ID } = getEnv();

  if (typeof PATREON_OAUTH_CLIENT_ID === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonOAuthClientID,
    });
  }

  if (typeof PATREON_OAUTH_CLIENT_ID !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonOAuthClientID,
      privateData: PATREON_OAUTH_CLIENT_ID,
      publicData: typeof PATREON_OAUTH_CLIENT_ID,
    });
  }

  return PATREON_OAUTH_CLIENT_ID;
}
