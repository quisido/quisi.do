import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidPatreonTokenRequest', (): void => {
  it('should emit and respond when Patreon rejects with a description', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
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
    const { expectOAuthErrorResponse } = await fetchPatreon('noDescription');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonTokenRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonTokenRequest,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonTokenRequest, {
      description: 'test',
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when Patreon rejects without a description', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
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
    const { expectOAuthErrorResponse } = await fetchPatreon('description');

    // Assert
    expectToHaveEmitPublicMetric(
      MetricName.MissingInvalidPatreonTokenRequestDescription,
    );

    expectOAuthErrorResponse(
      ErrorCode.MissingInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(
      MetricName.MissingInvalidPatreonTokenRequestDescription,
      {
        value: '{"key":"value"}',
      },
    );
  });

  it('should emit and respond when Patreon rejects with an invalid description', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
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
    const { expectOAuthErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectOAuthErrorResponse(
      ErrorCode.InvalidInvalidPatreonTokenRequestDescription,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        value: '{"error_description":true,"key":"value"}',
      },
    );

    expectToHaveEmitPublicMetric(
      MetricName.InvalidInvalidPatreonTokenRequestDescription,
      {
        type: 'boolean',
      },
    );
  });
});
