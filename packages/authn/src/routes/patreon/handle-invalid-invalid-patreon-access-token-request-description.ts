import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidInvalidPatreonAccessTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
  description: unknown,
): never {
  this.emitPrivateMetric(
    MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    {
      value: JSON.stringify({
        ...json,
        error: undefined,
      }),
    },
  );

  this.emitPublicMetric(
    MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    {
      type: typeof description,
    },
  );

  throw new FatalError(
    ErrorCode.InvalidInvalidPatreonAccessTokenRequestDescription,
  );
}
