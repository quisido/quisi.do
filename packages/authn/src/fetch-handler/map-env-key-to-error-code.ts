import { ErrorCode } from '@quisido/authn-shared';

/**
 * TODO: Create an `EnvKey` enum.
 */

export default function mapEnvKeyToErrorCode(key: string): ErrorCode {
  switch (key) {
    case 'ANALYTICS_ID':
      return ErrorCode.InvalidAnalyticsId;

    case 'ANALYTICS_SECRET':
      return ErrorCode.InvalidAnalyticsSecret;

    case 'AUTHN_DB':
      return ErrorCode.InvalidDatabase;

    case 'AUTHN_USER_IDS':
      return ErrorCode.InvalidAuthnUserIdsNamespace;

    case 'PATREON_OAUTH_CLIENT_ID':
      return ErrorCode.InvalidPatreonOAuthClientId;

    case 'PATREON_OAUTH_CLIENT_SECRET':
      return ErrorCode.InvalidPatreonOAuthClientSecret;

    case 'PATREON_OAUTH_HOST':
      return ErrorCode.InvalidPatreonOAuthHost;

    case 'PATREON_OAUTH_REDIRECT_URI':
      return ErrorCode.MissingPatreonOAuthRedirectUri;

    default:
      return ErrorCode.InvalidUnknownEnv;
  }
}
