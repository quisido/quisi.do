/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="@cloudflare/workers-types" />
import assert from 'node:assert';
import { parse } from 'node:url';
import { oauth, patreon } from 'patreon';

const REDIRECT_URL = 'https://a.quisi.do/patreon/';
const PATREON_CLIENT_ID =
  'J_6jrNJZNibHylSF83UVl9I4OHZYf67RAsU0s7_LnH1N5BKF-vgOyweF3KQLOKm1';

const { PATREON_CLIENT_SECRET } = process.env;
assert(typeof PATREON_CLIENT_SECRET === 'string');

const oAuthClient = oauth(PATREON_CLIENT_ID, PATREON_CLIENT_SECRET);

export async function handleOAuthRedirectRequest(
  request: Request,
): Promise<readonly string[]> {
  const { query } = parse(request.url, true);
  const { code } = query;
  const { access_token: accessToken } = await oAuthClient.getTokens(
    code,
    REDIRECT_URL,
  );
  const apiClient = patreon(accessToken);
  const { store } = await apiClient('/current_user');
  return store.findAll('user').map(user => user.serialize());
}

export default async function fetch(
  request: Readonly<Request>,
  // { ERRORS, FETCH, RESULTS }: Readonly<Env>,
  // cxt: Readonly<ExecutionContext>,
): Promise<Response> {
  // ...
}
