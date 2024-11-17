import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidStateSessionId', (): void => {
  it('should emit and respond for missing session IDs', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } = await fetch(
      '/patreon/?state=%7B%22a%22%3A%22b%22%2C%22returnPath%22%3A%22test%22%7D',
    );

    // Assert
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam: '{"a":"b","returnPath":"test"}',
    });

    expectPublicMetric(MetricName.MissingStateSessionId, {
      keys: 'a, returnPath',
    });

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=10',
      location: 'https://test.host/#authn:error=10',
    });
  });

  it('should emit and respond for invalid session IDs', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } = await fetch(
      '/patreon/?state=%7B%22returnPath%22%3A%22test%22%2C%22sessionId%22%3Atrue%7D',
    );

    // Assert
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectPrivateMetric(MetricName.InvalidStateSessionId, {
      value: 'true',
    });

    expectPublicMetric(MetricName.InvalidStateSessionId, {
      type: 'boolean',
    });

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=51',
      location: 'https://test.host/#authn:error=51',
    });
  });
});
