import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidPatreonTokenRequest', (): void => {
  it('should emit and respond when Patreon rejects with a description', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          error_description: 'test',
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('noDescription');

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonTokenRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenRequest,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenRequest, {
      description: 'test',
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when Patreon rejects without a description', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('description');

    // Assert
    expectPublicMetric(MetricName.MissingInvalidPatreonTokenRequestDescription);

    expectErrorResponse(
      ErrorCode.MissingInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectPrivateMetric(
      MetricName.MissingInvalidPatreonTokenRequestDescription,
      {
        value: '{"key":"value"}',
      },
    );
  });

  it('should emit and respond when Patreon rejects with an invalid description', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(
      new Response(
        JSON.stringify({
          error: 'invalid_request',
          error_description: true,
          key: 'value',
        }),
        {
          status: StatusCode.BadRequest,
        },
      ),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectErrorResponse(
      ErrorCode.InvalidInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectPrivateMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        value: '{"error_description":true,"key":"value"}',
      },
    );

    expectPublicMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        type: 'boolean',
      },
    );
  });
});
