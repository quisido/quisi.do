import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function mapPatreonOAuthTokenToAccessToken(
  this: AuthnFetchHandler,
  token: unknown,
): string {
  if (!isRecord(token)) {
    this.emitPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
      value: JSON.stringify(token),
    });

    this.emitPublicMetric(MetricName.InvalidPatreonOAuthToken, {
      type: typeof token,
    });

    throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
  }

  const { access_token: accessToken } = token;
  if (typeof accessToken === 'string') {
    return accessToken;
  }

  if (typeof accessToken === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonAccessToken);
    this.emitPrivateMetric(MetricName.MissingPatreonAccessToken, {
      value: JSON.stringify(token),
    });

    throw new FatalError(ErrorCode.MissingPatreonAccessToken);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonAccessToken, {
    value: JSON.stringify(accessToken),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonAccessToken, {
    type: typeof accessToken,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessToken);
}
