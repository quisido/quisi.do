import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import { EXPECT_ANY_HEADERS, EXPECT_ANY_STRING } from '../test/expect-any.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonTokenErrorResponse', (): void => {
  it('should emit and respond when the Patreon token has no body', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

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
      new Response(null, {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonNoBody'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.MissingPatreonTokenErrorResponseBody);
    expectErrorResponse(
      ErrorCode.MissingPatreonTokenErrorResponseBody,
      '/test-return-path/',
    );
  });

  it('should emit and respond when the Patreon token is invalid JSON', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

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
      new Response('/', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonInvalidJson'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonTokenErrorResponseBody);

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenErrorResponseBody,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenErrorResponseBody, {
      body: '/',
    });
  });
});
