import { ErrorCode } from '@quisido/authn-shared';
import { EXPECT_ANY_HEADERS, EXPECT_ANY_STRING } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';
import { TEST_PATREON_URL } from '../test/test-patreon-search.js';

describe('handlePatreonTokenErrorResponseCode', (): void => {
  it('should emit and respond when Patreon rejects the client ID', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch, mockResponse } =
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
      new Response('{"error":"invalid_client"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonClient'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(ErrorCode.InvalidPatreonClientId, '/test-return-path/');
    expectPublicMetric(MetricName.InvalidPatreonClientId, {
      clientId: 'test-client-id',
    });
  });

  it('should emit and respond when Patreon rejects the grant code', async (): Promise<void> => {
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
      new Response('{"error":"invalid_grant"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonGrant'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(
      ErrorCode.InvalidPatreonGrantCode,
      '/test-return-path/',
    );
    expectPublicMetric(MetricName.InvalidPatreonGrantCode);
    expectPrivateMetric(MetricName.InvalidPatreonGrantCode, {
      code: 'test-code',
    });
  });

  it('should emit and respond when Patreon rejects for an unknown reason', async (): Promise<void> => {
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
      new Response('{"error":"unknown","message":"test"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonUnknown'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.UnknownPatreonTokenErrorResponseCode);

    expectErrorResponse(
      ErrorCode.UnknownPatreonTokenErrorResponseCode,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.UnknownPatreonTokenErrorResponseCode, {
      code: 'unknown',
      value: '{"message":"test"}',
    });
  });
});
