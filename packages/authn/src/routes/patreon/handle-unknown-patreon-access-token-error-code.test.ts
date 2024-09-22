import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleUnknownPatreonAccessTokenErrorCode', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonToken: '{"error":"test","key":"value"}',
      patreonTokenStatusCode: StatusCode.BadRequest,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.UnknownPatreonAccessTokenErrorCode });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      code: 'test',
      name: MetricName.UnknownPatreonAccessTokenErrorCode,
      value: '{"key":"value"}',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=33',
      location: 'https://test.host/test-return-path/#authn:error=33',
    });
  });
});
