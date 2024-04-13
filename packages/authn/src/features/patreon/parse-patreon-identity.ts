import ErrorCode from '../../constants/error-code.js';
import Gender from '../../constants/gender.js';
import MetricName from '../../constants/metric-name.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import getTelemetry from '../../utils/get-telemetry.js';
import isObject from '../../utils/is-object.js';
import isPatreonGender from '../../utils/is-patreon-gender.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import mapPatreonGenderToGender from '../../utils/map-patreon-gender-to-gender.js';
import writeOAuthResponse from '../../utils/write-oauth-response.js';

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
  const { affect, emitPublicMetric } = getTelemetry();

  const { data } = identity;
  if (!isObject(data)) {
    if (typeof data === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonIdentityData,
      });
    }

    throw mapCauseToError({
      code: ErrorCode.InvalidPatreonIdentityData,
      privateData: data,
      publicData: typeof data,
    });
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    if (typeof id === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonIdentityId,
      });
    }

    throw mapCauseToError({
      code: ErrorCode.NonStringPatreonIdentityId,
      privateData: id,
      publicData: typeof id,
    });
  }

  affect(writeOAuthResponse(OAuthProvider.Patreon, id, identity));

  if (!isObject(attributes)) {
    if (typeof attributes === 'undefined') {
      emitPublicMetric({
        name: MetricName.MissingPatreonIdentityAttributes,
      });
      return {
        id,
      };
    }

    emitPublicMetric({
      name: MetricName.InvalidPatreonIdentityAttributes,
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
