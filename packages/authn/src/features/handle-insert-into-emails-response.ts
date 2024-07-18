import { MetricName } from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';

export default function handleInsertIntoEmailsResponse(
  userId: number,
): (response: D1Response) => void {
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();
  const startTime: number = Date.now();

  return function handleThen({
    meta: { changes, duration, last_row_id: lastRowId, size_after: sizeAfter },
  }: D1Response): void {
    emitPrivateMetric({
      changes,
      duration,
      endTime: Date.now(),
      lastRowId,
      name: MetricName.EmailInserted,
      sizeAfter,
      startTime,
      userId,
    });

    emitPublicMetric({
      changes,
      duration,
      endTime: Date.now(),
      name: MetricName.EmailInserted,
      sizeAfter,
      startTime,
    });
  };
}
