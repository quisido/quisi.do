import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';
import ErrorResponseInit from './error-response-init.js';

export default function handleUnknownFetchErrorCause(err: Error): Response {
  const { emitPublicMetric, logPrivateError } = getTelemetry();

  logPrivateError(err);
  emitPublicMetric({
    code: ErrorCode.UnknownCause,
    name: MetricName.ErrorCode,
  });

  return new Response(null, new ErrorResponseInit(ErrorCode.UnknownCause));
}
