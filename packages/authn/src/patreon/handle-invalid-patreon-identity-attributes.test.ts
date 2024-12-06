import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

const TEST_NOW = 12345678;

describe('handleInvalidPatreonIdentityAttributes', (): void => {
  it('should emit and respond when the Patreon identity attributes are missing', async (): Promise<void> => {
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
    const { expectNoBody, expectStatusCodeToBe } =
      await fetchPatreon('missing');

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.SeeOther);
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

  it('should emit and respond when the Patreon identity attributes are invalid', async (): Promise<void> => {
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
    const { expectNoBody, expectStatusCodeToBe } =
      await fetchPatreon('invalid');

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.SeeOther);
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
