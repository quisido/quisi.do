import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidStateSessionId', (): void => {
  it('should emit and respond for a missing state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      a: 1,
      c: 'str',
      returnPath: '/',
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
      await fetch(`/patreon/?${search}`);

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=10',
      location: 'https://host.test.quisi.do/#authn:error=10',
    });

    expectPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam: testState,
    });

    expectPublicMetric(MetricName.MissingStateSessionId, {
      keys: 'a, c, returnPath',
    });
  });

  it('should emit and respond for a non-string state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: null,
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
      await fetch(`/patreon/?${search}`);

    // Assert
    expectNoBody();
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://host.test.quisi.do/#authn:error=51',
      location: 'https://host.test.quisi.do/#authn:error=51',
    });

    expectPrivateMetric(MetricName.InvalidStateSessionId, {
      value: 'null',
    });

    expectPublicMetric(MetricName.InvalidStateSessionId, {
      type: 'object',
    });
  });
});
