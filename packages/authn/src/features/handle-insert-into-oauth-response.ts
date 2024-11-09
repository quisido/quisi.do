import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleInsertIntoOAuthResponse(
  this: AuthnFetchHandler,
  userId: number,
): (response: D1Response) => void {
  const startTime: number = this.now();

  const handleThen = ({
    meta: { changes, duration, last_row_id: lastRowId, size_after: sizeAfter },
  }: D1Response): void => {
    const endTime: number = this.now();

    this.emitPrivateMetric(MetricName.OAuthInserted, {
      changes,
      duration,
      endTime,
      lastRowId,
      sizeAfter,
      startTime,
      userId,
    });

    this.emitPublicMetric(MetricName.OAuthInserted, {
      changes,
      duration,
      endTime,
      sizeAfter,
      startTime,
    });
  };

  return handleThen;
}
