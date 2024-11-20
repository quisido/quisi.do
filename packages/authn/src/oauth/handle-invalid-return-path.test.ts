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
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
        },
      });

    // Act
    const search: string = new URLSearchParams({ state: testState }).toString();
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.MissingReturnPath);

    expectPrivateMetric(MetricName.MissingReturnPath, {
      searchParam: testState,
    });

    expectPublicMetric(MetricName.MissingReturnPath, {
      keys: 'num, str',
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
    const { expectErrorResponse } = await fetch(`/patreon/?${search}`);

    // Assert
    expectErrorResponse(ErrorCode.InvalidReturnPath);

    expectPrivateMetric(MetricName.InvalidReturnPath, {
      value: 'null',
    });

    expectPublicMetric(MetricName.InvalidReturnPath, {
      type: 'object',
    });
  });
});
