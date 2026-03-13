import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import parseJson from '../utils/parse-json.js';
import mapPatreonOAuthTokenToAccessToken from './map-patreon-oauth-token-to-access-token.js';

export default function parsePatreonTokenResponse(
  this: AuthnFetchHandler,
  text: string,
): string {
  const json: unknown = parseJson(text);
  if (typeof json === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPatreonTokenResponse);
    this.emitPrivateMetric(MetricName.InvalidPatreonTokenResponse, {
      text,
    });

    throw new FatalError(ErrorCode.InvalidPatreonTokenResponse);
  }

  return mapPatreonOAuthTokenToAccessToken.call(this, json);
}
