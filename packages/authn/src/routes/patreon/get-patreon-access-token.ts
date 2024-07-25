import { snapshot } from '../../constants/worker.js';
import getPatreonTokenResponse from './get-patreon-token-response.js';
import handlePatreonOAuthTokenResponse from './handle-patreon-oauth-token-response.js';

export default async function getPatreonAccessToken(): Promise<string> {
  return await snapshot(
    getPatreonTokenResponse(),
    handlePatreonOAuthTokenResponse,
  );
}
