import type { JsonApiDataStore } from 'jsonapi-datastore';
import assert from '../utils/assert.js';
import createApiClient from '../utils/create-api-client.js';
import serialize from '../utils/serialize.js';
import StatusCode from '../constants/status-code.js';

export default async function createPatreonResponse(
  oAuthHost: unknown,
  clientId: unknown,
  clientSecret: unknown,
  redirectUri: unknown,
  code: string,
): Promise<Response> {
  assert(
    typeof oAuthHost === 'string',
    'Expected a Patreon OAuth host.',
    StatusCode.InternalServerError,
  );

  assert(
    typeof clientId === 'string',
    'Expected a Patreon client ID.',
    StatusCode.InternalServerError,
  );

  assert(
    typeof clientSecret === 'string',
    'Expected a Patreon client secret.',
    StatusCode.InternalServerError,
  );

  assert(
    typeof redirectUri === 'string',
    'Expected a Patreon redirect URI.',
    StatusCode.InternalServerError,
  );

  const makeRequest = await createApiClient(
    oAuthHost,
    clientId,
    clientSecret,
    redirectUri,
    code,
  );

  const store: JsonApiDataStore = await makeRequest('/current_user');
  const [firstUser] = store.findAll('user').map(serialize);

  assert(
    typeof firstUser !== 'undefined',
    'Expected to find a Patreon current user.',
    StatusCode.BadGateway,
    store,
  );

  assert(
    'data' in firstUser,
    'Expected Patreon current user to contain data.',
    StatusCode.BadGateway,
    firstUser,
  );

  const { data } = firstUser;

  /**
   * TODO:
   * - Write `data` to permanent storage for monitoring. (R2!!!!!!)
   * - Check if source (Patreon) + ID (`data.id`) exists in the Database.
   *   - If it does not exist, write it to the database.
   *   - Generate an "authn-id" (\w{18}\-\w{18}\-\w{18}\).
   *     - Set-Cookie with `__Secure-AuthN-ID: ...`.
   *     - Write it + user ID to a table.
   *   - Decode STATE to determine redirect URI.
   * - ENABLE WAF
   * - SET COOKIE + REDIRECT RESPONSE
   */
  return new Response(JSON.stringify(data));
}
