import { snapshot } from '../../constants/worker.js';
import getPatreonAccessToken from './get-patreon-access-token.js';
import handlePatreonAccessToken from './handle-patreon-access-token.js';

export default async function createPatreonIdentityRequestInit(): Promise<RequestInit> {
  return await snapshot(
    getPatreonAccessToken(),
    handlePatreonAccessToken,
  );
}
