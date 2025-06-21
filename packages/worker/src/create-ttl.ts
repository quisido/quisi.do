const MILLISECONDS_PER_SECOND = 1000;
const UNDEFINED_TTL = 0;

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
    return expiration * MILLISECONDS_PER_SECOND - now();
  }

  return UNDEFINED_TTL;
}
