import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getPatreonAccessToken', (): void => {
  it('should emit and respond when the Patreon OAuth host is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new TestAuthnExportedHandler({
        env: {
          PATREON_OAUTH_HOST: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetchPatreon('host');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthHost,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client ID is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new TestAuthnExportedHandler({
        env: {
          PATREON_OAUTH_CLIENT_ID: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetchPatreon('client');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientId,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client secret is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new TestAuthnExportedHandler({
        env: {
          PATREON_OAUTH_CLIENT_SECRET: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetchPatreon('secret');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientSecret,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth redirect URI is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new TestAuthnExportedHandler({
        env: {
          PATREON_OAUTH_REDIRECT_URI: true,
        },
      });

    // Act
    const { expectErrorResponse } = await fetchPatreon('redirect');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthRedirectUri,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon token response is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('/'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('token');

    // Assert
    expectPublicMetric(MetricName.InvalidPatreonTokenResponse);
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonTokenResponse,
      '/test-return-path/',
    );

    expectPrivateMetric(MetricName.InvalidPatreonTokenResponse, {
      text: '/',
    });
  });
});
