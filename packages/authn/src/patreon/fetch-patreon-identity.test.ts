import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { EXPECT_ANY_NUMBER } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { PATREON_IDENTITY_URL } from '../../test/patreon-identity-url.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('fetchPatreonIdentity', (): void => {
  it('should emit and respond when the Patreon identity is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPublicMetric,
      expectToHaveWrittenDataPoint,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('/'));

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('json');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonIdentityResponse,
      '/test-return-path/',
    );

    expectToHaveWrittenDataPoint('PRIVATE_DATASET', {
      blobs: [PATREON_IDENTITY_URL],
      doubles: [EXPECT_ANY_NUMBER, EXPECT_ANY_NUMBER],
      indexes: [WorkerMetricName.Fetch],
    });

    expectToHaveWrittenDataPoint('PUBLIC_DATASET', {
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
    const { expectOAuthErrorResponse } = await fetchPatreon('forbidden');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
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
    const { expectOAuthErrorResponse } = await fetchPatreon('error');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
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
    const { expectOAuthErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonIdentity,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonIdentity, {
      value: '1234',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentity, {
      type: 'number',
    });
  });
});
