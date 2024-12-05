import { ErrorCode } from '@quisido/authn-shared';
import { EXPECT_ANY_HEADERS, EXPECT_ANY_STRING } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';
import { TEST_PATREON_URL } from '../test/test-patreon-search.js';

describe('handleInvalidPatreonTokenRequest', (): void => {
  it('should emit and respond when Patreon rejects with a description', async (): Promise<void> => {
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
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          error_description: 'test',
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonDescription'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonTokenRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenRequest,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenRequest, {
      description: 'test',
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when Patreon rejects without a description', async (): Promise<void> => {
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
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonNoDescription'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.MissingInvalidPatreonTokenRequestDescription);

    expectErrorResponse(
      ErrorCode.MissingInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectPrivateMetric(
      MetricName.MissingInvalidPatreonTokenRequestDescription,
      {
        value: '{"key":"value"}',
      },
    );
  });

  it('should emit and respond when Patreon rejects with an invalid description', async (): Promise<void> => {
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
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          error_description: true,
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonInvalid'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(
      ErrorCode.InvalidInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectPrivateMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        value: '{"error_description":true,"key":"value"}',
      },
    );

    expectPublicMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        type: 'boolean',
      },
    );
  });
});
