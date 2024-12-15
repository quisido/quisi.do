import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidReturnPath', (): void => {
  it('should emit and respond for missing return paths', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      num: 1,
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
    expectOAuthErrorResponse(ErrorCode.MissingReturnPath);

    expectToHaveEmitPrivateMetric(MetricName.MissingReturnPath, {
      searchParam: testState,
    });

    expectToHaveEmitPublicMetric(MetricName.MissingReturnPath, {
      keys: 'num, str',
    });
  });

  it('should emit and respond for non-string return paths', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: null,
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
    expectOAuthErrorResponse(ErrorCode.InvalidReturnPath);

    expectToHaveEmitPrivateMetric(MetricName.InvalidReturnPath, {
      value: 'null',
    });

    expectToHaveEmitPublicMetric(MetricName.InvalidReturnPath, {
      type: 'object',
    });
  });
});
