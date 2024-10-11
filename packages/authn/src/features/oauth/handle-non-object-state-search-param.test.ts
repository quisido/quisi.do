import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleNonObjectStateSearchParam', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/patreon/?state=%22test%22',
    );

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.NonObjectState,
      value: '"test"',
    });

    expectPublicMetric({
      name: MetricName.NonObjectState,
      type: 'string',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=8',
      location: 'https://test.host/#authn:error=8',
    });
  });
});
