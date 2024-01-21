import formUrlEncoded from 'form-urlencoded';
import USER_AGENT from '../constants/user-agent.js';
import assert from './assert.js';
import isObject from './is-object.js';
import mapReadableStreamToString from './map-readable-stream-to-string.js';
import createError from './create-error.js';
import StatusCode from '../constants/status-code.js';
import parseJson from './parse-json.js';

const HTTP_REDIRECTION = 300;
const HTTP_SUCCESSFUL = 200;
const HEADERS: Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': USER_AGENT,
});

const mapErrorJsonToMessage = (json: Record<'error', unknown>): string => {
  switch (json.error) {
    case 'invalid_request': {
      assert(
        'error_description' in json,
        'Expected Patreon OAuth invalid token request to have a description.',
        StatusCode.BadGateway,
        json,
      );
      assert(
        typeof json.error_description === 'string',
        'Expected Patreon OAuth invalid token request description to be a string.',
        StatusCode.BadGateway,
        json,
      );
      return json.error_description;
    }

    default:
      return `Unknown Patreon OAuth token error: ${JSON.stringify(json.error)}`;
  }
};

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

    const message: string = mapErrorJsonToMessage(json);
    throw createError(message, response.status, json);
  }

  const json: unknown = await response.json();
  assert(
    isObject(json),
    `Expected \`${host}/api/oauth2/token\` to be an object, but received ${typeof json}.`,
    StatusCode.BadGateway,
    json,
  );

  // Why isn't this non-2xx? 🤔
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

    // Technical debt: Should we change this status code?
    throw createError(message, response.status, json);
  }

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
