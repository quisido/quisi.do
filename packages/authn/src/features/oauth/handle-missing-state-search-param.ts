import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

export default function handleMissingStateSearchParam(
  this: AuthnFetchHandler,
): Response {
  this.emitPublicMetric(MetricName.MissingStateSearchParam);
  return new ErrorResponse(this, ErrorCode.MissingState);
}
