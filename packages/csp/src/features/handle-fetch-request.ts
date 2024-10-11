/// <reference types="@cloudflare/workers-types" />
import handleStaticPathname from '../constants/handle-static-pathname.js';
import { getRequestMethod, getRequestPathname } from '../constants/worker.js';
import isAllowedMethod from '../utils/is-allowed-method.js';
import isStaticPathname from '../utils/is-static-pathname.js';
import mapPathnameToProjectId from '../utils/map-pathname-to-project-id.js';
import Response from '../utils/response.js';
import handleGet from './handle-get.js';
import handleInvalidPathname from './handle-invalid-pathname.js';
import handleNotAllowedMethodResponse from './handle-not-allowed-method-response.js';
import handleOptions from './handle-options.js';
import handlePost from './handle-post.js';

export default async function handleFetchRequest(): Promise<Response> {
  // Method
  const method: string = getRequestMethod();
  if (!isAllowedMethod(method)) {
    return handleNotAllowedMethodResponse(method);
  }

  // Static responses
  const pathname: string = getRequestPathname();
  if (isStaticPathname(pathname)) {
    return handleStaticPathname(pathname);
  }

  // Project pathnames
  const projectId: number = mapPathnameToProjectId(pathname);
  if (Number.isNaN(projectId)) {
    return handleInvalidPathname(pathname);
  }

  switch (method) {
    case 'GET':
      return await handleGet(projectId);

    case 'OPTIONS':
      return await handleOptions(projectId);

    case 'POST':
      return await handlePost(projectId);
  }
}
