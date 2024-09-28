import type Worker from '@quisido/worker';
import OAuthProvider from '../../constants/oauth-provider.js';
import writeOAuthResponse from '../../features/shared/write-oauth-response.js';
import isObject from '../../utils/is-object.js';
import mapToOptionalBoolean from '../../utils/map-to-optional-boolean.js';
import mapToOptionalString from '../../utils/map-to-optional-string.js';
import handleInvalidPatreonIdentityAttributes from './handle-invalid-patreon-identity-attributes.js';
import handleInvalidPatreonIdentityData from './handle-invalid-patreon-identity-data.js';
import handleInvalidPatreonIdentityId from './handle-invalid-patreon-identity-id.js';
import mapToGender from './map-to-gender.js';
import type PatreonIdentity from './patreon-identity.js';

export default function parsePatreonIdentity(this: Worker,
  identity: Record<string, unknown>,
): PatreonIdentity {
  const { data } = identity;
  if (!isObject(data)) {
    return handleInvalidPatreonIdentityData.call(this,data);
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    return handleInvalidPatreonIdentityId.call(this,data, id);
  }

  this.affect(writeOAuthResponse.call(this,OAuthProvider.Patreon, id, identity));

  if (!isObject(attributes)) {
    return handleInvalidPatreonIdentityAttributes.call(this,{ attributes, data, id });
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
