import mapOriginToErrorHeaders from './map-origin-to-error-headers.js';

export default function mapOriginToErrorResponseInit(
  origin: string | null,
): ResponseInit {
  return {
    headers: mapOriginToErrorHeaders(origin),
    status: 500,
  };
}
