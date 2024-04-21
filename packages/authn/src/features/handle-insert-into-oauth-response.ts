import MetricName from "../constants/metric-name.js";
import getTelemetry from "../utils/get-telemetry.js";

export default function handleInsertIntoOAuthResponse(
  userId: number,
): (response: D1Response) => void {
  const { emitPublicMetric } = getTelemetry();
  const startTime: number = Date.now();

  return function handleThen({
    meta: {
      changes,
      duration,
      last_row_id: lastRowId,
      size_after: sizeAfter,
    },
  }: D1Response): void {
    emitPublicMetric({
      changes,
      duration,
      endTime: Date.now(),
      lastRowId,
      name: MetricName.OAuthInserted,
      sizeAfter,
      startTime,
      userId,
    });
  };
}
