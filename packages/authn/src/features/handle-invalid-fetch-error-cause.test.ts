import { ErrorCode } from '@quisido/authn-shared';
import { describe, expect, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import expectResponseToRedirectTo from '../test/expect-response-to-redirect-to.js';
import withTestState from '../test/with-test-state.js';
import handleFetchError from './handle-fetch-error.js';

const DEFAULT_TRACE_FLAGS = 0;
const DEFAULT_TRACE_VERSION = 0;
const TEST_ERROR: Error = new Error('test message', { cause: 'test cause' });

describe('handleInvalidFetchErrorCause', (): void => {
  it('should emit telemetry', (): void => {
    const { expectPrivateError, expectPublicDataPoint } = withTestState(
      (): Response => handleFetchError(TEST_ERROR),
    );

    expectPrivateError(TEST_ERROR);
    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      indexes: [MetricName.ErrorCode],

      doubles: [
        ErrorCode.InvalidCause,
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
    });
  });

  it('should return the correct error code', (): void => {
    const { result } = withTestState(
      (): Response => handleFetchError(TEST_ERROR),
    );

    const codeStr: string = ErrorCode.InvalidCause.toString();
    expectResponseToRedirectTo(
      result,
      `https://localhost/#authn:error=${codeStr}`,
    );
  });
});
