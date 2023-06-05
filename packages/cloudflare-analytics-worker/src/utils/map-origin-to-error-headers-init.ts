import ERRORS_HEADERS_INIT from '../constants/error-headers-init';

export default function mapOriginToErrorHeadersInit(
  origin: string | null,
): HeadersInit {
  if (origin === null) {
    return ERRORS_HEADERS_INIT;
  }

  return {
    ...ERRORS_HEADERS_INIT,
    'Access-Control-Allow-Origin': origin,
  };
}
