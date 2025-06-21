import { SECONDS_PER_YEAR } from './time.js';

const NONE = 0;
const UNDEFINED_TTL = 0;

export default function sanitizeExpenseTtl(ttl: number): number {
  if (ttl === UNDEFINED_TTL) {
    return SECONDS_PER_YEAR;
  }

  return Math.max(NONE, ttl);
}
