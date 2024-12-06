import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import mapToOptionalBoolean from '../utils/map-to-optional-boolean.js';
import mapToOptionalString from '../utils/map-to-optional-string.js';
import mapPatreonIdentityGenderAttributeToGender from './map-patreon-identity-gender-attribute-to-gender.js';
import type PatreonIdentity from './patreon-identity.js';

export default function parsePatreonIdentity(
  this: AuthnFetchHandler,
  identity: Record<string, unknown>,
): PatreonIdentity {
  const { data } = identity;
  if (!isRecord(data)) {
    return this.handleInvalidPatreonIdentityData(data);
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    return this.handleInvalidPatreonIdentityId(data, id);
  }

  this.writeOAuthResponse(OAuthProvider.Patreon, id, identity);
  if (!isRecord(attributes)) {
    return this.handleInvalidPatreonIdentityAttributes({
      attributes,
      data,
      id,
    });
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
    gender: mapPatreonIdentityGenderAttributeToGender(gender),
    id,
    isEmailVerified: mapToOptionalBoolean(isEmailVerified),
  };
}
