import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidStateSessionId', (): void => {
  it('should emit and respond for a missing state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      num: 1,
      returnPath: '/',
      str: 'str',
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.MissingStateSessionId);

    expectPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam: testState,
    });

    expectPublicMetric(MetricName.MissingStateSessionId, {
      keys: 'num, returnPath, str',
    });
  });

  it('should emit and respond for a non-string state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: null,
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.InvalidStateSessionId);

    expectPrivateMetric(MetricName.InvalidStateSessionId, {
      value: 'null',
    });

    expectPublicMetric(MetricName.InvalidStateSessionId, {
      type: 'object',
    });
  });
});
