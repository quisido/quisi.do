import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidReturnPath', (): void => {
  it('should emit and respond for missing return paths', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      a: 1,
      c: 'str',
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
      'content-location': 'https://host.test.quisi.do/#authn:error=9',
      location: 'https://host.test.quisi.do/#authn:error=9',
    });

    expectPrivateMetric(MetricName.MissingReturnPath, {
      searchParam: testState,
    });

    expectPublicMetric(MetricName.MissingReturnPath, {
      keys: 'a, c',
    });
  });

  it('should emit and respond for non-string return paths', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: null,
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
      'content-location': 'https://host.test.quisi.do/#authn:error=11',
      location: 'https://host.test.quisi.do/#authn:error=11',
    });

    expectPrivateMetric(MetricName.InvalidReturnPath, {
      value: 'null',
    });

    expectPublicMetric(MetricName.InvalidReturnPath, {
      type: 'object',
    });
  });
});
