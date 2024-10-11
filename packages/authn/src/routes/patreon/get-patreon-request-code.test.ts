import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('getPatreonRequestCode', (): void => {
  it('should emit and respond when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon({
        code: undefined,
      });

    // Assert
    expectPublicMetric({ name: MetricName.MissingPatreonRequestCode });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=15',
      location: 'https://test.host/test-return-path/#authn:error=15',
    });
  });
});
