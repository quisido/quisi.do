import { mapUnknownToError } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';

export default function handleInsertIntoOAuthError(
  userId: number,
): (err: unknown) => void {
  const { emitPublicMetric, logPrivateError } = getTelemetry();
  const startTime: number = Date.now();

  return function handleCatch(err: unknown): void {
    const endTime: number = Date.now();
    logPrivateError(mapUnknownToError(err));
    emitPublicMetric({
      duration: endTime - startTime,
      endTime,
      name: MetricName.OAuthInsertError,
      startTime,
      userId,
    });
  };
}
