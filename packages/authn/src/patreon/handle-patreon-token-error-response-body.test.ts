import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonTokenErrorResponseBody', (): void => {
  it('should emit and respond when the Patreon token error response body is not a record', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('true', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('object');

    // Assert
    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenErrorResponse,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      value: 'true',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon token error response is missing an error code ', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response('{}', {
        status: StatusCode.BadRequest,
      }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('error');

    // Assert
    expectErrorResponse(
      ErrorCode.MissingPatreonTokenErrorResponseCode,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(
      MetricName.MissingPatreonTokenErrorResponseCode,
      {
        value: '{}',
      },
    );

    expectToHaveEmitPublicMetric(
      MetricName.MissingPatreonTokenErrorResponseCode,
      {
        keys: '',
      },
    );
  });
});
