import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getPatreonAccessToken', (): void => {
  it('should emit and respond when the Patreon OAuth host is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
    } = new TestAuthnExportedHandler({
      env: {
        PATREON_OAUTH_HOST: true,
      },
    });

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('host');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonOAuthHost,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client ID is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
    } = new TestAuthnExportedHandler({
      env: {
        PATREON_OAUTH_CLIENT_ID: true,
      },
    });

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('client');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientId,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client secret is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
    } = new TestAuthnExportedHandler({
      env: {
        PATREON_OAUTH_CLIENT_SECRET: true,
      },
    });

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('secret');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonOAuthClientSecret,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_SECRET',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth redirect URI is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
    } = new TestAuthnExportedHandler({
      env: {
        PATREON_OAUTH_REDIRECT_URI: true,
      },
    });

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('redirect');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonOAuthRedirectUri,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_REDIRECT_URI',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon token response is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken(new Response('/'));

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('token');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonTokenResponse);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonTokenResponse,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonTokenResponse, {
      text: '/',
    });
  });
});
