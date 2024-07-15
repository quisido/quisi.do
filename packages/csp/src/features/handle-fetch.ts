/// <reference types="@cloudflare/workers-types" />
import { isAnalyticsEngineDataset, isD1Database } from 'cloudflare-utils';
import handleStaticPathname from '../constants/handle-static-pathname.js';
import { StatusCode } from '../constants/status-code.js';
import InvalidPathnameResponse from '../utils/invalid-pathname-response.js';
import isAllowedMethod from '../utils/is-allowed-method.js';
import isObject from '../utils/is-object.js';
import isStaticPathname from '../utils/is-static-pathname.js';
import mapHeadersToOrigin from '../utils/map-headers-to-origin.js';
import mapPathnameToProjectId from '../utils/map-pathname-to-project-id.js';
import MethodNotAllowedResponse from '../utils/method-not-allowed-response.js';
import Response from '../utils/response.js';
import handleGet from './handle-get.js';
import handleOptions from './handle-options.js';
import handlePost from './handle-post.js';

export default async function handleFetch(
  console: Console,
  { body, headers, method, url }: Request,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  // Environment
  if (!isObject(env)) {
    console.error(new Error('Invalid isolate environment'));
    return new Response(StatusCode.InternalServerError);
  }

  // Method
  if (!isAllowedMethod(method)) {
    console.log('Method not allowed');
    return new MethodNotAllowedResponse();
  }

  const { pathname, searchParams } = new URL(url);

  // Static responses
  if (isStaticPathname(pathname)) {
    return handleStaticPathname(pathname);
  }

  // Project pathnames
  const projectId: number = mapPathnameToProjectId(pathname);
  if (Number.isNaN(projectId)) {
    console.error(new Error('Invalid pathname'));
    return new InvalidPathnameResponse();
  }

  // Database
  const { CSP_DB, USAGE } = env;
  if (!isD1Database(CSP_DB)) {
    console.error(new Error('Invalid database'));
    return new Response(StatusCode.InternalServerError);
  }

  // Usage
  if (!isAnalyticsEngineDataset(USAGE)) {
    console.error(new Error('Invalid usage dataset'));
    return new Response(StatusCode.InternalServerError);
  }

  switch (method) {
    case 'GET':
      return handleGet({
        console,
        db: CSP_DB,
        key: searchParams.get('key'),
        projectId,
        usage: USAGE,
      });

    case 'OPTIONS': {
      return await handleOptions({
        console,
        db: CSP_DB,
        origin: mapHeadersToOrigin(headers),
        projectId,
        usage: USAGE,
      });
    }

    case 'POST':
      return await handlePost({
        body,
        console,
        ctx,
        db: CSP_DB,
        key: searchParams.get('key'),
        projectId,
        usage: USAGE,
      });
  }
}
