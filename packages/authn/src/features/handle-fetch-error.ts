/// <reference types="@cloudflare/workers-types" />
import isCause from '../utils/is-cause.js';
import handleFetchErrorCause from './handle-fetch-error-cause.js';
import handleInvalidFetchErrorCause from './handle-invalid-fetch-error-cause.js';
import handleUnknownFetchErrorCause from './handle-unknown-fetch-error-cause.js';
import handleUnknownFetchError from './handle-unknown-fetch-error.js';

export default function handleFetchError(err: unknown): Response {
  if (!(err instanceof Error)) {
    return handleUnknownFetchError(err);
  }

  const { cause } = err;
  if (typeof cause === 'undefined') {
    return handleUnknownFetchErrorCause(err);
  }

  if (!isCause(cause)) {
    return handleInvalidFetchErrorCause(err);
  }

  return handleFetchErrorCause(cause);
}
