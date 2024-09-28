import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

export default function handleMissingStateSearchParam(this: Worker): Response {
  this.emitPublicMetric({ name: MetricName.MissingStateSearchParam });
  return new ErrorResponse(this, ErrorCode.MissingState);
}
