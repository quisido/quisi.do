import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleInvalidPatreonIdentityId', (): void => {
  it('should emit and respond when the Patreon identity ID is missing', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('{"data":{"a":"b"}}'));

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('missing');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingPatreonIdentityId);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.MissingPatreonIdentityId,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.MissingPatreonIdentityId, {
      data: '{"a":"b"}',
    });
  });

  it('should emit and respond when the Patreon identity ID is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('{"data":{"id":1234}}'));

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidPatreonIdentityId,
      '/test-return-path/',
    );

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentityId, {
      type: 'number',
    });

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonIdentityId, {
      value: '1234',
    });
  });
});
