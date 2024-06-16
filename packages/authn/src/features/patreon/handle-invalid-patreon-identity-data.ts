import { ErrorCode } from '@quisido/authn-shared';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function handleInvalidPatreonIdentityData(data: unknown): never {
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
