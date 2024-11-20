import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getPatreonRequestCode', (): void => {
  it('should emit and respond when the request code is missing', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler({
      env: {
        HOST: 'host.test.quisi.do',
      },
    });

    // Act
    const search: string = new URLSearchParams({
      state: testState,
    }).toString();

    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`, {
        headers: new Headers({
          'cf-connecting-ip': mapStringToIp('patreonRequestCode'),
          cookie: '__Secure-Session-ID=test-session-id',
        }),
      });

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.MissingPatreonRequestCode);
    expectPublicMetric(MetricName.PatreonRequest);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      location: 'https://host.test.quisi.do/test-return-path/#authn:error=15',

      'content-location':
        'https://host.test.quisi.do/test-return-path/#authn:error=15',
    });
  });
});
