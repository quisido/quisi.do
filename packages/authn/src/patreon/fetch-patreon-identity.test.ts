import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { EXPECT_ANY_NUMBER } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import { PATREON_IDENTITY_URL } from '../test/patreon-identity-url.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('fetchPatreonIdentity', (): void => {
  it('should emit and respond when the Patreon identity is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectAnalyticsEngineDatasetToWriteDataPoint,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('/'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('json');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonIdentityResponse,
      '/test-return-path/',
    );

    expectAnalyticsEngineDatasetToWriteDataPoint('PRIVATE_DATASET', {
      blobs: [PATREON_IDENTITY_URL],
      doubles: [EXPECT_ANY_NUMBER, EXPECT_ANY_NUMBER],
      indexes: [WorkerMetricName.Fetch],
    });

    expectAnalyticsEngineDatasetToWriteDataPoint('PUBLIC_DATASET', {
      blobs: ['https://host.test.patreon.com'],
      doubles: [EXPECT_ANY_NUMBER, EXPECT_ANY_NUMBER],
      indexes: [WorkerMetricName.Fetch],
    });
  });

  it('should emit and respond when the Patreon identity is forbidden', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();

    mockPatreonIdentity(
      new Response('{"key":"value"}', { status: StatusCode.Forbidden }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('forbidden');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.ForbiddenPatreonIdentityResponse,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
      value: '{"key":"value"}',
    });
  });

  it('should emit and respond when the Patreon identity is an error', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();

    mockPatreonIdentity(
      new Response('{"key":"value"}', { status: StatusCode.BadRequest }),
    );

    // Act
    const { expectErrorResponse } = await fetchPatreon('error');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.UnknownPatreonIdentityError,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.UnknownPatreonIdentityError, {
      identity: '{"key":"value"}',
      status: StatusCode.BadRequest,
    });

    expectToHaveEmitPublicMetric(MetricName.UnknownPatreonIdentityError, {
      status: StatusCode.BadRequest,
    });
  });

  it('should emit and respond when the Patreon identity is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('1234'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectErrorResponse(ErrorCode.InvalidPatreonIdentity, '/test-return-path/');
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonIdentity, {
      value: '1234',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentity, {
      type: 'number',
    });
  });
});
