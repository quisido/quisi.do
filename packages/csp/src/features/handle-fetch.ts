import { ALLOWED_METHODS_SET } from "../constants/allowed-methods.js";
import { StatusCode } from "../constants/status-code.js";
import InvalidPathnameResponse from "../utils/invalid-pathname-response.js";
import isD1Database from "../utils/is-d1-database.js";
import isObject from "../utils/is-object.js";
import mapHeadersToOrigin from "../utils/map-headers-to-origin.js";
import mapPathnameToProjectId from "../utils/map-pathname-to-project-id.js";
import MethodNotAllowedResponse from "../utils/method-not-allowed-response.js";
import Response from '../utils/response.js';
import handleOptions from "./handle-options.js";
import handlePost from "./handle-post.js";

export default async function handleFetch(
  { body, headers, method, url }: Request,
  env: unknown,
  ctx: ExecutionContext
): Promise<Response> {
  // Environment
  if (!isObject(env)) {
    console.log('Invalid isolate environment');
    return new Response(StatusCode.InternalServerError);
  }

  // Method
  if (!ALLOWED_METHODS_SET.has(method)) {
    console.log('Method not allowed');
    return new MethodNotAllowedResponse();
  }

  // Pathname
  const { pathname } = new URL(url);
  const projectId: number = mapPathnameToProjectId(pathname);
  if (Number.isNaN(projectId)) {
    console.log('Invalid pathname');
    return new InvalidPathnameResponse();
  }

  // Database
  const { CSP_DB } = env;
  if (!isD1Database(CSP_DB)) {
    console.log('Invalid database');
    return new Response(StatusCode.InternalServerError);
  }

  // Options
  if (method === 'OPTIONS') {
    const origin: string | null = mapHeadersToOrigin(headers);
    return await handleOptions(CSP_DB, projectId, origin);
  }

  return await handlePost(CSP_DB, projectId, body, ctx);
}
