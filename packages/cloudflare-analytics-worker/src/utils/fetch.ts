import ALLOWED_ORIGINS from '../constants/allowed-origins';
import type Env from '../types/env';
import FetchDataset from './fetch-dataset';
import mapDateToCacheKey from './map-date-to-cache-key';
import mapUnknownToString from './map-unknown-to-string';

export default async function fetch(
  request: Request,
  { ERRORS, FETCH, RESULTS }: Env,
  cxt: ExecutionContext,
): Promise<Response> {
  const start: Date = new Date();
  const origin: string | null = request.headers.get('Origin');
  const cacheKey: string = mapDateToCacheKey(start);

  try {
    const { writeDataPoint } = new FetchDataset(FETCH, start);

    // HTTP 404 Not Found
    const { pathname } = new URL(request.url);
    if (pathname !== '/cf.json') {
      writeDataPoint({
        message: pathname,
        statusCode: 404,
      });
      return new Response(null, {
        status: 404,
        headers: new Headers({
          'Access-Control-Allow-Headers': 'Authorization',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '3600',
        }),
      });
    }

    // HTTP 405 Method Not Allowed
    if (request.method !== 'GET' && request.method !== 'OPTIONS') {
      writeDataPoint({
        message: request.method,
        statusCode: 405,
      });
      return new Response(null, {
        status: 405,
        headers: new Headers({
          'Access-Control-Allow-Headers': 'Authorization',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '3600',
        }),
      });
    }

    // OPTIONS
    if (request.method === 'OPTIONS') {
      // When an origin is not set, allow the request.
      if (origin === null) {
        writeDataPoint({
          message: 'OPTIONS',
          statusCode: 200,
        });
        return new Response(null, {
          headers: new Headers({
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            Allow: 'GET, OPTIONS',
          }),
          status: 200,
        });
      }

      // HTTP 403 Forbidden
      if (!ALLOWED_ORIGINS.has(origin)) {
        writeDataPoint({
          message: origin,
          statusCode: 403,
        });
        return new Response(null, {
          status: 403,
          headers: new Headers({
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '3600',
          }),
        });
      }

      // HTTP 200 OK
      writeDataPoint({
        message: origin,
        statusCode: 200,
      });
      return new Response(null, {
        status: 200,
        headers: new Headers({
          'Access-Control-Allow-Headers': 'Authorization',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '3600',
        }),
      });
    }

    const cachedResponse: Response | undefined = await caches.default.match(
      cacheKey,
    );

    if (typeof cachedResponse !== 'undefined') {
      writeDataPoint({
        message: 'default',
        statusCode: 304,
      });
      return new Response(cachedResponse.body, cachedResponse);
    }

    const headers: Headers = new Headers({
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '3600',
      'Content-Type': 'application/json',
    });

    if (origin !== null) {
      headers.set('Access-Control-Allow-Origin', origin);
    }

    const body: R2ObjectBody | null = await RESULTS.get('cf.json');
    if (body === null) {
      writeDataPoint({
        message: '/cf.json',
        statusCode: 404,
      });
      return new Response(null, {
        status: 404,
        headers,
      });
    }

    const bodyInit: string = await body.text();
    const responseInit: ResponseInit = {
      headers,
      status: 200,
    };

    cxt.waitUntil(
      caches.default.put(cacheKey, new Response(bodyInit, responseInit)),
    );

    writeDataPoint({
      message: 'OK',
      statusCode: 200,
    });

    return new Response(bodyInit, responseInit);
  } catch (err: unknown) {
    const message: string = mapUnknownToString(err);

    const bodyInit: string = JSON.stringify({
      message,
    });

    const headers: Headers = new Headers({
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '0',
      'Content-Type': 'application/json',
    });

    if (origin !== null) {
      headers.set('Access-Control-Allow-Origin', origin);
    }

    const responseInit: ResponseInit = {
      headers,
      status: 500,
    };

    cxt.waitUntil(
      caches.default.put(cacheKey, new Response(bodyInit, responseInit)),
    );

    const duration: number = start.getTime() - Date.now();
    ERRORS.writeDataPoint({
      blobs: [message],
      doubles: [duration],
    });

    return new Response(bodyInit, responseInit);
  }
}
