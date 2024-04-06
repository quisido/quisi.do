import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import expectResponseToRedirectTo from '../test/expect-response-to-redirect-to.js';
import withTestState from '../test/with-test-state.js';
import handleUnknownFetchError from './handle-unknown-fetch-error.js';

describe('handleUnknownFetchError', (): void => {
  it('should emit telemetry', (): void => {
    const { expectPrivateError, expectPublicDataPoint } = withTestState(
      (): Response => handleUnknownFetchError('test'),
    );

    expectPrivateError(new Error('test'));
    expectPublicDataPoint({
      blobs: ['', '0000000000000000'],
      doubles: [ErrorCode.Unknown, expect.any(Number) as number, 0, 0],
      indexes: [MetricName.ErrorCode],
    });
  });

  it('should return the correct error code', (): void => {
    const { result } = withTestState(
      (): Response => handleUnknownFetchError('test'),
    );

    expectResponseToRedirectTo(
      result,
      `https://localhost/#authn:error=${ErrorCode.Unknown}`,
    );
  });
});
