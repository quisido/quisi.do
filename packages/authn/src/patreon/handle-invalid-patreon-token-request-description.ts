import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
  description: unknown,
): never {
  this.emitPrivateMetric(
    MetricName.InvalidInvalidPatreonTokenRequestDescription,
    {
      value: JSON.stringify({
        ...json,
        error: undefined,
      }),
    },
  );

  this.emitPublicMetric(
    MetricName.InvalidInvalidPatreonTokenRequestDescription,
    {
      type: typeof description,
    },
  );

  throw new FatalError(ErrorCode.InvalidInvalidPatreonTokenRequestDescription);
}
