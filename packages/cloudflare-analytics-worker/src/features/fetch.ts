/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="@cloudflare/workers-types" />
import ALLOWED_METHODS from '../constants/allowed-methods';
import FAVICON_ICO from '../constants/favicon-ico';
import FAVICON_RESPONSE_INIT from '../constants/favicon-response-init';
import METHOD_NOT_ALLOWED_RESPONSE_INI from '../constants/method-not-allowed-response-init';
import NOT_FOUND_RESPONSE_INIT from '../constants/not-found-response-init';
import ROOT_RESPONSE_INIT from '../constants/root-response-init';
import type Env from '../types/env';
import createOptionsResponse from '../utils/create-options-response';
import FetchDataset from '../utils/fetch-dataset';
import getCachedResponseInit from '../utils/get-cached-response-init';
import mapDateToCacheKey from '../utils/map-date-to-cache-key';
import mapOriginToAnalyticsHeaders from '../utils/map-origin-to-analytics-headers';
import mapOriginToErrorResponseInit from '../utils/map-origin-to-error-response-init';
import mapUnknownToString from '../utils/map-unknown-to-string';

export default async function fetch(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  request: Readonly<Request>,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  { ERRORS, FETCH, RESULTS }: Readonly<Env>,
  cxt: Readonly<ExecutionContext>,
): Promise<Response> {
  const start: Date = new Date();
  const origin: string | null = request.headers.get('Origin');
  const cacheKey: string = mapDateToCacheKey(start);

  try {
    const { writeDataPoint } = new FetchDataset(FETCH, start);

    // HTTP 405 Method Not Allowed
    if (!ALLOWED_METHODS.has(request.method)) {
      writeDataPoint({
        message: request.method,
        statusCode: 405,
      });
      return new Response(null, METHOD_NOT_ALLOWED_RESPONSE_INI);
    }

    // OPTIONS
    if (request.method === 'OPTIONS') {
      return createOptionsResponse({
        onDataPoint: writeDataPoint,
        origin,
      });
    }

    // GET /
    const { pathname } = new URL(request.url);
    if (pathname === '/') {
      writeDataPoint({
        message: '/',
        statusCode: 200,
      });
      return new Response(null, ROOT_RESPONSE_INIT);
    }

    // GET /favicon.ico
    if (pathname === '/favicon.ico') {
      writeDataPoint({
        message: '/favicon.ico',
        statusCode: 200,
      });
      return new Response(FAVICON_ICO, FAVICON_RESPONSE_INIT);
    }

    // HTTP 404 Not Found
    if (pathname !== '/cf.json') {
      writeDataPoint({
        message: pathname,
        statusCode: 404,
      });
      return new Response(null, NOT_FOUND_RESPONSE_INIT);
    }

    const cachedResponse: Response | undefined = await caches.default.match(
      cacheKey,
    );

    if (typeof cachedResponse !== 'undefined') {
      const responseInit: ResponseInit = getCachedResponseInit({
        origin,
        response: cachedResponse,
      });

      writeDataPoint({
        message: 'default',
        statusCode: 304,
      });

      return new Response(cachedResponse.body, responseInit);
    }

    const getResults = async (): Promise<R2ObjectBody | null> => {
      if (typeof RESULTS === 'undefined') {
        return null;
      }
      return RESULTS.get('cf.json');
    };

    const body: R2ObjectBody | null = await getResults();
    const headers: Headers = mapOriginToAnalyticsHeaders(origin);

    /**
     * To create a missing analytics cache, visit
     *   http://localhost:8787/__scheduled?cron=*+*+*+*+*
     **/
    if (body === null) {
      writeDataPoint({
        message: '/cf.json',
        statusCode: 404,
      });

      return new Response(null, {
        headers,
        status: 404,
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
    console.error(err);

    const message: string = mapUnknownToString(err);
    const bodyInit: string = JSON.stringify({
      message,
    });

    const responseInit: ResponseInit = mapOriginToErrorResponseInit(origin);
    cxt.waitUntil(
      caches.default.put(cacheKey, new Response(bodyInit, responseInit)),
    );

    if (typeof ERRORS !== 'undefined') {
      const duration: number = start.getTime() - Date.now();
      ERRORS.writeDataPoint({
        blobs: [message],
        doubles: [duration],
      });
    }

    return new Response(bodyInit, responseInit);
  }
}
