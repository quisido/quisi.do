import { isRecord } from 'fmrs';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleInvalidOAuthUserId from './handle-invalid-oauth-user-id.js';

interface Result {
  readonly duration: number;
  readonly results: readonly Record<string, unknown>[];
  readonly rowsRead: number;
  readonly sizeAfter: number;
}

export default function handleOAuthUserIdResult(
  this: AuthnFetchHandler,
  { duration, results, rowsRead, sizeAfter }: Result,
): number | null {
  this.emitPublicMetric(MetricName.OAuthUserIdSelected, {
    duration,
    rowsRead,
    sizeAfter,
  });

  // Non-existent user
  const [firstResult] = results;
  if (!isRecord(firstResult)) {
    return null;
  }

  // Existent user
  const { userId } = firstResult;
  if (typeof userId !== 'number') {
    return handleInvalidOAuthUserId.call(this, firstResult);
  }

  this.emitPrivateMetric(MetricName.AuthenticationRead, { userId });
  this.emitPublicMetric(MetricName.AuthenticationRead);
  return userId;
}
