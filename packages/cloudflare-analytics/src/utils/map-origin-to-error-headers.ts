import mapOriginToErrorHeadersInit from './map-origin-to-error-headers-init.js';

export default function mapOriginToErrorHeaders(
  origin: string | null,
): HeadersInit {
  const headersInit: HeadersInit = mapOriginToErrorHeadersInit(origin);
  return new Headers(headersInit);
}
