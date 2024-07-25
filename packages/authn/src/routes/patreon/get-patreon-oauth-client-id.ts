import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientId(): string {
  const clientId: unknown = getEnv('PATREON_OAUTH_CLIENT_ID');

  if (typeof clientId === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonOAuthClientId });
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientId);
  }

  if (typeof clientId !== 'string') {
    emitPrivateMetric({
      name: MetricName.InvalidPatreonOAuthClientId,
      value: JSON.stringify(clientId),
    });

    emitPublicMetric({
      name: MetricName.InvalidPatreonOAuthClientId,
      type: typeof clientId,
    });

    throw new FatalError(ErrorCode.InvalidPatreonOAuthClientId);
  }

  return clientId;
}
