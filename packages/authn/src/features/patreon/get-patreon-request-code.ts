import ErrorCode from '../../constants/error-code.js';
import getRequestSearchParam from '../../utils/get-request-search-param.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';

export default function getPatreonRequestCode(): string {
  const code: string | null = getRequestSearchParam('code');

  if (code === null) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonRequestCode,
    });
  }

  return code;
}
