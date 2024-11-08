import { Snapshot } from '@quisido/proposal-async-context';
import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';

export default function handleInsertIntoOAuthResponse(
  this: Worker,
  userId: number,
): (response: D1Response) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = this.now();

  const handleThen = ({
    meta: { changes, duration, last_row_id: lastRowId, size_after: sizeAfter },
  }: D1Response): void => {
    snapshot.run((): void => {
      const endTime: number = this.now();

      this.emitPrivateMetric({
        changes,
        duration,
        endTime,
        lastRowId,
        name: MetricName.OAuthInserted,
        sizeAfter,
        startTime,
        userId,
      });

      this.emitPublicMetric({
        changes,
        duration,
        endTime,
        name: MetricName.OAuthInserted,
        sizeAfter,
        startTime,
      });
    });
  };

  return handleThen;
}
