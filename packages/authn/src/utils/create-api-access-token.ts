import formUrlEncoded from 'form-urlencoded';
import USER_AGENT from '../constants/user-agent.js';
import assert from './assert.js';
import isObject from './is-object.js';
import mapReadableStreamToString from './map-readable-stream-to-string.js';
import createError from './create-error.js';

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
    );

    const body: string | null = await mapReadableStreamToString(response.body);
    const getJson = (): unknown => {
      try {
        return JSON.parse(body);
      } catch (err: unknown) {
        throw createError(
          'Expected Patreon OAuth token error to be JSON.',
          body,
          response.status,
        );
      }
    };

    const json: unknown = getJson();
    assert(
      isObject(json),
      'Expected Patreon OAuth token error to be an object.',
    );
    assert(
      'error' in json,
      'Expected Patreon OAuth token error to have a code.',
    );

    const getMessage = (): string => {
      switch (json.error) {
        case 'invalid_request': {
          assert(
            'error_description' in json,
            'Expected Patreon OAuth invalid token request to have a description.',
          );
          assert(
            typeof json.error_description === 'string',
            'Expected Patreon OAuth invalid token request description to be a string.',
          );
          return json.error_description;
        }
        default:
          return `Unknown Patreon OAuth token error: ${JSON.stringify(
            json.error,
          )}`;
      }
    };

    const message: string = getMessage();
    throw createError(message, json, response.status);
  }

  const json: unknown = await response.json();
  assert(
    isObject(json),
    `Expected \`${host}/api/oauth2/token\` to be an object, but received ${typeof json}.`,
  );

  if ('error' in json) {
    const getMessage = (): string => {
      switch (json.error) {
        case 'invalid_grant':
          return `${host} cannot grant authorization codes.`;
        case 'invalid_client':
          return `Invalid client ID: ${clientId}`;
        default:
          return `Unknown error: ${JSON.stringify(json.error)}`;
      }
    };

    const message: string = getMessage();
    throw createError(message, json, response.status);
  }

  if (!('access_token' in json)) {
    throw createError(
      "Expected Patreon's OAuth response to have an access token.",
      json,
      response.status,
    );
  }

  if (typeof json.access_token !== 'string') {
    throw createError(
      "Expected Patreon's OAuth access token to be a string.",
      json,
      response.status,
    );
  }

  return json.access_token;
}
