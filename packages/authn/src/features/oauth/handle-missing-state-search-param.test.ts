import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleMissingStateSearchParam', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/patreon/',
    );

    // Assert
    expectPublicMetric({ name: MetricName.MissingStateSearchParam });
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=4',
      location: 'https://test.host/#authn:error=4',
    });
  });
});
