import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('mapPatreonOAuthTokenToAccessToken', (): void => {
  it('should emit and respond when the Patreon token is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('1234'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('record');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthToken,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
      value: '1234',
    });

    expectPublicMetric(MetricName.InvalidPatreonOAuthToken, {
      type: 'number',
    });
  });

  it('should emit and respond when the Patreon access token is missing', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('{"key":"value"}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('missing');

    // Assert
    expectPublicMetric(MetricName.MissingPatreonAccessToken);
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.MissingPatreonAccessToken,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.MissingPatreonAccessToken, {
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when the Patreon access token is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('{"access_token":1234}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonAccessToken,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonAccessToken, {
      value: '1234',
    });

    expectPublicMetric(MetricName.InvalidPatreonAccessToken, {
      type: 'number',
    });
  });
});
