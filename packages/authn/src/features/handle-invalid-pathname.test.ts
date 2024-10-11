import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('handleInvalidPathname', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/test-invalid-pathname/?search',
    );

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPublicMetric({
      name: MetricName.NotFound,
      pathname: '/test-invalid-pathname/',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=404',
      location: 'https://test.host/#authn:error=404',
    });
  });
});
