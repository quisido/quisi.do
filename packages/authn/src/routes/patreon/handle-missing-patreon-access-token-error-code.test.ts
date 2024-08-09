import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleMissingPatreonAccessTokenErrorCode', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon, mockPatreonToken } =
      new AuthnTest();

    mockPatreonToken('{"a":"b","c":"d"}', {
      status: 400,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.MissingPatreonAccessTokenErrorCode,
      value: '{"a":"b","c":"d"}',
    });

    expectPublicMetric({
      keys: 'a, c',
      name: MetricName.MissingPatreonAccessTokenErrorCode,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=27',
      location: 'https://test.host/test-return-path/#authn:error=27',
    });
  });
});
