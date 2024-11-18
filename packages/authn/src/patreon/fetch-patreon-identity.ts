import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import mapAccessTokenToIdentityRequestHeaders from './map-access-token-to-identity-request-headers.js';
import parsePatreonIdentity from './parse-patreon-identity.js';
import type PatreonIdentity from './patreon-identity.js';

const CAMPAIGN_FIELDS: readonly string[] = ['summary', 'is_monthly'];
const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;

const USER_FIELDS: readonly string[] = [
  'about',
  'can_see_nsfw',
  /**
   * 'comment_count',
   * 'facebook',
   * 'facebook_id',
   * 'gender',
   * 'twitter',
   * 'youtube',
   */
  'created',
  'email',
  'first_name',
  'full_name',
  'hide_pledges',
  'image_url',
  'is_email_verified',
  'last_name',
  'like_count',
  'social_connections',
  'thumb_url',
  'url',
  'vanity',
];

const SEARCH: string = [
  `fields%5Bcampaign%5D=${CAMPAIGN_FIELDS.join(',')}`,
  `fields%5Buser%5D=${USER_FIELDS.join(',')}`,
].join('&');

export default async function fetchPatreonIdentity(
  this: AuthnFetchHandler,
  accessToken: string,
): Promise<PatreonIdentity> {
  const response: Response = await this.fetch(
    `${this.patreonOAuthHost}/api/oauth2/v2/identity?${SEARCH}`,
    {
      headers: mapAccessTokenToIdentityRequestHeaders(accessToken),
      method: 'GET',
    },
  );

  try {
    const identity: unknown = await response.json();

    /**
     * {
     *   "errors": [
     *     {
     *       "code": null,
     *       "code_name": "OAuthClientViewForbidden",
     *       "id": "00000000-0000-0000-0000-000000000000",
     *       "status": "403",
     *       "title": "You do not have permission to view this OAuth Client.",
     *       "detail": "You do not have permission to view OAuth Client with id
     *                  0123456789abcdef0123456789abcdef0123456789abcdef.",
     *     }
     *   ]
     * }
     */
    if (response.status === FORBIDDEN) {
      this.emitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
      this.emitPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
        value: JSON.stringify(identity),
      });

      throw new FatalError(ErrorCode.ForbiddenPatreonIdentityResponse);
    }

    if (response.status >= HTTP_REDIRECTION) {
      this.emitPrivateMetric(MetricName.UnknownPatreonIdentityError, {
        identity: JSON.stringify(identity),
        status: response.status,
      });

      this.emitPublicMetric(MetricName.UnknownPatreonIdentityError, {
        status: response.status,
      });

      throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
    }

    if (!isRecord(identity)) {
      this.emitPrivateMetric(MetricName.InvalidPatreonIdentity, {
        value: JSON.stringify(identity),
      });

      this.emitPublicMetric(MetricName.InvalidPatreonIdentity, {
        type: typeof identity,
      });

      throw new FatalError(ErrorCode.InvalidPatreonIdentity);
    }

    return parsePatreonIdentity.call(this, identity);
  } catch (_err: unknown) {
    this.emitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    throw new FatalError(ErrorCode.InvalidPatreonIdentityResponse);
  }
}
