import { Snapshot } from 'proposal-async-context/src/index.js';
import MetricName from '../../constants/metric-name.js';
import getTelemetry from '../../utils/get-telemetry.js';
import getPatreonCurrentUser from './get-patreon-current-user.js';

export default async function handlePatreonFetchRequest(): Promise<Response> {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.PatreonRequest });

  const snapshot: Snapshot = new Snapshot();
  const identity: Record<string, unknown> = await getPatreonCurrentUser();
  return snapshot.run((): Response => {
    console.log(identity);
    return new Response(JSON.stringify(identity));
  });
  /*
  if (!('data' in identity)) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonUserData,
      privateData: firstUser,
      returnHref,
    });
  }

  const { data } = identity;
  if (!isObject(data)) {
    throw mapCauseToError({
      code: ErrorCode.NonObjectPatreonUserData,
      privateData: data,
      returnHref,
    });
  }

  if (!('attributes' in data)) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonUserAttributes,
      privateData: data,
      returnHref,
    });
  }

  if (!('id' in data)) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonUserId,
      privateData: data,
      returnHref,
    });
  }

  if (!('type' in data)) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonUserType,
      privateData: data,
      returnHref,
    });
  }

  const { attributes, id, type } = data;
  this.assert(
    isObject(attributes),
    'Expected the Patreon user attributes to be an object.',
    {
      code: ErrorCode.NonObjectPatreonUserAttributes,
      privateData: attributes,
      status: StatusCode.BadGateway,
    },
  );

  this.assert(
    typeof id === 'string',
    'Expected the Patreon user ID to be a string.',
    {
      code: ErrorCode.NonStringPatreonUserId,
      privateData: id,
      status: StatusCode.BadGateway,
    },
  );

  this.assert(
    type === 'user',
    'Expected a Patreon user type.', // 🤔
    {
      code: ErrorCode.NonPatreonUserType,
      publicData: type,
      status: StatusCode.BadGateway,
    },
  );

  this.assert(
    'first_name' in attributes,
    'Expected the Patreon user to have a first name.',
    {
      code: ErrorCode.MissingPatreonUserFirstName,
      privateData: attributes,
      status: StatusCode.BadGateway,
    },
  );

  this.assert(
    'full_name' in attributes,
    'Expected the Patreon user to have a full name.',
    {
      code: ErrorCode.MissingPatreonUserFullName,
      privateData: attributes,
      status: StatusCode.BadGateway,
    },
  );

  /**
   *   Technical debt: Search for the `google_id` in an attempt to find accounts
   * to merge with this one.
   * /
  const {
    first_name: firstName,
    full_name: fullName,
    // email,
    // is_email_verified: isEmailVerified,
  } = attributes;

  this.assert(
    typeof firstName === 'string',
    "Expected the Patreon user's first name to be a string.",
    {
      code: ErrorCode.NonStringPatreonUserFirstName,
      privateData: firstName,
      publicData: typeof firstName,
      status: StatusCode.BadGateway,
    },
  );

  this.assert(
    typeof fullName === 'string',
    "Expected the Patreon user's full name to be a string.",
    {
      code: ErrorCode.NonStringPatreonUserFullName,
      privateData: fullName,
      publicData: typeof fullName,
      status: StatusCode.BadGateway,
    },
  );

  const gender: PatreonGender =
    'gender' in attributes && isPatreonGender(attributes.gender)
      ? attributes.gender
      : PatreonGender.Neutral;

  const getEmail = (): string | null => {
    if (!('email' in attributes)) {
      this.emit(MetricName.MissingPatreonEmail);
      return null;
    }

    if (!('is_email_verified' in attributes)) {
      this.emit(MetricName.MissingPatreonEmailVerification);
      return null;
    }

    const { email, is_email_verified: isEmailVerified } = attributes;
    if (typeof email !== 'string') {
      this.emit(MetricName.NonStringPatreonEmail);
      return null;
    }

    if (isEmailVerified !== true) {
      this.emit(MetricName.UnverifiedPatreonEmail);
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
  */
}
