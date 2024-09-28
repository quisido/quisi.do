import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

export default function handleNonJsonStateSearchParam(this: Worker,value: string): Response {
  this.emitPublicMetric({ name: MetricName.NonJsonStateSearchParam });
  this.emitPrivateMetric({
    name: MetricName.NonJsonStateSearchParam,
    value,
  });

  return new ErrorResponse(this, ErrorCode.NonJsonState);
}
