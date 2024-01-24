import formUrlEncoded from 'form-urlencoded';
import USER_AGENT from '../constants/user-agent.js';
import assert from './assert.js';
import isObject from './is-object.js';
import mapReadableStreamToString from './map-readable-stream-to-string.js';
import StatusCode from '../constants/status-code.js';
import createPatreonError from './create-patreon-error.js';
import parseJson from './parse-json.js';

const HTTP_REDIRECTION = 300;
const HTTP_SUCCESSFUL = 200;
const HEADERS: Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': USER_AGENT,
});

export default async function createApiAccessToken(
  host: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  code: string,
): Promise<string> {
  const response: Response = await fetch(`${host}/api/oauth2/token`, {
    // compress: false,
    // credentials: 'include',
    headers: HEADERS,
    method: 'POST',
    body: formUrlEncoded({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (
    response.status < HTTP_SUCCESSFUL ||
    response.status >= HTTP_REDIRECTION
  ) {
    assert(
      response.body !== null,
      'Expected Patreon OAuth token error to have a body.',
      StatusCode.BadGateway,
    );

    const body: string = await mapReadableStreamToString(response.body);
    const json: unknown = parseJson(body);

    assert(
      isObject(json),
      'Expected Patreon OAuth token error to be an object.',
      StatusCode.BadGateway,
      json,
    );

    assert(
      'error' in json,
      'Expected Patreon OAuth token error to have a code.',
      StatusCode.BadGateway,
      json,
    );

    throw createPatreonError({
      clientId,
      code,
      json,
      status: response.status,
    });
  }

  const json: unknown = await response.json();
  assert(
    isObject(json),
    `Expected \`${host}/api/oauth2/token\` to be an object, but received ${typeof json}.`,
    StatusCode.BadGateway,
    json,
  );

  assert(
    'access_token' in json,
    "Expected Patreon's OAuth response to have an access token.",
    response.status,
    json,
  );

  assert(
    typeof json.access_token === 'string',
    "Expected Patreon's OAuth access token to be a string.",
    response.status,
    json,
  );

  return json.access_token;
}
