import ErrorCode from '../constants/error-code.js';
import Gender from '../constants/gender.js';
import MetricName from '../constants/metric-name.js';
import OAuthProvider from '../constants/oauth-provider.js';
import getTelemetry from './get-telemetry.js';
import isObject from './is-object.js';
import isPatreonGender from './is-patreon-gender.js';
import mapCauseToError from './map-cause-to-error.js';
import mapPatreonGenderToGender from './map-patreon-gender-to-gender.js';
import writeOAuthResponse from './write-file.js';

interface Result {
  readonly email?: string | undefined;
  readonly firstName?: string | undefined;
  readonly fullName?: string | undefined;
  readonly gender?: Gender | undefined;
  readonly id: string;
  readonly isEmailVerified?: boolean | undefined;
}

export default function parsePatreonCurrentUser(
  currentUser: Record<string, unknown>,
): Result {
  const { affect, emitPublicMetric } = getTelemetry();

  const { data } = currentUser;
  if (!isObject(data)) {
    if (typeof data === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonCurrentUserData,
      });
    }

    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonCurrentUserData,
      privateData: data,
      publicData: typeof data,
    });
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    if (typeof id === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonCurrentUserId,
      });
    }

    throw mapCauseToError({
      code: ErrorCode.NonStringPatreonCurrentUserId,
      privateData: id,
      publicData: typeof id,
    });
  }

  affect(writeOAuthResponse(OAuthProvider.Patreon, id, currentUser));

  if (!isObject(attributes)) {
    if (typeof attributes === 'undefined') {
      emitPublicMetric({
        name: MetricName.MissingPatreonCurrentUserAttributes,
      });
      return {
        id,
      };
    }

    emitPublicMetric({
      name: MetricName.InvalidPatreonCurrentUserAttributes,
    });
    return {
      id,
    };
  }

  const {
    email,
    first_name: firstName,
    full_name: fullName,
    gender,
    is_email_verified: isEmailVerified,
  } = attributes;

  return {
    email: typeof email === 'string' ? email : undefined,
    firstName: typeof firstName === 'string' ? firstName : undefined,
    fullName: typeof fullName === 'string' ? fullName : undefined,
    id,

    gender: isPatreonGender(gender)
      ? mapPatreonGenderToGender(gender)
      : Gender.Neutral,

    isEmailVerified:
      typeof isEmailVerified === 'boolean' ? isEmailVerified : false,
  };
}
