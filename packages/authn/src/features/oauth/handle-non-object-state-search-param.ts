import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly type: string;
  readonly value: string;
}

export default function handleNonObjectStateSearchParam(
  this: AuthnFetchHandler,
  { type, value }: Options,
): Response {
  this.emitPrivateMetric(MetricName.NonObjectState, {
    value,
  });

  this.emitPublicMetric(MetricName.NonObjectState, {
    type,
  });

  return new ErrorResponse(this, ErrorCode.NonObjectState);
}
