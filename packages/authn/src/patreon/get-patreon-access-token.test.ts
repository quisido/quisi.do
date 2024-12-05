import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { EXPECT_ANY_HEADERS, EXPECT_ANY_STRING } from 'cloudflare-test-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';
import { TEST_PATREON_URL } from '../test/test-patreon-search.js';

describe('getPatreonAccessToken', (): void => {
  it('should emit and respond when the Patreon OAuth host is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_HOST: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonOAuthHost'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthHost,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client ID is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_CLIENT_ID: true,
          PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
        },
      });

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonOAuthClientId'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientId,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client secret is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_CLIENT_ID: 'test-client-id',
          PATREON_OAUTH_CLIENT_SECRET: true,
          PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
        },
      });

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonOAuthClientSecret'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientSecret,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth redirect URI is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_CLIENT_ID: 'test-client-id',
          PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
          PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
          PATREON_OAUTH_REDIRECT_URI: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonOAuthRedirectUri'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthRedirectUri,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon token response is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch, mockResponse } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_CLIENT_ID: 'test-client-id',
          PATREON_OAUTH_CLIENT_SECRET: 'test-client-secret',
          PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
          PATREON_OAUTH_REDIRECT_URI: 'https://redirect.test.quisi.do/patreon/',
        },
      });

    mockResponse(
      'https://host.test.patreon.com/api/oauth2/token',
      {
        body: EXPECT_ANY_STRING,
        headers: EXPECT_ANY_HEADERS,
        method: 'POST',
      },
      new Response('/'),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonToken'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonTokenResponse);
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenResponse,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenResponse, {
      text: '/',
    });
  });
});
