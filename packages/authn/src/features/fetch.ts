/// <reference types="@cloudflare/workers-types" />
import type JsonApiDataStore from 'jsonapi-datastore';
import assert from '../utils/assert.js';
import createApiClient from '../utils/create-api-client.js';
import isCause from '../utils/is-cause.js';
import mapRequestUrlToCode from '../utils/map-request-url-to-code.js';

const HTTP_INTERNAL_SERVER_ERROR = 500;
const HEADERS: Headers = new Headers({
  'Content-Type': 'application/json; charset=utf-8',
});

export default async function fetch(
  request: Readonly<Request>,
  {
    PATREON_CLIENT_ID,
    PATREON_CLIENT_SECRET,
    PATREON_OAUTH_HOST,
    PATREON_REDIRECT_URL,
  }: Readonly<Record<string, unknown>>,
): Promise<Response> {
  console.log(request.url);

  try {
    assert(
      typeof PATREON_CLIENT_ID === 'string',
      'Expected a Patreon client ID.',
    );
    assert(
      typeof PATREON_CLIENT_SECRET === 'string',
      'Expected a Patreon client secret.',
    );
    assert(
      typeof PATREON_OAUTH_HOST === 'string',
      'Expected a Patreon OAuth host.',
    );
    assert(
      typeof PATREON_REDIRECT_URL === 'string',
      'Expected a Patreon redirect URL.',
    );

    const code: string = mapRequestUrlToCode(request.url);
    const makeRequest = await createApiClient(
      PATREON_OAUTH_HOST,
      PATREON_CLIENT_ID,
      PATREON_CLIENT_SECRET,
      PATREON_REDIRECT_URL,
      code,
    );

    const store: JsonApiDataStore = await makeRequest('/current_user');
    return new Response(
      store.serialize() +
        '\n\n' +
        store
          .findAll('user')
          .map((user: JsonApiDataStore): string => user.serialize())
          .join('\n'),
    );
  } catch (err: unknown) {
    // Unknown error
    if (!(err instanceof Error)) {
      console.error(err);
      return new Response(
        JSON.stringify({
          message: JSON.stringify(err),
        }),
        {
          headers: HEADERS,
          status: HTTP_INTERNAL_SERVER_ERROR,
        },
      );
    }

    // Unknown cause
    const { cause } = err;
    if (!isCause(cause)) {
      console.error(err, cause);
      return new Response(
        JSON.stringify({
          message: err.message,
        }),
        {
          headers: HEADERS,
          status: HTTP_INTERNAL_SERVER_ERROR,
        },
      );
    }

    // Known cause
    console.error(err, cause.data);
    return new Response(
      JSON.stringify({
        message: err.message,
      }),
      {
        headers: HEADERS,
        status: cause.status,
      },
    );
  }
}
