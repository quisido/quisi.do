import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleOAuthPathname', (): void => {
  it('should support throttling', async (): Promise<void> => {
    const testIp: string = mapStringToIp('oauthThrottle');
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
        },
      });

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': testIp,
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`, {
        headers: new Headers({
          'cf-connecting-ip': testIp,
          cookie: '__Secure-Session-ID=test-session-id',
        }),
      });

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.OAuthThrottled);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      location: 'https://host.test.quisi.do/test-return-path/#authn:error=429',

      'content-location':
        'https://host.test.quisi.do/test-return-path/#authn:error=429',
    });

    expectPrivateMetric(MetricName.OAuthThrottled, {
      ip: testIp,
    });
  });
});
