import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingInvalidPatreonAccessTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  this.emitPrivateMetric(
    MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    {
      value: JSON.stringify({
        ...json,
        error: undefined,
      }),
    },
  );

  this.emitPublicMetric(
    MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
  );

  throw new FatalError(
    ErrorCode.MissingInvalidPatreonAccessTokenRequestDescription,
  );
}
