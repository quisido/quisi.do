import mapOriginToErrorHeadersInit from './map-origin-to-error-headers-init';

export default function mapOriginToErrorHeaders(
  origin: string | null,
): HeadersInit {
  const headersInit: HeadersInit = mapOriginToErrorHeadersInit(origin);
  return new Headers(headersInit);
}
