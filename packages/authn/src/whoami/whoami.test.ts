import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

const TEST_USER_ID = 1234;

describe('WhoAmI', (): void => {
  it('should support the OPTIONS method', async (): Promise<void> => {
    // Assemble
    const { fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch('/whoami/', {
        method: 'OPTIONS',
      });

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.OK);
    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support a missing AuthN cookie', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectBodyToBe, expectHeadersToBe, expectStatusCodeToBe } =
      await fetch('/whoami/');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingAuthnId);
    expectStatusCodeToBe(StatusCode.OK);

    expectBodyToBe({
      code: WhoAmIResponseCode.MissingAuthnId,
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support in-memory caching', async (): Promise<void> => {
    const testIp: string = mapStringToIp('whoamiCaching');

    // Assemble
    const { expectToHaveEmitPrivateMetric, expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        authnUserIds: {
          abcdef: TEST_USER_ID.toString(),
        },
      });

    // Act
    await fetch('/whoami/', {
      headers: new Headers({
        'cf-connecting-ip': testIp,
        cookie: '__Secure-Authentication-ID=abcdef',
      }),
    });

    const { expectBodyToBe, expectHeadersToBe, expectStatusCodeToBe } =
      await fetch('/whoami/', {
        headers: new Headers({
          'cf-connecting-ip': testIp,
          cookie: '__Secure-Authentication-ID=abcdef',
        }),
      });

    // Assert
    expectToHaveEmitPublicMetric(MetricName.CachedAuthnId);
    expectStatusCodeToBe(StatusCode.OK);

    expectBodyToBe({
      code: WhoAmIResponseCode.Cached,
      id: TEST_USER_ID,
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });

    expectToHaveEmitPrivateMetric(MetricName.CachedAuthnId, {
      userId: TEST_USER_ID,
    });
  });

  it('should throttle', async (): Promise<void> => {
    const testIp: string = mapStringToIp('whoamiThrottle');

    // Assemble
    const { expectToHaveEmitPrivateMetric, expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    await fetch('/whoami/', {
      headers: new Headers({
        'cf-connecting-ip': testIp,
        cookie: '__Secure-Authentication-ID=abcdefg',
      }),
    });

    const { expectBodyToBe, expectHeadersToBe, expectStatusCodeToBe } =
      await fetch('/whoami/', {
        headers: new Headers({
          'cf-connecting-ip': testIp,
          cookie: '__Secure-Authentication-ID=bcdefg',
        }),
      });

    // Assert
    expectToHaveEmitPublicMetric(MetricName.WhoAmIThrottled);
    expectStatusCodeToBe(StatusCode.TooManyRequests);

    expectBodyToBe({
      code: WhoAmIResponseCode.Throttled,
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });

    expectToHaveEmitPrivateMetric(MetricName.WhoAmIThrottled, {
      ip: testIp,
    });
  });
});
