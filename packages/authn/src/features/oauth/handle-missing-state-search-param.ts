import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

export default function handleMissingStateSearchParam(): Response {
  emitPublicMetric({ name: MetricName.MissingStateSearchParam });
  return new ErrorResponse(ErrorCode.MissingState);
}
