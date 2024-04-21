import Gender from '../../constants/gender.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import getTelemetry from '../../utils/get-telemetry.js';
import isObject from '../../utils/is-object.js';
import mapToOptionalBoolean from '../../utils/map-to-optional-boolean.js';
import mapToOptionalString from '../../utils/map-to-optional-string.js';
import writeOAuthResponse from '../../utils/write-oauth-response.js';
import handleInvalidPatreonIdentityAttributes from './handle-invalid-patreon-identity-attributes.js';
import handleInvalidPatreonIdentityData from './handle-invalid-patreon-identity-data.js';
import handleInvalidPatreonIdentityId from './handle-invalid-patreon-identity-id.js';
import mapToGender from './map-to-gender.js';

interface Result {
  readonly email?: string | undefined;
  readonly firstName?: string | undefined;
  readonly fullName?: string | undefined;
  readonly gender?: Gender | undefined;
  readonly id: string;
  readonly isEmailVerified?: boolean | undefined;
}

export default function parsePatreonIdentity(
  identity: Record<string, unknown>,
): Result {
  const { affect } = getTelemetry();

  const { data } = identity;
  if (!isObject(data)) {
    return handleInvalidPatreonIdentityData(data);
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    return handleInvalidPatreonIdentityId(id);
  }

  affect(writeOAuthResponse(OAuthProvider.Patreon, id, identity));

  if (!isObject(attributes)) {
    return handleInvalidPatreonIdentityAttributes({ attributes, id });
  }

  const {
    email,
    first_name: firstName,
    full_name: fullName,
    gender,
    is_email_verified: isEmailVerified,
  } = attributes;

  return {
    email: mapToOptionalString(email),
    firstName: mapToOptionalString(firstName),
    fullName: mapToOptionalString(fullName),
    gender: mapToGender(gender),
    id,
    isEmailVerified: mapToOptionalBoolean(isEmailVerified),
  };
}
