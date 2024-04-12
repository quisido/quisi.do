import { parse } from 'cookie';
import ErrorCode from '../constants/error-code.js';
import getRequestHeaders from './get-request-headers.js';
import mapCauseToError from './map-cause-to-error.js';

export default function getSessionIdCookie(): string {
  const headers: Headers = getRequestHeaders();
  const cookieHeader: string | null = headers.get('Cookie');
  if (cookieHeader === null) {
    throw mapCauseToError({
      code: ErrorCode.MissingCookies,
    });
  }

  const cookies: Partial<Record<string, string>> = parse(cookieHeader);
  const sessionId: string | undefined = cookies['__Secure-Session-ID'];
  if (typeof sessionId !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.MissingSessionIDCookie,
      privateData: cookies,
      publicData: Object.keys(cookies),
    });
  }

  return sessionId;
}
