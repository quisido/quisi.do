import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly cookie: string;
  readonly state: string;
}

export default function handleCrossSiteRequestForgery({
  cookie,
  state,
}: Options): Response {
  emitPublicMetric({ name: MetricName.CSRF });

  emitPrivateMetric({
    cookie,
    name: MetricName.CSRF,
    state,
  });

  return new ErrorResponse(ErrorCode.CSRF);
}
