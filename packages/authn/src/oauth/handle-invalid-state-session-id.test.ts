import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleInvalidStateSessionId', (): void => {
  it('should emit and respond for a missing state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      num: 1,
      returnPath: '/',
      str: 'str',
    });

    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectOAuthErrorResponse(ErrorCode.MissingStateSessionId);

    expectToHaveEmitPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam: testState,
    });

    expectToHaveEmitPublicMetric(MetricName.MissingStateSessionId, {
      keys: 'num, returnPath, str',
    });
  });

  it('should emit and respond for a non-string state session ID', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/',
      sessionId: null,
    });

    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectOAuthErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectOAuthErrorResponse(ErrorCode.InvalidStateSessionId);

    expectToHaveEmitPrivateMetric(MetricName.InvalidStateSessionId, {
      value: 'null',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidStateSessionId, {
      type: 'object',
    });
  });
});
