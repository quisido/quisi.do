import { JsonApiDataStore } from 'jsonapi-datastore';
import { type ClientPathname } from 'patreon';
import StatusCode from '../constants/status-code.js';
import USER_AGENT from '../constants/user-agent.js';
import assert from './assert.js';
import createApiAccessToken from './create-api-access-token.js';
import isObject from './is-object.js';

const BASE_PATH = '/api/oauth2/v2';
const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;
const HTTP_SUCCESSFUL = 200;

export default async function createApiClient(
  host: string,
  id: string,
  secret: string,
  redirectUrl: string,
  code: string,
): Promise<(pathname: ClientPathname) => Promise<JsonApiDataStore>> {
  const accessToken: string = await createApiAccessToken(
    host,
    id,
    secret,
    redirectUrl,
    code,
  );

  const requestInit: RequestInit = {
    // credentials: 'include',
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': USER_AGENT,
    }),
  };

  return async function makeRequest(
    requestSpec: string,
  ): Promise<JsonApiDataStore> {
    const response: Response = await fetch(
      `${host}${BASE_PATH}${requestSpec}`,
      requestInit,
    );

    const json: unknown = await response.json();

    assert(
      response.status !== FORBIDDEN,
      'Forbidden by Patreon',
      StatusCode.Forbidden,
      json,
    );

    assert(
      response.status >= HTTP_SUCCESSFUL && response.status < HTTP_REDIRECTION,
      `Patreon status ${response.status}`,
      StatusCode.Unauthorized,
      json,
    );

    assert(
      isObject(json),
      `Expected \`${host}${requestSpec}\` to be an object, but received ${typeof json}.`,
      StatusCode.BadGateway,
      json,
    );

    const store: JsonApiDataStore = new JsonApiDataStore();
    store.sync(json);
    return store;
  };
}
