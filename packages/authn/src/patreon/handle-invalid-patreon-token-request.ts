import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonTokenRequest(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  const { error_description: description } = json;
  if (typeof description === 'string') {
    this.emitPublicMetric(MetricName.InvalidPatreonAccessTokenRequest);
    this.emitPrivateMetric(MetricName.InvalidPatreonAccessTokenRequest, {
      description,
      value: JSON.stringify({
        ...json,
        error: undefined,
        error_description: undefined,
      }),
    });

    throw new FatalError(ErrorCode.InvalidPatreonAccessTokenRequest);
  }

  if (typeof description === 'undefined') {
    this.emitPublicMetric(
      MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    );

    this.emitPrivateMetric(
      MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
      {
        value: JSON.stringify({
          ...json,
          error: undefined,
        }),
      },
    );

    throw new FatalError(
      ErrorCode.MissingInvalidPatreonAccessTokenRequestDescription,
    );
  }

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
