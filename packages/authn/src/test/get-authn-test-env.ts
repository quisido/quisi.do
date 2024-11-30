import { TestAnalyticsEngineDataset } from 'cloudflare-test-utils';
import { EnvironmentName } from '../constants/environment-name.js';

export default function getAuthnTestEnv(
  options: Partial<Record<string, unknown>>,
): Partial<Record<string, unknown>> {
  const getOption = (key: string, defaultValue: unknown): unknown => {
    if (key in options) {
      return options[key];
    }

    return defaultValue;
  };

  return {
    COOKIE_DOMAIN: getOption('cookieDomain', 'localhost'),
    ENVIRONMENT_NAME: getOption('environmentName', EnvironmentName.Test),
    HOST: getOption('host', 'test.host'),
    PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
    PUBLIC_DATASET: new TestAnalyticsEngineDataset(),

    PATREON_OAUTH_CLIENT_ID: getOption(
      'patreonOAuthClientId',
      'test-client-id',
    ),

    PATREON_OAUTH_CLIENT_SECRET: getOption(
      'patreonOAuthClientSecret',
      'test-client-secret',
    ),

    PATREON_OAUTH_REDIRECT_URI: getOption(
      'patreonOAuthRedirectUri',
      'https://localhost/patreon/callback',
    ),
  };
}
