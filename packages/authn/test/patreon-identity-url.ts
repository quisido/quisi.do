import { expectStringMatching } from 'cloudflare-test-utils';

export const PATREON_IDENTITY_URL: string = expectStringMatching(
  /^https:\/\/host\.test\.patreon\.com\/api\/oauth2\/v2\/identity\?/u,
);
