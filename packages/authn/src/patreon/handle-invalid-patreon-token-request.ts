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
    this.emitPublicMetric(MetricName.InvalidPatreonTokenRequest);
    this.emitPrivateMetric(MetricName.InvalidPatreonTokenRequest, {
      description,
      value: JSON.stringify({
        ...json,
        error: undefined,
        error_description: undefined,
      }),
    });

    throw new FatalError(ErrorCode.InvalidPatreonTokenRequest);
  }

  if (typeof description === 'undefined') {
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
