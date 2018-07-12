import { ErrorCode } from '@quisido/authn-shared';
import MetricName from '../constants/metric-name.js';
import expectResponseToRedirectTo from '../test/expect-response-to-redirect-to.js';
import withTestState from '../test/with-test-state.js';
import handleFetchError from './handle-fetch-error.js';

describe('handleUnknownFetchError', (): void => {
  it('should emit telemetry', (): void => {
    const { expectPrivateError, expectPublicDataPoint } = withTestState(
      (): Response => handleFetchError('test'),
    );

    expectPrivateError(new Error('test'));
    expectPublicDataPoint({
      blobs: ['0123456789abcdef0123456789abcdef', '0000000000000000'],
      doubles: [ErrorCode.Unknown, expect.any(Number) as number, 0, 0],
      indexes: [MetricName.ErrorCode],
    });
  });

  it('should return the correct error code', (): void => {
    const { result } = withTestState((): Response => handleFetchError('test'));

    expectResponseToRedirectTo(
      result,
      `https://localhost/#authn:error=${ErrorCode.Unknown}`,
    );
  });
});
