import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';

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

export default async function handlePatreonIdentityRequestInit(
  this: AuthnFetchHandler,
  requestInit: RequestInit,
): Promise<Response> {
  const { patreonOAuthHost } = this;
  return await this.fetch(
    `${patreonOAuthHost}/api/oauth2/v2/identity?${SEARCH}`,
    requestInit,
  );
}
