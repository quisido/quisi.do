import { ErrorCode } from '@quisido/authn-shared';
import { mapUnknownToError } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';
import ErrorResponseInit from './error-response-init.js';

export default function handleUnknownFetchError(err: unknown): Response {
  const { emitPublicMetric, logPrivateError } = getTelemetry();

  logPrivateError(mapUnknownToError(err));
  emitPublicMetric({
    code: ErrorCode.Unknown,
    name: MetricName.ErrorCode,
  });

  return new Response(null, new ErrorResponseInit(ErrorCode.Unknown));
}
