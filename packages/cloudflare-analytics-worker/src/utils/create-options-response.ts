import ALLOWED_ORIGINS from '../constants/allowed-origins';
import OPTIONS_HEADERS_INIT from '../constants/options-headers-init';
import type DataPoint from '../types/data-point';

interface Options {
  readonly onDataPoint: (point: Readonly<DataPoint>) => void;
  readonly origin: string | null;
}

const WILDCARD_ORIGINS = /^https:\/\/[\d\w]+\.quisido\.pages\.dev$/;

export default function createOptionsResponse({
  onDataPoint,
  origin,
}: Readonly<Options>): Response {
  // When an origin is not set, allow the request.
  if (origin === null) {
    onDataPoint({
      message: 'OPTIONS',
      statusCode: 200,
    });

    return new Response(null, {
      headers: new Headers(OPTIONS_HEADERS_INIT),
      status: 200,
    });
  }

  // HTTP 403 Forbidden
  if (!ALLOWED_ORIGINS.has(origin) && !WILDCARD_ORIGINS.test(origin)) {
    onDataPoint({
      message: origin,
      statusCode: 403,
    });

    return new Response(null, {
      headers: new Headers(OPTIONS_HEADERS_INIT),
      status: 403,
    });
  }

  // HTTP 200 OK
  onDataPoint({
    message: origin,
    statusCode: 200,
  });

  return new Response(null, {
    status: 200,
    headers: new Headers({
      ...OPTIONS_HEADERS_INIT,
      'Access-Control-Allow-Origin': origin,
    }),
  });
}
