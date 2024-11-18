import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleOAuthPathname', (): void => {
  it('should support a missing state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler({
      env: {
        HOST: 'host.test.quisi.do',
      },
    });

    // Act
    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch('/patreon/');

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.MissingStateSearchParam);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=4',
      location: 'https://host.test.quisi.do/#authn:error=4',
    });
  });

  it('should support an invalid JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
        },
      });

    // Act
    const search: string = new URLSearchParams({ state: '/' }).toString();
    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`);

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.NonJsonStateSearchParam);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=5',
      location: 'https://host.test.quisi.do/#authn:error=5',
    });

    expectPrivateMetric(MetricName.NonJsonStateSearchParam, {
      value: '/',
    });
  });

  it('should support a non-object JSON state search parameter', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
        },
      });

    // Act
    const search: string = new URLSearchParams({ state: '1234' }).toString();
    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`);

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=8',
      location: 'https://host.test.quisi.do/#authn:error=8',
    });

    expectPrivateMetric(MetricName.NonObjectState, {
      value: '1234',
    });

    expectPublicMetric(MetricName.NonObjectState, {
      type: 'number',
    });
  });

  it('should identify CSRF', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: 'test-session-id-state',
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
    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`, {
        headers: new Headers({
          cookie: '__Secure-Session-ID=test-session-id-cookie',
        }),
      });

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.CSRF);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=14',
      location: 'https://host.test.quisi.do/#authn:error=14',
    });

    expectPrivateMetric(MetricName.CSRF, {
      cookie: 'test-session-id-cookie',
      state: 'test-session-id-state',
    });
  });
});
