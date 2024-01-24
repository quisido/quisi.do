import validateString from '../utils/validate-string.js';

export const PATREON_OAUTH_CLIENT_ID: string = validateString(
  process.env['PATREON_OAUTH_CLIENT_ID'],
);

export const PATREON_OAUTH_REDIRECT_URI: string = validateString(
  process.env['PATREON_OAUTH_REDIRECT_URI'],
);
