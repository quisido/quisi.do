import mapOriginToErrorHeaders from './map-origin-to-error-headers';

export default function mapOriginToErrorResponseInit(
  origin: string | null,
): ResponseInit {
  return {
    headers: mapOriginToErrorHeaders(origin),
    status: 500,
  };
}
