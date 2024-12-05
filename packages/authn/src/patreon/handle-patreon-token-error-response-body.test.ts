import { ErrorCode } from '@quisido/authn-shared';
import { EXPECT_ANY_HEADERS, EXPECT_ANY_STRING } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonTokenErrorResponseBody', (): void => {
  it('should emit and respond when the Patreon token error response body is not a record', async (): Promise<void> => {
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
      new Response('true', {
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
        'cf-connecting-ip': mapStringToIp('patreonObject'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenErrorResponse,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      value: 'true',
    });

    expectPublicMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon token error response is missing an error code ', async (): Promise<void> => {
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
      new Response('{}', {
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
        'cf-connecting-ip': mapStringToIp('patreonError'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(
      ErrorCode.MissingPatreonTokenErrorResponseCode,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.MissingPatreonTokenErrorResponseCode, {
      value: '{}',
    });

    expectPublicMetric(MetricName.MissingPatreonTokenErrorResponseCode, {
      keys: '',
    });
  });
});
