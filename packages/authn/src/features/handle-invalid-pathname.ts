import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import ErrorResponse from './error-response.js';

export default function handleInvalidPathname(this: Worker, pathname: string): Response {
  this.emitPublicMetric({
    name: MetricName.NotFound,
    pathname,
  });

  return new ErrorResponse(this, ErrorCode.NotFound);
}
