import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';

export default function handleInvalidPatreonClientId(this: Worker): never {
  this.emitPublicMetric({
    clientId: getPatreonOAuthClientId.call(this),
    name: MetricName.InvalidPatreonClientId,
  });

  throw new FatalError(ErrorCode.InvalidPatreonClientId);
}
