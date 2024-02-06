import type { JsonApiDataStore } from 'jsonapi-datastore';
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import PatreonGender from '../constants/patreon-gender.js';
import StatusCode from '../constants/status-code.js';
import type OAuthUser from '../types/oauth-user.js';
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
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
  assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion,
): Promise<OAuthUser> {
  const makeRequest = await createApiClient(
    oAuthHost,
    clientId,
    clientSecret,
    redirectUri,
    code,
    assert,
  );

  const store: JsonApiDataStore = await makeRequest(`/identity?${SEARCH}`);
  const [firstUser] = store.findAll('user').map(serialize);

  assert(
    typeof firstUser !== 'undefined',
    'Expected to find a Patreon user.',
    ErrorCode.MissingPatreonUser,
    StatusCode.BadGateway,
    store,
  );

  assert(
    'data' in firstUser,
    'Expected the Patreon user to contain data.',
    ErrorCode.MissingPatreonUserData,
    StatusCode.BadGateway,
    firstUser,
  );

  const { data } = firstUser;
  assert(
    isObject(data),
    'Expected the Patreon user data to be an object.',
    ErrorCode.NonObjectPatreonUserData,
    StatusCode.BadGateway,
    data,
  );

  assert(
    'attributes' in data,
    'Expected the Patreon user to have attributes.',
    ErrorCode.MissingPatreonUserAttributes,
    StatusCode.BadGateway,
    data,
  );

  assert(
    'id' in data,
    'Expected the Patreon user to have an ID.',
    ErrorCode.MissingPatreonUserId,
    StatusCode.BadGateway,
    data,
  );

  assert(
    'type' in data,
    'Expected the Patreon user to have a type.',
    ErrorCode.MissingPatreonUserType,
    StatusCode.BadGateway,
    data,
  );

  const { attributes, id, type } = data;
  assert(
    isObject(attributes),
    'Expected the Patreon user attributes to be an object.',
    ErrorCode.NonObjectPatreonUserAttributes,
    StatusCode.BadGateway,
    data,
  );

  assert(
    typeof id === 'string',
    'Expected the Patreon user ID to be a string.',
    ErrorCode.NonStringPatreonUserId,
    StatusCode.BadGateway,
    data,
  );

  assert(
    type === 'user',
    'Expected a Patreon user type.', // 🤔
    ErrorCode.NonPatreonUserType,
    StatusCode.BadGateway,
    data,
  );

  assert(
    'first_name' in attributes,
    'Expected the Patreon user to have a first name.',
    ErrorCode.MissingPatreonUserFirstName,
    StatusCode.BadGateway,
    data,
  );

  assert(
    'full_name' in attributes,
    'Expected the Patreon user to have a full name.',
    ErrorCode.MissingPatreonUserFullName,
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
    ErrorCode.NonStringPatreonUserFirstName,
    StatusCode.BadGateway,
    attributes,
  );

  assert(
    typeof fullName === 'string',
    "Expected the Patreon user's full name to be a string.",
    ErrorCode.NonStringPatreonUserFullName,
    StatusCode.BadGateway,
    attributes,
  );

  const gender: PatreonGender =
    'gender' in attributes && isPatreonGender(attributes.gender)
      ? attributes.gender
      : PatreonGender.Neutral;

  const getEmail = (): string | null => {
    if (!('email' in attributes)) {
      emit(MetricName.MissingPatreonEmail);
      return null;
    }

    if (!('is_email_verified' in attributes)) {
      emit(MetricName.MissingPatreonEmailVerification);
      return null;
    }

    const { email, is_email_verified: isEmailVerified } = attributes;
    if (typeof email !== 'string') {
      emit(MetricName.NonStringPatreonEmail);
      return null;
    }

    if (isEmailVerified !== true) {
      emit(MetricName.UnverifiedPatreonEmail);
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
