import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

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
    const { expectOAuthErrorResponse } = await fetchPatreon('object');

    // Assert
    expectOAuthErrorResponse(
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
    const { expectOAuthErrorResponse } = await fetchPatreon('error');

    // Assert
    expectOAuthErrorResponse(
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
