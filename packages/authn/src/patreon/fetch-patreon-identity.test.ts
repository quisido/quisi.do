import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import {
  EXPECT_ANY_HEADERS,
  EXPECT_ANY_NUMBER,
  EXPECT_ANY_STRING,
  expectStringMatching,
} from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

const IDENTITY_URL: string = expectStringMatching(
  /^https:\/\/host\.test\.patreon\.com\/api\/oauth2\/v2\/identity\?/u,
);

describe('fetchPatreonIdentity', (): void => {
  it('should emit and respond when the Patreon identity is invalid', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const {
      expectAnalyticsEngineDatasetToWriteDataPoint,
      expectPublicMetric,
      fetch,
      mockResponse,
    } = new TestAuthnExportedHandler({
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
      new Response('{"access_token":"test-access-token"}'),
    );

    mockResponse(
      IDENTITY_URL,
      {
        headers: EXPECT_ANY_HEADERS,
        method: 'GET',
      },
      new Response('/'),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('json'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonIdentityResponse,
      '/test-return-path/',
    );

    expectAnalyticsEngineDatasetToWriteDataPoint('PRIVATE_DATASET', {
      blobs: [IDENTITY_URL],
      doubles: [EXPECT_ANY_NUMBER, EXPECT_ANY_NUMBER],
      indexes: [WorkerMetricName.Fetch],
    });

    expectAnalyticsEngineDatasetToWriteDataPoint('PUBLIC_DATASET', {
      blobs: ['https://host.test.patreon.com'],
      doubles: [EXPECT_ANY_NUMBER, EXPECT_ANY_NUMBER],
      indexes: [WorkerMetricName.Fetch],
    });
  });

  it('should emit and respond when the Patreon identity is forbidden', async (): Promise<void> => {
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
      new Response('{"access_token":"test-access-token"}'),
    );

    mockResponse(
      IDENTITY_URL,
      {
        headers: EXPECT_ANY_HEADERS,
        method: 'GET',
      },
      new Response('{"key":"value"}', { status: StatusCode.Forbidden }),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('forbidden'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.ForbiddenPatreonIdentityResponse,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when the Patreon identity is an error', async (): Promise<void> => {
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
      new Response('{"access_token":"test-access-token"}'),
    );

    mockResponse(
      IDENTITY_URL,
      {
        headers: EXPECT_ANY_HEADERS,
        method: 'GET',
      },
      new Response('{"key":"value"}', { status: StatusCode.BadRequest }),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('error'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.UnknownPatreonIdentityError,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.UnknownPatreonIdentityError, {
      identity: '{"key":"value"}',
      status: StatusCode.BadRequest,
    });

    expectPublicMetric(MetricName.UnknownPatreonIdentityError, {
      status: StatusCode.BadRequest,
    });
  });

  it('should emit and respond when the Patreon identity is invalid', async (): Promise<void> => {
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
      new Response('{"access_token":"test-access-token"}'),
    );

    mockResponse(
      IDENTITY_URL,
      {
        headers: EXPECT_ANY_HEADERS,
        method: 'GET',
      },
      new Response('1234'),
    );

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('invalid'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectErrorResponse(ErrorCode.InvalidPatreonIdentity, '/test-return-path/');
    expectPublicMetric(MetricName.PatreonRequest);

    expectPrivateMetric(MetricName.InvalidPatreonIdentity, {
      value: '1234',
    });

    expectPublicMetric(MetricName.InvalidPatreonIdentity, {
      type: 'number',
    });
  });
});
