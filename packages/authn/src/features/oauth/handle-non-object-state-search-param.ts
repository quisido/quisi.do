import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly type: string;
  readonly value: string;
}

export default function handleNonObjectStateSearchParam(
  this: Worker,
  { type, value }: Options,
): Response {
  this.emitPrivateMetric({
    name: MetricName.NonObjectState,
    value,
  });

  this.emitPublicMetric({
    name: MetricName.NonObjectState,
    type,
  });

  return new ErrorResponse(this, ErrorCode.NonObjectState);
}
