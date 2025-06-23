import { MILLISECONDS_PER_SECOND } from './time.js';

const UNDEFINED_TTL = 0;

/**
 * Computes TTL (time-to-live) in seconds from KV namespace put options.
 *
 * @param options - KV put options containing expiration or expirationTtl
 * @param now - Function returning current time in milliseconds since epoch
 * @returns TTL in seconds, or 0 if no valid expiration is provided
 *
 * Note: expirationTtl (in seconds) takes priority over expiration (in seconds)
 */
export default function createTtl(
  options: KVNamespacePutOptions | undefined,
  now: () => number,
): number {
  if (typeof options === 'undefined') {
    return UNDEFINED_TTL;
  }

  const { expiration, expirationTtl } = options;
  if (typeof expirationTtl === 'number') {
    return expirationTtl;
  }

  if (typeof expiration === 'number') {
    return expiration - now() / MILLISECONDS_PER_SECOND;
  }

  return UNDEFINED_TTL;
}
