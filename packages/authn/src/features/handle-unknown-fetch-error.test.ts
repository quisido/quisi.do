import { ErrorCode } from '@quisido/authn-shared';
import { describe, expect, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import expectResponseToRedirectTo from '../test/expect-response-to-redirect-to.js';
import withTestState from '../test/with-test-state.js';
import handleFetchError from './handle-fetch-error.js';

const DEFAULT_TRACE_FLAGS = 0;
const DEFAULT_TRACE_VERSION = 0;

describe('handleUnknownFetchError', (): void => {
  it('should emit telemetry', (): void => {
    const { expectPrivateError, expectPublicDataPoint } = withTestState(
      (): Response => handleFetchError('test'),
    );

    expectPrivateError(new Error('test'));
    expectPublicDataPoint({
      blobs: [expect.any(String) as string, '0000000000000000'],
      indexes: [MetricName.ErrorCode],

      doubles: [
        ErrorCode.Unknown,
        expect.any(Number) as number,
        DEFAULT_TRACE_FLAGS,
        DEFAULT_TRACE_VERSION,
      ],
    });
  });

  it('should return the correct error code', (): void => {
    const { result } = withTestState((): Response => handleFetchError('test'));

    const codeStr: string = ErrorCode.Unknown.toString();
    expectResponseToRedirectTo(
      result,
      `https://localhost/#authn:error=${codeStr}`,
    );
  });
});
