import { Gender } from '../constants/gender.js';
import type PatreonIdentity from './patreon-identity.js';

interface UserRow {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default function mapPatreonIdentityToUserRow(
  identity: PatreonIdentity,
): UserRow {
  const {
    email = null,
    firstName = null,
    fullName = null,
    gender = Gender.Neutral,
    isEmailVerified = false,
  } = identity;
  const getEmail = (): string | null => {
    if (!isEmailVerified) {
      return null;
    }

    return email;
  };

  return {
    email: getEmail(),
    firstName,
    fullName,
    gender,
  };
}
