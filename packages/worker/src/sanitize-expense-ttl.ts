const SECONDS_PER_YEAR = 31_556_926;
const UNDEFINED_TTL = 0;

export default function sanitizeExpenseTtl(ttl: number): number {
  if (ttl === UNDEFINED_TTL) {
    return SECONDS_PER_YEAR;
  }

  return ttl;
}
