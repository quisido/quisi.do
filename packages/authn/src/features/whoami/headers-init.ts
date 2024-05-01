import { SECONDS_PER_MINUTE } from "../../constants/time.js";

const MAX_AGE_MINUTES = 10;

export const HEADERS_INIT: HeadersInit = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Baggage, Sentry-Trace',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Max-Age': (MAX_AGE_MINUTES * SECONDS_PER_MINUTE).toString(),
  Allow: 'GET, OPTIONS',
  'Content-Type': 'text/json; charset=utf-8',
};
