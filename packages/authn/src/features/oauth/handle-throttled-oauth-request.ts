import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly ip: string;
  readonly returnPath: string;
}

export default function handleThrottledOAuthRequest({
  ip,
  returnPath,
}: Options): Response {
  emitPublicMetric({ name: MetricName.OAuthThrottled });
  emitPrivateMetric({
    ip,
    name: MetricName.OAuthThrottled,
  });

  return new ErrorResponse(ErrorCode.TooManyRequests, returnPath);
}
