import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import isObject from '../../utils/is-object.js';
import handleInvalidOAuthUserId from './handle-invalid-oauth-user-id.js';

interface Result {
  readonly duration: number;
  readonly results: readonly Record<string, unknown>[];
  readonly rowsRead: number;
  readonly sizeAfter: number;
}

export default function handleOAuthUserIdResult({
  duration,
  results,
  rowsRead,
  sizeAfter,
}: Result): number | null {
  emitPublicMetric({
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
    return handleInvalidOAuthUserId(firstResult);
  }

  emitPrivateMetric({ name: MetricName.AuthenticationRead, userId });
  emitPublicMetric({ name: MetricName.AuthenticationRead });
  return userId;
}
