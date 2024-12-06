import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('mapPatreonOAuthTokenToAccessToken', (): void => {
  it('should emit and respond when the Patreon token is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('1234'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('record');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthToken,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
      value: '1234',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonOAuthToken, {
      type: 'number',
    });
  });

  it('should emit and respond when the Patreon access token is missing', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('{"key":"value"}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('missing');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingPatreonAccessToken);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.MissingPatreonAccessToken,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.MissingPatreonAccessToken, {
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when the Patreon access token is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('{"access_token":1234}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonAccessToken,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonAccessToken, {
      value: '1234',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonAccessToken, {
      type: 'number',
    });
  });
});
