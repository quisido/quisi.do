import type AuthnFetchHandler from '../authn-fetch-handler.js';
import parseJson from '../utils/parse-json.js';
import mapAccessTokenToIdentityRequestHeaders from './map-access-token-to-identity-request-headers.js';
import parsePatreonIdentity from './parse-patreon-identity.js';
import type PatreonIdentity from './patreon-identity.js';
import validatePatreonIdentityResponse from './validate-patreon-identity-response.js';

const CAMPAIGN_FIELDS: readonly string[] = ['summary', 'is_monthly'];

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

  const identityStr: string = await response.text();
  const identity: unknown = parseJson(identityStr);

  const validIdentity: Record<string, unknown> =
    validatePatreonIdentityResponse.call(this, response, identity);

  return parsePatreonIdentity.call(this, validIdentity);
}
