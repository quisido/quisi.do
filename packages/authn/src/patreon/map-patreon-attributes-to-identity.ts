import mapToOptionalBoolean from '../utils/map-to-optional-boolean.js';
import mapToOptionalString from '../utils/map-to-optional-string.js';
import mapPatreonIdentityGenderAttributeToGender from './map-patreon-identity-gender-attribute-to-gender.js';
import type PatreonIdentity from './patreon-identity.js';

export default function mapPatreonAttributesToIdentity(
  id: string,
  attributes: Record<string, unknown>,
): PatreonIdentity {
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
