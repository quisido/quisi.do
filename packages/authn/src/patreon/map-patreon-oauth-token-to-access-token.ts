import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function mapPatreonOAuthTokenToAccessToken(
  this: AuthnFetchHandler,
  token: unknown,
): string {
  const { emitPrivateMetric, emitPublicMetric } = this;

  if (!isRecord(token)) {
    emitPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
      value: JSON.stringify(token),
    });

    emitPublicMetric(MetricName.InvalidPatreonOAuthToken, {
      type: typeof token,
    });

    throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
  }

  const { access_token: accessToken } = token;
  if (typeof accessToken === 'string') {
    return accessToken;
  }

  if (typeof accessToken === 'undefined') {
    emitPublicMetric(MetricName.MissingPatreonAccessToken);
    emitPrivateMetric(MetricName.MissingPatreonAccessToken, {
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
