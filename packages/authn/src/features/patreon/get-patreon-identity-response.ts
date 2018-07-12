import getFetch from '../../utils/get-fetch.js';
import createPatreonIdentityRequestInit from './create-patreon-identity-request-init.js';
import getPatreonOAuthHost from './get-patreon-oauth-host.js';

const CAMPAIGN_FIELDS: readonly string[] = ['summary', 'is_monthly'];

const USER_FIELDS: readonly string[] = [
  'about',
  'can_see_nsfw',
  // 'comment_count',
  'created',
  'email',
  // 'facebook',
  // 'facebook_id',
  'first_name',
  'full_name',
  // 'gender',
  'hide_pledges',
  'image_url',
  'is_email_verified',
  'last_name',
  'like_count',
  'social_connections',
  'thumb_url',
  // 'twitter',
  'url',
  'vanity',
  // 'youtube',
];

const SEARCH: string = [
  `fields%5Bcampaign%5D=${CAMPAIGN_FIELDS.join(',')}`,
  `fields%5Buser%5D=${USER_FIELDS.join(',')}`,
].join('&');

export default async function getPatreonIdentityResponse(): Promise<Response> {
  const fetch: Fetcher['fetch'] = getFetch();
  const oAuthHost: string = getPatreonOAuthHost();

  return fetch(
    `${oAuthHost}/api/oauth2/v2/identity?${SEARCH}`,
    await createPatreonIdentityRequestInit(),
  );
}
