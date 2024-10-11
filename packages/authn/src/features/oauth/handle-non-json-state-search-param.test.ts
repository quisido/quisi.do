import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleNonJsonStateSearchParam', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/patreon/?state=/',
    );

    // Assert
    expectPublicMetric({ name: MetricName.NonJsonStateSearchParam });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.NonJsonStateSearchParam,
      value: '/',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=5',
      location: 'https://test.host/#authn:error=5',
    });
  });
});
