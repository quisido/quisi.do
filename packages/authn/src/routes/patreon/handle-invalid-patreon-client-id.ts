import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';

export default function handleInvalidPatreonClientId(): never {
  emitPublicMetric({
    clientId: getPatreonOAuthClientId(),
    name: MetricName.InvalidPatreonClientId,
  });

  throw new FatalError(ErrorCode.InvalidPatreonClientId);
}
