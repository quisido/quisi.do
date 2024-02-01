import type { JsonApiDataStore } from 'jsonapi-datastore';
import PatreonGender from '../constants/patreon-gender.js';
import StatusCode from '../constants/status-code.js';
import type OAuthUser from '../types/oauth-user.js';
import assert from '../utils/assert.js';
import createApiClient from '../utils/create-api-client.js';
import serialize from '../utils/serialize.js';
import isObject from './is-object.js';
import mapPatreonGenderToGender from './map-patreon-gender-to-gender.js';

const PATREON_GENDERS: Set<unknown> = new Set(Object.values(PatreonGender));

const isPatreonGender = (value: unknown): value is PatreonGender =>
  PATREON_GENDERS.has(value);

const FIELDS: URLSearchParams = new URLSearchParams({
  'fields[user]': [
    'email',
    'first_name',
    'full_name',
    'is_email_verified',
  ].join(','),
});

const SEARCH: string = FIELDS.toString();

export default async function getPatreonUser(
  oAuthHost: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  code: string,
): Promise<OAuthUser> {
  const makeRequest = await createApiClient(
    oAuthHost,
    clientId,
    clientSecret,
    redirectUri,
    code,
  );

  const store: JsonApiDataStore = await makeRequest(`/identity?${SEARCH}`);
  const [firstUser] = store.findAll('user').map(serialize);

  assert(
    typeof firstUser !== 'undefined',
    'Expected to find a Patreon user.',
    StatusCode.BadGateway,
    store,
  );

  assert(
    'data' in firstUser,
    'Expected the Patreon user to contain data.',
    StatusCode.BadGateway,
    firstUser,
  );

  const { data } = firstUser;
  assert(
    isObject(data),
    'Expected the Patreon user data to be an object.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    'attributes' in data,
    'Expected the Patreon user to have attributes.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    'id' in data,
    'Expected the Patreon user to have an ID.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    'type' in data,
    'Expected the Patreon user to have a type.',
    StatusCode.BadGateway,
    data,
  );

  const { attributes, id, type } = data;
  assert(
    isObject(attributes),
    'Expected the Patreon user attributes to be an object.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    typeof id === 'string',
    'Expected the Patreon user ID to be a string.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    type === 'user',
    'Expected the Patreon user to be a user.', // 🤔
    StatusCode.BadGateway,
    data,
  );

  assert(
    'first_name' in attributes,
    'Expected the Patreon user to have a first name.',
    StatusCode.BadGateway,
    data,
  );

  assert(
    'full_name' in attributes,
    'Expected the Patreon user to have a full name.',
    StatusCode.BadGateway,
    data,
  );

  /**
   *   Technical debt: Search for the `google_id` in an attempt to find accounts
   * to merge with this one.
   */
  const {
    first_name: firstName,
    full_name: fullName,
    // email,
    // is_email_verified: isEmailVerified,
  } = attributes;

  assert(
    typeof firstName === 'string',
    "Expected the Patreon user's first name to be a string.",
    StatusCode.BadGateway,
    attributes,
  );

  assert(
    typeof fullName === 'string',
    "Expected the Patreon user's full name to be a string.",
    StatusCode.BadGateway,
    attributes,
  );

  const gender: unknown =
    'gender' in attributes ? attributes.gender : PatreonGender.Neutral;
  assert(
    isPatreonGender(gender),
    'Expected Patreon to provide a gender.',
    StatusCode.BadGateway,
    gender,
  );

  const getEmail = (): string | null => {
    if (!('email' in attributes)) {
      // emit();
      return null;
    }

    if (!('is_email_verified' in attributes)) {
      // emit();
      return null;
    }

    const { email, is_email_verified: isEmailVerified } = attributes;
    if (typeof email !== 'string') {
      // emit();
      return null;
    }

    if (isEmailVerified !== true) {
      // emit();
      return null;
    }

    return email;
  };

  return {
    email: getEmail(),
    firstName,
    fullName,
    gender: mapPatreonGenderToGender(gender),
    id,
  };
}
