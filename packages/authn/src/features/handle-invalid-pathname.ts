import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric } from '../constants/worker.js';
import ErrorResponse from './error-response.js';

export default function handleInvalidPathname(pathname: string): Response {
  emitPublicMetric({
    name: MetricName.NotFound,
    pathname,
  });

  return new ErrorResponse(ErrorCode.NotFound);
}
