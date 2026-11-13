import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { OAuthProvider } from '../constants/oauth-provider.js';

const TEST_NOW = 12345678;

describe('handleInvalidPatreonIdentityAttributes', (): void => {
  it('should emit, put, and respond when the Patreon identity attributes are missing', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      expectToHavePutAuthnData,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      now(): number {
        return TEST_NOW;
      },
    });

    mockPatreonToken();
    mockPatreonIdentity(new Response('{"data":{"id":"test-id"}}'));

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('missing');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveEmitPublicMetric(MetricName.MissingPatreonIdentityAttributes);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectToHaveEmitPrivateMetric(MetricName.MissingPatreonIdentityAttributes, {
      data: '{"id":"test-id"}',
    });

    expectToHavePutAuthnData(
      `provider-${OAuthProvider.Patreon.toString()}/test-id.json`,
      '{"data":{"id":"test-id"}}',
      {
        customMetadata: {
          timestamp: TEST_NOW.toString(),
        },
        httpMetadata: {
          contentType: 'application/json',
        },
      },
    );
  });

  it('should emit, put, and respond when the Patreon identity attributes are invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      expectToHavePutAuthnData,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      now(): number {
        return TEST_NOW;
      },
    });

    mockPatreonToken();
    mockPatreonIdentity(
      new Response('{"data":{"attributes":1234,"id":"test-id"}}'),
    );

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('invalid');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectToHaveEmitPublicMetric(MetricName.InvalidPatreonIdentityAttributes, {
      type: 'number',
    });

    expectToHaveEmitPrivateMetric(MetricName.InvalidPatreonIdentityAttributes, {
      value: '1234',
    });

    expectToHavePutAuthnData(
      `provider-${OAuthProvider.Patreon.toString()}/test-id.json`,
      '{"data":{"attributes":1234,"id":"test-id"}}',
      {
        customMetadata: {
          timestamp: TEST_NOW.toString(),
        },
        httpMetadata: {
          contentType: 'application/json',
        },
      },
    );
  });
});
