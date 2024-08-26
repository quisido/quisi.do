import { Snapshot } from '@quisido/proposal-async-context';
import { MetricName } from '../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric, getNow } from '../constants/worker.js';

export default function handleInsertIntoEmailsResponse(
  userId: number,
): (response: D1Response) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = getNow();

  return function handleThen({
    meta: { changes, duration, last_row_id: lastRowId, size_after: sizeAfter },
  }: D1Response): void {
    const endTime: number = getNow();
    return snapshot.run((): void => {
      emitPrivateMetric({
        changes,
        duration,
        endTime,
        lastRowId,
        name: MetricName.EmailInserted,
        sizeAfter,
        startTime,
        userId,
      });

      emitPublicMetric({
        changes,
        duration,
        endTime,
        name: MetricName.EmailInserted,
        sizeAfter,
        startTime,
      });
    });
  };
}
