import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleMissingPatreonTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  this.emitPublicMetric(
    MetricName.MissingInvalidPatreonTokenRequestDescription,
  );

  this.emitPrivateMetric(
    MetricName.MissingInvalidPatreonTokenRequestDescription,
    {
      value: JSON.stringify({
        ...json,
        error: undefined,
      }),
    },
  );

  throw new FatalError(
    ErrorCode.MissingInvalidPatreonTokenRequestDescription,
  );
}
