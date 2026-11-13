import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handlePatreonTokenErrorResponse', (): void => {
  it('should emit and respond when the Patreon token has no body', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetchPatreon, mockPatreonToken } =
      new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response(null, {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('noBody');

    // Assert
    expectOAuthErrorResponse(
      ErrorCode.MissingPatreonTokenErrorResponseBody,
      '/test-return-path/',
    );

    expectToHaveEmitPublicMetric(
      MetricName.MissingPatreonTokenErrorResponseBody,
    );
  });

  it('should emit and respond when the Patreon token is invalid JSON', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('/', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonTokenErrorResponseBody,
      '/test-return-path/',
    );

    expectToHaveEmitPublicMetric(
      MetricName.InvalidPatreonTokenErrorResponseBody,
    );

    expectToHaveEmitPrivateMetric(
      MetricName.InvalidPatreonTokenErrorResponseBody,
      {
        body: '/',
      },
    );
  });
});
