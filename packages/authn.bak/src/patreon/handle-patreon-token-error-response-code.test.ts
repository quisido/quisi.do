import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handlePatreonTokenErrorResponseCode', (): void => {
  it('should emit and respond when Patreon rejects the client ID', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetchPatreon, mockPatreonToken } =
      new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"invalid_client"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('client');

    // Assert
    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonClientId,
      '/test-return-path/',
    );

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonClientId, {
      clientId: 'test-client-id',
    });
  });

  it('should emit and respond when Patreon rejects the grant code', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"invalid_grant"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('grant');

    // Assert
    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonGrantCode,
      '/test-return-path/',
    );
    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonGrantCode);
    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonGrantCode, {
      code: 'test-code',
    });
  });

  it('should emit and respond when Patreon rejects for an unknown reason', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{"error":"unknown","message":"test"}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('unknown');

    // Assert
    expectToHaveEmitPublicMetric(
      MetricName.UnknownPatreonTokenErrorResponseCode,
    );

    expectOAuthErrorResponse(
      ErrorCode.UnknownPatreonTokenErrorResponseCode,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(
      MetricName.UnknownPatreonTokenErrorResponseCode,
      {
        code: 'unknown',
        value: '{"message":"test"}',
      },
    );
  });
});
