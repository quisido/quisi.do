import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidReturnPath', (): void => {
  it('should emit and respond for missing return path', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } = await fetch(
      '/patreon/?state=%7B%22a%22%3A%22b%22%2C%22c%22%3A%22d%22%7D',
    );

    // Assert
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectPrivateMetric(MetricName.MissingReturnPath, {
      searchParam: '{"a":"b","c":"d"}',
    });

    expectPublicMetric(MetricName.MissingReturnPath, {
      keys: 'a, c',
    });

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=9',
      location: 'https://test.host/#authn:error=9',
    });
  });

  it('should emit and respond for non-string return paths', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } = await fetch(
      '/patreon/?state=%7B%22returnPath%22%3Atrue%7D',
    );

    // Assert
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectPrivateMetric(MetricName.InvalidReturnPath, {
      value: 'true',
    });

    expectPublicMetric(MetricName.InvalidReturnPath, {
      type: 'boolean',
    });

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=11',
      location: 'https://test.host/#authn:error=11',
    });
  });
});
