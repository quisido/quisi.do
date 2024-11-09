import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthHost(
  this: AuthnFetchHandler,
  host: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthHost, {
    value: JSON.stringify(host),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthHost, {
    type: typeof host,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthHost);
}
