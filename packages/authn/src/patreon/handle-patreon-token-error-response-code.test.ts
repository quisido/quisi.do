import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonTokenErrorResponseCode', (): void => {
  it('should emit and respond when Patreon rejects the client ID', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon, mockPatreonToken } =
      new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"invalid_client"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('client');

    // Assert
    expectErrorResponse(ErrorCode.InvalidPatreonClientId, '/test-return-path/');
    expectPublicMetric(MetricName.InvalidPatreonClientId, {
      clientId: 'test-client-id',
    });
  });

  it('should emit and respond when Patreon rejects the grant code', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"invalid_grant"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('grant');

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
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"unknown","message":"test"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('unknown');

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
