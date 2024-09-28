import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly cookie: string;
  readonly state: string;
}

export default function handleCrossSiteRequestForgery(this: Worker, {
  cookie,
  state,
}: Options): Response {
  this.emitPublicMetric({ name: MetricName.CSRF });

  this.emitPrivateMetric({
    cookie,
    name: MetricName.CSRF,
    state,
  });

  return new ErrorResponse(this, ErrorCode.CSRF);
}
