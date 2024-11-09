import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentity(
  this: AuthnFetchHandler,
  identity: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidPatreonIdentity, {
    value: JSON.stringify(identity),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentity, {
    type: typeof identity,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentity);
}
