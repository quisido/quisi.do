import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly ip: string;
  readonly returnPath: string;
}

export default function handleThrottledOAuthRequest(
  this: Worker,
  { ip, returnPath }: Options,
): Response {
  this.emitPublicMetric({ name: MetricName.OAuthThrottled });
  this.emitPrivateMetric({
    ip,
    name: MetricName.OAuthThrottled,
  });

  return new ErrorResponse(this, ErrorCode.TooManyRequests, returnPath);
}
