import { ErrorCode } from "@quisido/authn-shared";
import mapCauseToError from "../../utils/map-cause-to-error.js";

export default function handleInvalidPatreonIdentityId(id: unknown): never {
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
