import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonTokenRequest(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  const { error_description: description } = json;
  const { emitPrivateMetric, emitPublicMetric } = this;
  if (typeof description === 'string') {
    emitPublicMetric(MetricName.InvalidPatreonAccessTokenRequest);
    emitPrivateMetric(MetricName.InvalidPatreonAccessTokenRequest, {
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
    emitPublicMetric(
      MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    );

    emitPrivateMetric(
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

  emitPrivateMetric(
    MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    {
      value: JSON.stringify({
        ...json,
        error: undefined,
      }),
    },
  );

  emitPublicMetric(
    MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    {
      type: typeof description,
    },
  );

  throw new FatalError(
    ErrorCode.InvalidInvalidPatreonAccessTokenRequestDescription,
  );
}
