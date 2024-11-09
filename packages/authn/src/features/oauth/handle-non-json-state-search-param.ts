import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

export default function handleNonJsonStateSearchParam(
  this: AuthnFetchHandler,
  value: string,
): Response {
  this.emitPublicMetric(MetricName.NonJsonStateSearchParam);
  this.emitPrivateMetric(MetricName.NonJsonStateSearchParam, {
    value,
  });

  return new ErrorResponse(this, ErrorCode.NonJsonState);
}
