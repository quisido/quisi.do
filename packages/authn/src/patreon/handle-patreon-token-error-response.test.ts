import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

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
    const { expectErrorResponse } = await fetchPatreon('noBody');

    // Assert
    expectToHaveEmitPublicMetric(
      MetricName.MissingPatreonTokenErrorResponseBody,
    );
    expectErrorResponse(
      ErrorCode.MissingPatreonTokenErrorResponseBody,
      '/test-return-path/',
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
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectToHaveEmitPublicMetric(
      MetricName.InvalidPatreonTokenErrorResponseBody,
    );

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenErrorResponseBody,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(
      MetricName.InvalidPatreonTokenErrorResponseBody,
      {
        body: '/',
      },
    );
  });
});
