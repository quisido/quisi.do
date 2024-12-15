import { mapToError } from 'fmrs';
import type Handler from './handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';

export default function handleErrorDefault(
  this: Handler,
  err: unknown,
): Response {
  const error: Error = mapToError(err);
  this.logError(error);
  return new InternalServerErrorResponse();
}
