import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonIdentityError(
  this: AuthnFetchHandler,
  status: number,
  identity: unknown,
): never {
  this.emitPrivateMetric(MetricName.UnknownPatreonIdentityError, {
    identity: JSON.stringify(identity),
    status,
  });

  this.emitPublicMetric(MetricName.UnknownPatreonIdentityError, {
    status,
  });

  throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
}
