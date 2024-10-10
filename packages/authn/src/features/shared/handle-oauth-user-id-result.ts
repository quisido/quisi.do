import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import isObject from '../../utils/is-object.js';
import handleInvalidOAuthUserId from './handle-invalid-oauth-user-id.js';

interface Result {
  readonly duration: number;
  readonly results: readonly Record<string, unknown>[];
  readonly rowsRead: number;
  readonly sizeAfter: number;
}

export default function handleOAuthUserIdResult(
  this: Worker,
  { duration, results, rowsRead, sizeAfter }: Result,
): number | null {
  this.emitPublicMetric({
    duration,
    name: MetricName.OAuthUserIdSelected,
    rowsRead,
    sizeAfter,
  });

  // Non-existent user
  const [firstResult] = results;
  if (!isObject(firstResult)) {
    return null;
  }

  // Existent user
  const { userId } = firstResult;
  if (typeof userId !== 'number') {
    return handleInvalidOAuthUserId.call(this, firstResult);
  }

  this.emitPrivateMetric({ name: MetricName.AuthenticationRead, userId });
  this.emitPublicMetric({ name: MetricName.AuthenticationRead });
  return userId;
}
