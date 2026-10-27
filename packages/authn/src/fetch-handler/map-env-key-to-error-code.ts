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

    case 'JWT_AUDIENCE':
    case 'JWT_ENCRYPTION_SECRET':
    case 'JWT_ISSUER':
      return ErrorCode.InvalidJwtConfiguration;

    case 'PATREON_OAUTH_CLIENT_ID':
      return ErrorCode.InvalidPatreonOAuthClientId;

    case 'PATREON_OAUTH_CLIENT_SECRET':
      return ErrorCode.InvalidPatreonOAuthClientSecret;

    case 'PATREON_OAUTH_HOST':
      return ErrorCode.InvalidPatreonOAuthHost;

    case 'PATREON_OAUTH_REDIRECT_URI':
      return ErrorCode.InvalidPatreonOAuthRedirectUri;

    default:
      return ErrorCode.InvalidUnknownEnv;
  }
}
