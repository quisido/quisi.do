import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('getPatreonRequestCode', (): void => {
  it('should emit and respond when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } =
      await fetch('/patreon/');

    // Assert
    expectPublicMetric(MetricName.MissingPatreonRequestCode);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=15',
      location: 'https://test.host/test-return-path/#authn:error=15',
    });
  });
});
